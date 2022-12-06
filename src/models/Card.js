const mongoose = require("mongoose");
const card_shcema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  imagesCard: { type: String, required: true },
  NameTeacher: { type: String, required: true },
  Module: { type: String, required: true },
  spantext1: { type: String, required: true },
  spantext2: { type: String, required: true },
  spantext3: { type: String, required: true },
});
module.exports = mongoose.model("cards", card_shcema);
