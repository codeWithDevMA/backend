const mongoose = require("mongoose");
const User = require("../models/User");
const Historique = require("../models/Historique");
/*-----------------------------get all Users-----------------------------*/
exports.get_Historique = async (req, res, next) => {
  try {
    const data = await User.find()
      .populate("Historique", "-__v")
      .select("-__v");
    if (!data) return res.status(404).json({ message: "user not found" });
    return res.status(202).json({ data: data });
  } catch (error) {
    return res.status(404).json({ error: error });
  }
};
/*----------------------------- post Users-----------------------------*/

exports.post_Historique = async (req, res, next) => {
  try {
    const Historique_id = req.body.Historique_id;
    const isHistorique = Historique.findById(Historique_id);
    if (isHistorique.lenght < 1) res.status(202).json("Historique not found");
    const User = new User({
      Historique: req.body.Historique_id,
      quantity: req.body.quantity,
    });
    const result = await User.save();
    res.status(200).send({
      result: result,
      request: {
        type: "GET",
        url: "localhost:3000/User/" + result._id,
      },
    });
  } catch (error) {
    res.status(404).json({ message: "invalid id", error: err });
  }
};
/*-----------------------------get all Users-----------------------------*/
exports.patch_Historique = async (req, res, next) => {
  try {
    const _id = req.params.UserId;
    if (!mongoose.Types.ObjectId.isValid(_id))
      res.status(404).json({ message: "invalid id" });
    const data = await User.findByIdAndUpdate(id, req.body, { new: true });
    if (!data) res.status(404).send("this id does'nt exist");
    res.status(200).json({
      message: "Usered updated",
      doc: data,
      request: {
        type: "GET",
        url: "localhost:3000/User",
      },
    });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

/*-----------------------------get all Users-----------------------------*/
exports.delete_Historique = async (req, res, next) => {
  try {
    const _id = req.params.delete;
    if (!mongoose.Types.ObjectId.isValid(_id))
      res.status(404).send("invalid id");
    const data = await User.findByIdAndDelete({ _id });
    if (!data) res.status(404).send("this id doesn'nt exist");
    res.status(200).send({
      message: "oredered is deleted",
      doc: data,
      request: {
        type: "GET",
        url: "localhost:3000/User",
      },
    });
  } catch (error) {
    res.status(404).send("$err");
  }
};
