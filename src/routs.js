const express = require("express");
const routs = express.Router();

const ArticleController = require("./controllers/ArticleController");

routs.get("/articles", ArticleController.index);
routs.post("/articles", ArticleController.store);
routs.put("/articles/:id", ArticleController.update);
routs.delete("/articles/:id", ArticleController.destroy);

module.exports = routs;
