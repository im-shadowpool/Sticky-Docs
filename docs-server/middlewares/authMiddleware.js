const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const Authorization = req.header("Authorization");
  if (!Authorization) {
    return res.status(401).send({ message: "Unauthorized" });
  }
  const token = Authorization.replace("Bearer ", "");

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    // console.log('process.env.JWT_SECRET: ', process.env.JWT_SECRET);
    if (err) {
      return res.status(403).send({ message: "Forbidden", err });
    }
    req.user = user;
    console.log("Success Auth", req.user);
    next();
  });
};

module.exports = authMiddleware;
