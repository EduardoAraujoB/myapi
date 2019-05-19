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
  articles: [
    {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    }
  ],
  created_at: {
    type: Date,
    default: Date.now
  }
});

// iniciando o Schema
mongoose.model("Member", MemberSchema);
