const jwt = require("jsonwebtoken");
const checkToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader;
    console.log(token);
    jwt.verify(token, "password", (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: "Invalid token" });
      } else {
        req.user = decoded;
        next();
      }
    });
  } else {
    res
      .status(401)
      .json({
        error:
          "Authorization header is required please login or send the token",
      });
  }
};
module.exports = {
  checkToken,
};
