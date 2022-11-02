const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
  try {
    const auth = req.headers.authorization.split("Bearer ")[1];
    const decoded = jwt.verify(auth, process.env.jwt_key);
    req.userdata = decoded;
    next();
  } catch (error) {
    return res.status(404).send("${error}");
  }
};
