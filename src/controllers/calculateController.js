const Spot = require("../models/spot");
const { haversineUtil } = require("../util/haversine");

const calculateTime = async (req, res, next) => {
  const { latitude, longitude, spot, cyclingSpeed, dailyCyclingHours } =
    req.body;

  try {
    const spotDB = await Spot.getSpotByName(spot);
    if (!spotDB) {
      return res.status(404).json({ message: "Spot not found" });
    }

    if (isNaN(latitude) || isNaN(longitude)) {
      return res.status(400).json({ message: "Invalid input values." });
    }

    if (cyclingSpeed <= 0 || dailyCyclingHours <= 0) {
      return res
        .status(400)
        .json({ message: "Cycling speed or Daily Hours can't be 0 or less" });
    }

    if (dailyCyclingHours > 24) {
      return res
        .status(400)
        .json({ message: "Max 24 hours a day for Daily Cycling Hours" });
    }

    if (!spotDB.accessible_by_cycling) {
      return res
        .status(400)
        .json({ message: "Chosen spot is not accessible by cycling" });
    }

    const coord1 = {
      latitude: spotDB.latitude,
      longitude: spotDB.longitude,
    };
    const coord2 = {
      latitude,
      longitude,
    };

    const distance = haversineUtil(coord1, coord2);

    const estimatedTime = distance / cyclingSpeed;
    const totalCyclingTime = (estimatedTime / dailyCyclingHours) * 24; //Converting to hours
    const roundedCyclingTime = Math.round(totalCyclingTime * 100) / 100; //Rounding off

    //Storing in Session, to be fetched by GET /estimate later
    req.session.estimatedTime = roundedCyclingTime;
    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  calculateTime,
};
