const express = require("express");
const session = require("express-session");

require("dotenv").config();
const dbConnection = require("./db/config");

//Importing Routes & Middlewares
const authenticateJWT = require("./middlewares/authMiddleware");
const authRoutes = require("./routes/authRoutes");
const spotRoutes = require("./routes/spotRoutes");
const calculateRoute = require("./routes/calculateRoutes");
const estimateRoutes = require("./routes/estimateRoutes");

//Library Setup
const app = express();
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
  })
);

app.get("/", (req, res) => {
  res.json({ message: "Server is Running..." });
});

app.get("/health", (req, res) => {
  res.json({ message: "OK!" });
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/spots", authenticateJWT, spotRoutes);
app.use("/api/v1/calculate", authenticateJWT, calculateRoute);
app.use("/api/v1/estimate", authenticateJWT, estimateRoutes);

//Invalid Route Handling
app.all("*", (req, res) => {
  res.status(404).json({ error: "Route Not Found!" });
});

//Error handling
app.use((error, req, res, next) => {
  console.error("Error-> " + error);
  res
    .status(error.status || 500)
    .json({ message: error.message || "Internal Server Error!!" });
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log(`App listening on port ${port}`);
});
