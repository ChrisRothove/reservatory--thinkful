const service = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

/**~~~~~~~~~~~~~~~~MIDDLEWARE~~~~~~~~~~~~~~~*/

/**~~~~~~~~~~~~~~~~END POINTS~~~~~~~~~~~~~~~*/
async function list(req, res) {
  res.json({
    data: await service.list(),
  });
}

async function listByDate(req, res) {
  console.log(req.query);
  res.json({
    data: await service.listByDate(req.query.inquiryDate),
  });
}

module.exports = {
  list: asyncErrorBoundary(list),
  listByDate: asyncErrorBoundary(listByDate),
};
