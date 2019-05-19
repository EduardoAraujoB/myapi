// importando ORM
const mongoose = require("mongoose");

// criando o Schema
const CommentSchema = mongoose.Schema({
  content: {
    type: String,
    required: true
  },
  article: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Article",
    required: true
  },
  member: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Member",
    required: true
  },
  create_at: {
    type: Date,
    default: Date.now
  }
});

// iniciando o Schema
mongoose.model("Comment", CommentSchema);
