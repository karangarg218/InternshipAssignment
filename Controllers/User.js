const jwt = require("jsonwebtoken");
let users = [
  {
    type: "admin",
    name: "karan",
    email: "karangarg218@gmail.com",
    password: "12345",
  },
];

const login = (req, res) => {
  const { email, password } = req.body;
  let user;
  const index = users.findIndex((user) => user.email == email);
  if (index != -1) {
    user = users[index];
    if (user.password == password) {
      const payload = {
        email: user.email,
        type: user.type,
      };
      const secretKey = "password"; // Replace with your secret key
      const options = { expiresIn: "1h" }; // Optional expiration

      const token = jwt.sign(payload, secretKey, options);
      return res.json({
        message: "successfully login",
        token: token,
      });
    } else {
      return res.status(500).json({
        message: "password is incorrect",
        success: false,
      });
    }
  } else {
    return res.status(404).json({
      message: "user not found",
      success: false,
    });
  }
};

const signUp = (req, res) => {
  const { name, email, password } = req.body;
  //check user exist or not
  let index = users.findIndex((user) => user.email == email);
  if (index != -1) {
    res.status(409).json({
      message: "Email already exist please login",
    });
  }
  users.push({
    name,
    email,
    password,
    type: "normal",
  });

  return res.status(201).json({
    message: "please login",
    data: {
      name,
      email,
      type: "normal",
    },
  });
};
module.exports = {
  login,
  signUp,
};
