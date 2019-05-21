// importando ORM
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const relationship = require("mongoose-relationship");

// criando o Schema
const CommentSchema = new Schema({
  content: {
    type: String,
    required: true
  },
  article: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Article",
    childPath: "comment",
    required: true
  },
  member: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Member",
    childPath: "comment",
    required: true
  },
  create_at: {
    type: Date,
    default: Date.now
  }
});

CommentSchema.plugin(relationship, {
  relationshipPathName: ["article", "member"]
});
// iniciando o Schema
mongoose.model("Comment", CommentSchema);
