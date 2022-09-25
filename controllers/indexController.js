const home = (req, res) => {
  const items = [];
  res.render("index", { items });
};

module.exports = { home };
