// importando ORM
const mongoose = require("mongoose");

// iniciando o model
const Member = mongoose.model("Member");

const Article = mongoose.model("Article");

module.exports = {
  // listando todos os registros
  async index(req, res) {
    const member = await Member.find().populate("article");

    return res.json(member);
  },
  // exibindo um registro
  async show(req, res) {
    const member = await Member.findById(req.params.id).populate("article");

    return res.json(member);
  },
  // guardando um novo registro
  async store(req, res) {
    const member = await Member.create(req.body);

    return res.json(member);
  },
  // atualizando um registro existente
  async update(req, res) {
    const member = await Member.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });

    return res.json(member);
  },
  // apagando um registro
  async destroy(req, res) {
    const member = await Member.findById(req.params.id);
    member.article.map(async id => {
      const article = await Article.findById(id);
      article.comment.map(async id => {
        const comment = await Comment.findById(id);
        await comment.remove();
      });
      await article.remove();
    });
    await member.remove();
    res.send();
  }
};
