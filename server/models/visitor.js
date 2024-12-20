const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const VisitorSchema = new Schema({
  ip : {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Visitor", VisitorSchema);
