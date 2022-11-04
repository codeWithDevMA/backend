const mongoose = require("mongoose");
const SecondCard = new mongoose.Schema({
  imagesSecondCard: { type: String, required: true },
  spantext1: { type: String, required: true },
  spantext2: { type: String, required: true },
  spantext3: { type: String, required: true },
  spantext4: { type: String, required: true },
  spantext5: { type: String, required: true },
  imagesCardSupervisor: { type: String, required: true },
  nameSupervisor: { type: String, required: true },
  Dollar: { type: String, required: true },
});
module.exports = mongoose.model("secondCards", SecondCard);
