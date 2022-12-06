const mongoose = require("mongoose");
const secondCards = require("../models/SecondCard");
/*-----------------------------post orders-----------------------------*/
exports.get_secondCards = async (req, res, next) => {
  try {
    const data = await secondCards.find().select("-__v");
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: err });
  }
};
/*-----------------------------get all secondCards-----------------------------*/
exports.post_secondCards = async (req, res) => {
  try {
    const secondCardss = new secondCards({
      imagesSecondCard: req.files["imagesSecondCard"][0].path,
      nbrStar: req.body.nbrStar,
      nbrStudent: req.body.nbrStudent,
      nbrHour: req.body.nbrHour,
      Lecture: req.body.Lecture,
      Medium: req.body.Medium,
      imagesCardSupervisor: req.files["imagesCardSupervisor"][0].path,
      nameSupervisor: req.body.nameSupervisor,
      Dollar: req.body.Dollar,
    });

    const data = await secondCardss.save();
    return res.status(202).json({
      message: "Created secondCards successfuly",
      secondCards: {
        doc: data,
        request: {
          type: "GET",
          url: `http://localhost:3002/secondCardsRouter/${data._id}`,
        },
      },
    });
  } catch (error) {
    res.status(404).send("${error}");
  }
};
/*-----------------------------patch a secondCards-----------------------------*/
exports.patch_secondCards = async (req, res, next) => {
  try {
    const id = req.params.secondCardsId;
    const data = await secondCards.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (err) {
      res.status(500).json({ error: err });
    } else {
      res.status(200).json(data);
    }
  } catch (error) {
    res.status(404).json("{$error");
  }
};
/*-----------------------------delete a secondCards-----------------------------*/
exports.delete_secondCards = async (req, res, next) => {
  try {
    const _id = req.params.delete;
    if (!mongoose.Types.ObjectId.isValid(_id))
      return res.status(404).send(`No post with id: ${_id}`);
    const data = await secondCards.findByIdAndDelete({ _id: _id });
    return res.status(202).json({
      message: "secondCards deleted successfully.",
      secondCards_deleted: data,
    });
  } catch (error) {
    return res.status(404).json({ error: error });
  }
};
/*-----------------------------getting a secondCards by id-----------------------------*/

exports.get_secondCards_id = async (req, res, next) => {
  try {
    const id = req.params.secondCardsId;
    const data = await secondCards.findById(id).select("-__v");

    if (doc) {
      res.status(200).json(data);
    } else {
      res.status(404).json({ message: "invalid id" });
    }
  } catch (error) {
    res.status(500).json({
      error: err,
    });
  }
};
