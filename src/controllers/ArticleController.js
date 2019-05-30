// importando ORM
const mongoose = require("mongoose");

// iniciando o model
const Article = mongoose.model("Article");

const Member = mongoose.model("Member");

const Comment = mongoose.model("Comment");

module.exports = {
  // listando todos os registros
  async index(req, res) {
    const article = await Article.find().populate("member");

    return res.json(article);
  },
  // exibindo um registro
  async show(req, res) {
    const article = await Article.findById(req.params.id).populate("member");

    return res.json(article);
  },
  // guardando um novo registro
  async store(req, res) {
    const article = new Article({ ...req.body, member: req.memberId });
    await article.save();

    return res.json(article);
  },
  // atualizando um registro existente
  async update(req, res) {
    const verifyArticleMember = await Article.findById(req.params.id);
    if (verifyArticleMember.member != req.memberId) {
      return res.send("Member not authrized to modify this article");
    }

    const article = await Article.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });
    return res.json(article);
  },
  // apagando um registro
  async destroy(req, res) {
    const article = await Article.findById(req.params.id);
    await Member.findByIdAndUpdate(article.member, {
      $pullAll: { article: [article._id] }
    });
    article.comment.map(async id => {
      const comment = await Comment.findById(id);
      await Member.findByIdAndUpdate(comment.member, {
        $pullAll: { comment: [comment._id] }
      });
      await comment.remove();
    });
    await article.remove();

    return res.send();
  }
};
