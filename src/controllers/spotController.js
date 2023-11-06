const Spot = require("../models/spot");

const getAllSpots = async (req, res, next) => {
  try {
    const spots = await Spot.getAllSpots();
    res.json({ spots: spots });
  } catch (error) {
    next(error);
  }
};

const getSpotByName = async (req, res, next) => {
  const spotName = req.params.spotName;
  try {
    const spot = await Spot.getSpotByName(spotName);
    if (spot) {
      res.json(spot);
    } else {
      res.status(404).json({ message: "Spot not found" });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllSpots,
  getSpotByName,
};
