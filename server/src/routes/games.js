const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const { extname } = require("path");
const prisma = require("../config/prisma");
const {
  getGames,
  addGame,
  getGame,
  getGameByID,
} = require("../controllers/games");
const sharp = require("sharp");


const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET,
  },
});

const storageCover = multer.memoryStorage(); 
const uploadCover = multer({ storage: storageCover });

router.get("/", getGames);
router.get("/id/:id", getGameByID);
router.get("/search", getGame);
router.post("/", uploadCover.single("cover"), addGame);

const storageAssets = multer.memoryStorage(); 
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
    // Convert the image to WebP format
    const webpBuffer = await sharp(file.buffer).webp().toBuffer();

    
    const uploadParams = {
      Bucket: "pusatstudibucket",
      Key: `images/${gameTitle}_image_${Date.now()}.webp`,
      Body: webpBuffer,
      ContentType: "image/webp",
      ACL: "public-read",
    };

    const command = new PutObjectCommand(uploadParams);
    const uploadResult = await s3Client.send(command);
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
    const command = new PutObjectCommand(uploadParams);
    const uploadResult = await s3Client.send(command);
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
