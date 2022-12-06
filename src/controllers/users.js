const mongoose = require("mongoose");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
exports.Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const data = await User.findOne({ email });
    if (!data) return res.status(404).send("user not found");
    const isPassword = await bcrypt.compare(password, data.password);
    if (!isPassword) return res.status(404).send("invalid password ");
    const token = jwt.sign(
      { message: "valid id", data: email, userId: data._id },
      process.env.JWT_KEY,
      { expiresIn: "1h" }
    );
    const up = { _id: data._id, token: token };
    const user = await User.findByIdAndUpdate(data._id, up, { new: true });

    return res.status(202).json({ token: token, result: user });
  } catch (error) {
    return res.status(404).send(`${error}`);
  }
};
///////////////////////////////
exports.Signup = async (req, res) => {
  console.log(req.body);
  try {
    const { email, password, name } = req.body;

    const isUser = await User.findOne({ email });
    if (isUser) return res.status(202).send("this mail exist");
    const hasPassword = await bcrypt.hash(password, 10);
    const token = jwt.sign(
      { message: "valid id", data: email },
      process.env.JWT_KEY,
      { expiresIn: "1h" }
    );
    const user = new User({
      email: email,
      name: name,
      password: hasPassword,
      token: token,
    });
    const data = await user.save();

    res.status(202).json({ message: "signup  successfuly ", doc: data });
  } catch (error) {
    return res.status(404).json({ error: error });
  }
};
////////////////////////
exports.GetAll = async (req, res, next) => {
  try {
    const data = await User.find();
    if (!data) return res.status(404).send("user does'nt exist");
    res.status(202).json(data);
  } catch (error) {
    return res.status(404).send("${error}");
  }
};
//////////////////////
exports.DeleteUser = async (req, res, next) => {
  try {
    const _id = req.params.delete;
    if (!mongoose.Types.ObjectId(_id))
      return res.status(200).send("invalid id");
    const data_removed = await User.findByIdAndDelete({ _id });
    if (!data_removed) {
      return res.status(404).send("this user doesn'nt exist");
    } else {
      return res
        .status(202)
        .json({ message: "this user deleted successfuly", data: data_removed });
    }
  } catch (error) {
    res.status(404).send("${error}");
  }
};
