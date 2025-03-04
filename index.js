require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const router = require("./src/routes");
const app = express();
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");

app.use(express.json({ limit: '500mb' }));
app.use(cookieParser());
app.use(express.urlencoded({ limit: '500mb', extended: true }));


app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGOURI);
    console.log("MongoDB Connected");
  } catch (err) {
    console.error(`Error: ${err.message}`);
    process.exit(1);
  }
};

connectDB();

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/", (req, res) => {
  res.send("Hello, welcome to the Node.js API!");
});

app.use(router);

app.get("/api", (req, res) => {
  res.json({
    message: "This is a simple API endpoint!",
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
