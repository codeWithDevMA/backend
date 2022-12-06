const mongoose = require("mongoose");
const SecondCard = new mongoose.Schema({
  imagesSecondCard: { type: String, required: true },
  nbrStar: { type: String, required: true },
  nbrStudent: { type: String, required: true },
  nbrHour: { type: String, required: true },
  Lecture: { type: String, required: true },
  Medium: { type: String, required: true },
  imagesCardSupervisor: { type: String, required: true },
  nameSupervisor: { type: String, required: true },
  Dollar: { type: String, required: true },
});
module.exports = mongoose.model("secondCards", SecondCard);
