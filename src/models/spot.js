const db = require("../db/config");

class Spot {
  static getAllSpots() {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT name, accessible_by_cycling FROM tourist_spots",
        (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
        }
      );
    });
  }

  static getSpotByName(spotName) {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT id, name, latitude, longitude, accessible_by_cycling FROM tourist_spots WHERE name = ?",
        [spotName],
        (error, results) => {
          if (error) {
            reject(error);
          } else {
            if (results.length > 0) {
              resolve(results[0]);
            } else {
              resolve(null);
            }
          }
        }
      );
    });
  }
}

module.exports = Spot;
