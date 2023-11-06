const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const users = require("../util/user");

const authFunc = async (req, res, next) => {
  const { username, password } = req.body;

  //Sample User List instead of creating User Table in DB
  const user = users.find((u) => u.username === username);

  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ message: "Invalid username or password" });
  }

  const token = jwt.sign({ username: user.username }, process.env.SECRET_KEY, {
    expiresIn: "1h",
  });

  res.json({ token });
};
module.exports = {
  authFunc,
};
