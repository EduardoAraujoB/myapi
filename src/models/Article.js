// importando ORM
const mongoose = require("mongoose");

// criando o Schema
const ArticleSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

// iniciando o Schema
mongoose.model("Article", ArticleSchema);
