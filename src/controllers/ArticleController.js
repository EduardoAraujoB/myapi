// importando ORM
const mongoose = require("mongoose");

// iniciando o model
const Article = mongoose.model("Article");

module.exports = {
  // listando todos os registros
  async index(req, res) {
    const article = await Article.find();

    return res.json(article);
  },
  // exibindo um registro
  async show(req, res) {
    const article = await Article.findById(req.params.id);

    return res.json(article);
  },
  // guardando um novo registro
  async store(req, res) {
    const article = await Article.create(req.body);

    return res.json(article);
  },
  // atualizando um registro existente
  async update(req, res) {
    const article = await Article.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });
    return res.json(article);
  },
  // apagando um registro
  async destroy(req, res) {
    await Article.findByIdAndRemove(req.params.id);

    return res.send();
  }
};
