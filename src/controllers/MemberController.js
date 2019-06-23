// importando ORM
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const auth = require("../config/auth.json");

// iniciando o model
const Member = mongoose.model("Member");

const Article = mongoose.model("Article");

const Comment = mongoose.model("Comment");

function generateToken(params = {}) {
  return jwt.sign(params, auth.secret, {
    expiresIn: 86400
  });
}

module.exports = {
  // listando todos os registros
  async index(req, res) {
    const member = await Member.find().populate("article");

    return res.json(member);
  },
  // exibindo um registro
  async show(req, res) {
    const member = await Member.findById(req.memberId).populate("article");

    return res.json(member);
  },
  // guardando um novo registro
  async store(req, res) {
    const { email } = req.body;
    if (await Member.findOne({ email })) {
      return res.status(400).send({ error: "Member already exist" });
    }

    const member = await Member.create(req.body);

    member.password = undefined;

    return res.send({ member, token: generateToken({ id: member._id }) });
  },
  // autenticando um membro
  async authenticate(req, res) {
    const { email, password } = req.body;

    const member = await Member.findOne({ email }).select("+password");

    if (!member) {
      return res.status(400).send({ error: "Member not found" });
    }
    if (!(await bcrypt.compare(password, member.password))) {
      return res.status(400).send({ error: "Password incorrect" });
    }

    member.password = undefined;

    return res.send({ member, token: generateToken({ id: member._id }) });
  },
  // atualizando um registro existente
  async update(req, res) {
    if (!req.body.password) {
      const member = await Member.findByIdAndUpdate(req.memberId, req.body, {
        new: true
      });
      return res.json(member);
    } else {
      const hash = await bcrypt.hash(req.body.password, 10);
      const member = await Member.findByIdAndUpdate(
        req.memberId,
        { ...req.body, password: hash },
        {
          new: true
        }
      );
      return res.json(member);
    }
  },
  // apagando um registro
  async destroy(req, res) {
    const member = await Member.findById(req.memberId);
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
