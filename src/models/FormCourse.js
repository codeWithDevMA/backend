const mongoose = require("mongoose");
const FormCourse_schema = new mongoose.Schema({
  FormCourse: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "cards",
    required: true,
  },
  date: { type: String },
  file: { type: String },
  video: { type: String },
  pdf: { type: String },
});
module.exports = mongoose.model("FormCourse", FormCourse_schema);
