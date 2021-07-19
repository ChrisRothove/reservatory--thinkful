const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const service = require("./tables.service");

/**~~~~~~~~~~~~~~~~Middleware~~~~~~~~~~~~~~~*/
function hasName(req, res, next) {
  const name = req.body.data.table_name;
  if (name) {
    next();
  } else {
    next({
      status: 400,
      message: "Must include a name property.",
    });
  }
}

function hasCapacity(req, res, next) {
  const capacity = req.body.data.table_name;
  if (capacity) {
    next();
  } else {
    next({
      status: 400,
      message: "Must include a capacity.",
    });
  }
}

function capacityIsANumber(req, res, next) {
  const capacity = req.body.data.capacity;
  if (typeof capacity === "number") {
    next();
  } else {
    next({
      status: 400,
      message: "Capacity must be a number.",
    });
  }
}

/**~~~~~~~~~~~~~~~~END POINTS~~~~~~~~~~~~~~~*/
async function list(req, res) {
  res.json({ data: await service.list() });
}

async function read(req, res) {
  const table_id = req.body.data.table_id;
  res.json({ data: await service.read(table_id) });
}

async function update(req, res) {
  const data = req.body.data;
  const updatedTable = await service.update(data);
  res.json({ data: updatedTable });
}

async function create(req, res) {
  const data = req.body.data;
  const newTable = await service.create(data);
  res.json({ data: newTable });
}

module.exports = {
  list,
  read,
  update: [hasName, hasCapacity, capacityIsANumber, asyncErrorBoundary(update)],
  create: [hasName, hasCapacity, capacityIsANumber, asyncErrorBoundary(create)],
};
