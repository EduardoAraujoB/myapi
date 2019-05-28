const jwt = require("jsonwebtoken");
const auth = require("../config/auth.json");

module.exports = (req, res, next) => {
  const headerAuth = req.headers.authorization;

  if (!headerAuth) {
    return res.status(401).send({ error: "No token provided" });
  }

  const parts = headerAuth.split(" ");

  if (!parts.length === 2) {
    return res.status(401).send({ error: "Token format error" });
  }

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme)) {
    return res.status(401).send({ error: "Token malformated" });
  }

  jwt.verify(token, auth.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ error: "Token invalid" });
    }

    req.memberId = decoded.id;

    return next();
  });
};
