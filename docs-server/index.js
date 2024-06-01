/* eslint-disable no-undef */
const mongoose = require("mongoose");
const express = require("express");
const userRoutes = require("./Routes/userRoutes");
const notesRoutes = require("./Routes/notesRoutes");
const settingsRoutes = require("./Routes/settingsRoutes");
const dotenv = require("dotenv");
const cors = require("cors");
const app = express();
dotenv.config();

// Middleware
app.use(cors());
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));

// app.use(cors({ credentials: true, origin: ["http://localhost:5173", "https://docs.devshadow.live"]}));

// Routes
app.use("/user", userRoutes);
app.use("/notes", notesRoutes);
app.use("/settings", settingsRoutes);
app.get("/", (req, res) => {
  res.send("Welcome to Docs Server");
});


mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(process.env.PORT || 3000, () => {
      console.log(
        "Connected to MongoDB",
        ` Server is running on port ${process.env.PORT || 3000}`
      );
    });
  })
  .catch((err) => console.log("Server Failed to Connect", err));
