const express = require("express");
const app = express();
const Fuse = require("fuse.js");
const prisma = require("../config/prisma");
require("dotenv").config();
const AWS = require("aws-sdk");
const { extname } = require("path");
const multer = require("multer");
const { type } = require("os");
const sharp = require("sharp");
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET,
  region: process.env.AWS_REGION,
});

async function getGames(req, res) {
  const { skip, take } = req.query;
  const games = await prisma.games.findMany();

  return res.status(200).json(games);
}

async function getGame(req, res) {
  const { title } = req.query;

  if (!title) {
    return res.status(400).json({ error: "Title query parameter is required" });
  }

  try {
    const games = await prisma.games.findMany({
      where: {
        title: {
          contains: title,
        },
      },
    });

    const fuse = new Fuse(games, {
      keys: ["title"],
      threshold: 0.3,
    });

    const result = fuse.search(title).map((result) => result.item);

    return res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching games:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

async function getGameByID(req, res) {
  const id = parseInt(req.params.id);

  const game = await prisma.games.findUnique({
    where: {
      id: id,
    },
    include: {
      assets: true,
    },
  });

  return res.status(200).json(game);
}

async function addGame(req, res) {
  let { title, game_detail, category, developer, publisher, group, isAI } =
    req.body;
  const file = req.file;

  if (
    !title ||
    !game_detail ||
    !category ||
    !developer ||
    !publisher ||
    !group ||
    !isAI
  ) {
    return res.status(400).json({ error: "Please fill all the fields" });
  }

  if (
    typeof title !== "string" ||
    typeof game_detail !== "string" ||
    typeof category !== "string" ||
    typeof developer !== "string" ||
    typeof publisher !== "string" ||
    typeof group !== "string" ||
    typeof isAI !== "string"
  ) {
    return res.status(400).json({ error: "Invalid input" });
  }

  if (isAI === "true") {
    isAI = true;
  } else if (isAI === "false") {
    isAI = false;
  } else {
    return res
      .status(400)
      .json({ error: "Invalid value for isAI. Please use 'true' or 'false'" });
  }

  const gameExists = await prisma.games.findFirst({
    where: {
      title: title,
    },
  });

  if (gameExists) {
    return res.status(400).json({ error: "Game already exists" });
  }

  if (!file) {
    return res.status(400).json({ error: "Please upload a cover" });
  }

  try {
    console.log(file);
    // Convert the cover image to WebP format using sharp
    const webpBuffer = await sharp(file.buffer).webp().toBuffer();

    const uploadParams = {
      Bucket: "pusatstudibucket",
      Key: `covers/${title.replace(/\s/g, "_")}_cover.webp`,
      Body: webpBuffer,
      ContentType: "image/webp",
      ACL: "public-read",
    };

    const uploadResult = await s3.upload(uploadParams).promise();
    console.log("Cover uploaded to S3:", uploadResult.Location);

    const game = await prisma.games.create({
      data: {
        title,
        game_detail,
        category,
        developer,
        publisher,
        group,
        isAI,
        cover: uploadResult.Key.split("/").pop(),
      },
    });

    return res.status(201).json(game);
  } catch (error) {
    console.error("Error uploading cover:", error);
    return res.status(500).json({ error: "Error uploading cover" });
  }
}

module.exports = {
  getGames,
  addGame,
  getGame,
  getGameByID,
};
