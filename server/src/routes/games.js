const express = require("express");
const router = express.Router();
express.json();
const multer = require("multer");
const path = require("path");
const AWS = require("aws-sdk");
const { extname } = require("path");
const prisma = require("../config/prisma");
const {
  getGames,
  addGame,
  getGame,
  getGameByID,
} = require("../controllers/games");
const sharp = require("sharp");

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET,
  region: "ap-southeast-2",
});

const storageCover = multer.memoryStorage(); // Store the file in memory

const uploadCover = multer({ storage: storageCover });

router.get("/", getGames);
router.get("/id/:id", getGameByID);
router.get("/search", getGame);
router.post("/", uploadCover.single("cover"), addGame);

const storageAssets = multer.memoryStorage(); // Store the file in memory
const uploadAssets = multer({ storage: storageAssets });

router.post("/upload/image", uploadAssets.single("image"), async (req, res) => {
  const game_id = req.body.game_id;
  const file = req.file;

  if (!game_id) {
    return res.status(400).send("Game ID and image are required.");
  }

  const game = await prisma.games.findUnique({
    where: {
      id: parseInt(game_id),
    },
  });

  if (!game) {
    return res.status(404).send("Game not found.");
  }

  if (!file) {
    return res.status(400).send("No file uploaded.");
  }

  const gameTitle = game.title.replace(/\s/g, "_");

  try {
    // Convert the image to WebP format using sharp
    const webpBuffer = await sharp(file.buffer).webp().toBuffer();

    const uploadParams = {
      Bucket: "pusatstudibucket",
      Key: `images/${gameTitle}_image_${Date.now()}.webp`,
      Body: webpBuffer,
      ContentType: "image/webp",
      ACL: "public-read",
    };

    const uploadResult = await s3.upload(uploadParams).promise();
    console.log("Image uploaded to S3:", uploadResult.Location);

    const image = await prisma.assets.create({
      data: {
        game_id: parseInt(game_id),
        filename: uploadResult.Key.split("/").pop(),
        type: "image",
      },
    });

    res.status(200).json({
      message: "Image uploaded successfully",
      url: uploadResult.Location,
    });
  } catch (error) {
    console.error("Error uploading image:", error);
    res.status(500).send("Error uploading image");
  }
});

router.post("/upload/video", uploadAssets.single("video"), async (req, res) => {
  const game_id = req.body.game_id;
  const file = req.file;

  if (!game_id) {
    return res.status(400).send("Game ID and video are required.");
  }

  const game = await prisma.games.findUnique({
    where: {
      id: parseInt(game_id),
    },
  });

  if (!game) {
    return res.status(404).send("Game not found.");
  }

  if (!file) {
    return res.status(400).send("No file uploaded.");
  }

  const gameTitle = game.title.replace(/\s/g, "_");

  const uploadParams = {
    Bucket: "pusatstudibucket",
    Key: `videos/${gameTitle}_video_${Date.now()}${extname(file.originalname)}`,
    Body: file.buffer,
    ACL: "public-read",
  };

  try {
    const uploadResult = await s3.upload(uploadParams).promise();
    console.log("Video uploaded to S3:", uploadResult.Location);

    const video = await prisma.assets.create({
      data: {
        game_id: parseInt(game_id),
        filename: uploadResult.Key.split("/").pop(),
        type: "video",
      },
    });

    res.status(200).json({
      message: "Video uploaded successfully",
      url: uploadResult.Location,
    });
  } catch (error) {
    console.error("Error uploading video:", error);
    res.status(500).send("Error uploading video");
  }
});

module.exports = router;
