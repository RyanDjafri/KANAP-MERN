const express = require("express");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/auth");
const productRoutes = require("./routes/product");
const app = express();
require("dotenv").config({ path: "./config/.env" });
require("./config/db");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/images", express.static(path.join(__dirname, "images")));
app.use(express.static("images"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const corsOptions = {
  origin: "*",
  credentials: true,
  allowedHeaders: ["sessionId", "Content-Type"],
  exposedHeaders: ["sessionId"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
};

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With, content-type"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});
app.use(cors(corsOptions));
app.use("/api/user", userRoutes);
app.use("/api/products", productRoutes);

module.exports = app;
