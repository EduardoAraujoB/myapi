const express = require("express");
const mongoose = require("mongoose");
const requireDir = require("require-dir");

const app = express();
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/my-api", { useNewUrlParser: true });

requireDir("./src/models");

app.use("/api", require("./src/routs"));

app.listen("3100");
