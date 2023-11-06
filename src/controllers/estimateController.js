const getEstimatedValue = async (req, res, next) => {
  try {
    const estimatedTime = req.session.estimatedTime;

    if (estimatedTime) {
      res.json({ estimatedTime: estimatedTime });
    } else {
      res
        .status(404)
        .json({ error: "Estimated time not found in the session." });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getEstimatedValue,
};
