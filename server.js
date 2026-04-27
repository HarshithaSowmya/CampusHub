const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const multer = require("multer");
const path = require("path");

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

/* 🔥 FILE UPLOAD CONFIG */
const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

/* 🔥 MAKE UPLOADS PUBLIC */
app.use("/uploads", express.static("uploads"));

/* 🔥 DB CONNECT */
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

/* 🔥 ROUTES */
app.use("/api/auth", require("./routes/auth"));
app.use("/api/events", require("./routes/events")(upload));
app.use("/api/register", require("./routes/registration"));

/* TEST */
app.get("/", (req, res) => {
  res.send("API Running...");
});

/* START */
app.listen(5000, () => {
  console.log("Server running on port 5000");
});