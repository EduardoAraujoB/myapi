// importando ORM
const mongoose = require("mongoose");

// criando o Schema
const MemberSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  birthdate: {
    type: Date,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

// iniciando o Schema
mongoose.model("Member", MemberSchema);
