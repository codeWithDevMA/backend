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
    const secondCards = new secondCards({
      _id: new mongoose.Types.ObjectId(),
      img: req.file.path,
      spantext1: req.body.nbrStar,
      spantext2: req.body.nbrStudent,
      spantext3: req.body.nbrHour,
      spantext4: req.body.Lecture,
      spantext5: req.body.Medium,
      img2: req.file.path,
      nameSupervisor: req.body.nameSupervisor,
      Dollar: req.body.Dollar,
    });
    const data = await secondCards.save();
    return res.status(202).json({
      message: "Created secondCards successfuly",
      secondCards: {
        doc: data,
        request: {
          type: "GET",
          url: `http://localhost:3000/secondCards/${doc._id}`,
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
