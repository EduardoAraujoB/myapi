const jwt = require("jsonwebtoken");
const auth = require("./config/auth.json");

module.exports = {
  validate(req, res) {
    const { token } = req.body;
    jwt.verify(token, auth.secret, (err, decoded) => {
      if (err) {
        return res.send({ token: "invalid" });
      }
      res.send({ token: "valid" });
    });
  }
};
