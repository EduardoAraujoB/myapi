// importando ORM
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const relationship = require("mongoose-relationship");

// criando o Schema
const ArticleSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  member: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Member",
    childPath: "article"
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

// iniciando o Schema
ArticleSchema.plugin(relationship, { relationshipPathName: "member" });
mongoose.model("Article", ArticleSchema);
