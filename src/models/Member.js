// importando ORM
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

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
  email: {
    type: String,
    lowercase: true,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    select: false
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

MemberSchema.pre("save", async function(next) {
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;

  next();
});

// iniciando o Schema
mongoose.model("Member", MemberSchema);
