// importando ORM
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// criando o Schema
const MemberSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  birthdate: {
    type: Date,
    required: true
  },
  article: [
    {
      type: Schema.ObjectId,
      ref: "Article"
    }
  ],
  comment: [
    {
      type: Schema.ObjectId,
      ref: "Comment"
    }
  ],
  created_at: {
    type: Date,
    default: Date.now
  }
});

// iniciando o Schema
mongoose.model("Member", MemberSchema);
