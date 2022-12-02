const mongoose = require("mongoose");
const cards = require("../models/Card");

/*-----------------------------post orders-----------------------------*/
exports.get_cards = async (req, res, next) => {
  try {
    const data = await cards.find().select("-__v");
    if (!data) return res.status("data not found");
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: err });
  }
};
/*-----------------------------get all cards-----------------------------*/
exports.post_cards = async (req, res, next) => {
  try {
    console.log(req.body);
    const cardss = new cards({
      imagesCard: req.file.path,
      NameTeacher: req.body.NameTeacher,
      Module: req.body.Module,
      spantext1: req.body.spantext1,
      spantext2: req.body.spantext2,
      spantext3: req.body.spantext3,
    });
    const data = await cardss.save();
    return res.status(202).json({
      message: "Created cards successfuly",
      cards: {
        doc: data,
        request: {
          type: "GET",
          url: `http://localhost:3002/Card/${data._id}`,
        },
      },
    });
  } catch (error) {
    console.log(error);
    res.status(404).send("${error}");
  }
};
/*-----------------------------patch a cards-----------------------------*/
exports.patch_cards = async (req, res, next) => {
  try {
    const id = req.params.cardsId;
    const data = await cards.findByIdAndUpdate(id, req.body, { new: true });
    if (err) {
      res.status(500).json({ error: err });
    } else {
      res.status(200).json(data);
    }
  } catch (error) {
    res.status(404).json("{$error");
  }
};
/*-----------------------------delete a cards-----------------------------*/
exports.delete_cards = async (req, res, next) => {
  try {
    const _id = req.params.delete;
    if (!mongoose.Types.ObjectId.isValid(_id))
      return res.status(404).send(`No post with id: ${_id}`);
    const data = await cards.findByIdAndDelete({ _id: _id });
    return res.status(202).json({
      message: "cards deleted successfully.",
      cards_deleted: data,
    });
  } catch (error) {
    return res.status(404).json({ error: error });
  }
};
/*-----------------------------getting a cards by id-----------------------------*/

exports.get_cards_id = async (req, res, next) => {
  try {
    const id = req.params.cardsId;
    const data = await cards.findById(id).select("-__v");
    if (data) {
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
