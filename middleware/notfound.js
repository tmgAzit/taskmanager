const notFound = (req, res) => {
  res.status(404).json(`This route doesn't exit.`);
};

module.exports = notFound;
