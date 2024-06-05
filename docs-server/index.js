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

const allowedOrigins = ["http://localhost:5173", "https://docs.devshadow.live"];
// Middleware

app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        var msg =
          "The CORS policy for this site does not " +
          "allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true,
  })
);

// Routes
app.use("/api/user", userRoutes);
app.use("/api/notes", notesRoutes);
app.use("/api/settings", settingsRoutes);
app.get("/api", (req, res) => {
  res.send("Welcome to Docs Server");
});
app.all("*", (req, res) => {
  res.status(404).send("Page not found");
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
