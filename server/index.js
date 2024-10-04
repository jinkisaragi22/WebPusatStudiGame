const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
// const csurf = require("csurf");
const cookieParser = require("cookie-parser");

app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());

app.use(cors({ origin: "http://localhost:5173" }));

app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
  res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
  next();
});

app.use(
  "/uploads/videos",
  express.static(path.join(__dirname, "uploads/videos"))
);
app.use(
  "/uploads/covers",
  express.static(path.join(__dirname, "uploads/covers"))
);
app.use(
  "/uploads/images",
  express.static(path.join(__dirname, "uploads/images"))
);

const gamesRouter = require("./src/routes/games");

// const csrfProtection = csurf({
//   cookie: {
//     httpOnly: true,
//     secure: process.env.NODE_ENV === "production",
//     sameSite: true,
//   },
// });

// app.use(csrfProtection);

app.use("/api/games", gamesRouter);

app.get("/api/csrf-token", (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});

app.disable("x-powered-by");

app.listen(5000, () => {
  console.log("Server is running on http://localhost:5000");
});
