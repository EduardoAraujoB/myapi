const mongoose = require("mongoose");

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

mongoose.model("Member", MemberSchema);
