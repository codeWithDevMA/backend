const mongoose = require("mongoose");
const historique_schema = new mongoose.Schema({
  historique: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  date: { type: String },
});
module.exports = mongoose.model("Historique", historique_schema);
