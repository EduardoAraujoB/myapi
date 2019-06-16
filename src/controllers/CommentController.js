// importando ORM
const mongoose = require("mongoose");

// iniciando o model
const Comment = mongoose.model("Comment");

const Article = mongoose.model("Article");

const Member = mongoose.model("Member");

module.exports = {
  // listando todos os registros
  async index(req, res) {
    const comment = await Comment.find({ article: req.params.id });

    return res.json(comment);
  },
  // exibindo um registro
  async show(req, res) {
    const comment = await Comment.findById(req.params.id);

    return res.json(comment);
  },
  // guardando um novo registro
  async store(req, res) {
    const comment = await Comment.create({ ...req.body, member: req.memberId });

    return res.json(comment);
  },
  // atualizando um registro existente
  async update(req, res) {
    const verifyCommentMember = await Comment.findById(req.params.id);
    if (verifyCommentMember.member != req.memberId) {
      return res.status(401).send({
        error: "Member not authorized to modify this comment"
      });
    }

    const comment = await Comment.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });

    return res.json(comment);
  },
  // apagando um registro
  async destroy(req, res) {
    const comment = await Comment.findById(req.params.id);
    if (comment.member != req.memberId) {
      return res.status(401).send({
        error: "Member not authorized to modify this comment"
      });
    }
    await Article.findByIdAndUpdate(comment.article, {
      $pullAll: { comment: [comment._id] }
    });
    await Member.findByIdAndUpdate(comment.member, {
      $pullAll: { comment: [comment._id] }
    });
    comment.remove();

    return res.send();
  }
};
