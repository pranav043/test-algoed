const haversineUtil = (coord1, coord2) => {
  const earthRadius = 6371; // Radius of the Earth in kilometers
  const dLat = (coord1.latitude - coord2.latitude) * (Math.PI / 180);
  const dLon = (coord1.longitude - coord2.longitude) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(coord2.latitude * (Math.PI / 180)) *
      Math.cos(coord1.latitude * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = earthRadius * c;
  return distance;
};

module.exports = {
  haversineUtil,
};
