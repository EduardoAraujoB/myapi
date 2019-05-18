// importando ORM
const mongoose = require("mongoose");

// iniciando o model
const Member = mongoose.model("Member");

module.exports = {
  // listando todos os registros
  async index(req, res) {
    const member = await Member.find();

    return res.json(member);
  },
  // exibindo um registro
  async show(req, res) {
    const member = await Member.findById(req.params.id);

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
    await Member.findByIdAndRemove(req.params.id);

    res.send();
  }
};
