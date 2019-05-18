const mongoose = require("mongoose");

const Article = mongoose.model("Article");

module.exports = {
  async index(req, res) {
    const article = await Article.find();

    return res.json(article);
  },
  async store(req, res) {
    const article = await Article.create(req.body);

    return res.json(article);
  },
  async update(req, res) {
    const article = await Article.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });
    return res.json(article);
  },
  async destroy(req, res) {
    await Article.findByIdAndRemove(req.params.id);

    return res.send();
  }
};
