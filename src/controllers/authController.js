const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const users = [
  {
    username: "pranav",
    password: "$2b$10$YvDT1.W8.uD/zd16Gpv4c.T9b7mrGqHOeF20U5YmWlYnaDIbNXqV.", // Hashed password for 'pranav'
  },
];

const authFunc = async (req, res, next) => {
  const { username, password } = req.body;

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
