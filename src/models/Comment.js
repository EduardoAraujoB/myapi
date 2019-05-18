// importando ORM
const mongoose = require("mongoose");

// criando o Schema
const CommentSchema = mongoose.Schema({
  content: {
    type: String,
    required: true
  },
  create_at: {
    type: Date,
    default: Date.now
  }
});

// iniciando o Schema
mongoose.model("Comment", CommentSchema);
