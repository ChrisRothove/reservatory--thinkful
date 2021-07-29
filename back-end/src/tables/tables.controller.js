const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const service = require("./tables.service");
const reservationsService = require("../reservations/reservations.service");

/**~~~~~~~~~~~~~~~~Middleware~~~~~~~~~~~~~~~*/

async function tableExists(req, res, next) {
  const foundTable = await service.read(Number(req.params.table_id));
  console.log(foundTable);
  if (foundTable) {
    res.locals.foundTable = foundTable;
    next();
  } else {
    next({
      status: 404,
      message: `${req.params.table_id} not found.`,
    });
  }
}

function hasData(req, res, next) {
  const data = req.body.data;
  if (data) {
    next();
  } else {
    next({
      status: 400,
      message: "must include a data object",
    });
  }
}

function hasName(req, res, next) {
  const name = req.body.data.table_name;
  if (name) {
    next();
  } else {
    next({
      status: 400,
      message: "Must include a table_name property.",
    });
  }
}

function nameHasTwoCharacters(req, res, next) {
  const name = req.body.data.table_name;
  if (name.length >= 2) {
    next();
  } else {
    next({
      status: 400,
      message: "table_name must be atleast 2 characters",
    });
  }
}

function hasCapacity(req, res, next) {
  const capacity = req.body.data.capacity;
  if (capacity) {
    next();
  } else {
    next({
      status: 400,
      message: "Must include a capacity.",
    });
  }
}

function capacityAtleastOne(req, res, next) {
  const capacity = req.body.data.capacity;
  if (capacity >= 1) {
    next();
  } else {
    next({
      status: 400,
      message: "capacity must be atleast 1",
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

/**~~~~~~~~~~~~~~SEATING MIDDLEWARE~~~~~~~~~~~~~~~~~*/

function resIdExists(req, res, next) {
  if (req.body.data.reservation_id) {
    next();
  } else {
    next({
      status: 400,
      message: "must include a reservation_id",
    });
  }
}

async function tableIdValid(req, res, next) {
  const foundTable = await service.read(req.params.table_id);
  if (foundTable) {
    res.locals.foundTable = { ...foundTable };
    next();
  } else {
    next({
      status: 400,
      message: "table Id must be valid.",
    });
  }
}

async function resIsValid(req, res, next) {
  const resId = req.body.data.reservation_id;
  const foundRes = await reservationsService.read(resId);
  if (foundRes) {
    res.locals.foundRes = { ...foundRes };
    next();
  } else {
    next({
      status: 404,
      message: `${resId} is not a valid reservation_id`,
    });
  }
}

function capacityMatch(req, res, next) {
  const tableCapacity = res.locals.foundTable.capacity;
  const people = res.locals.foundRes.people;
  console.log("tableCap: ", tableCapacity, " people: ", people);
  if (people < tableCapacity) {
    next();
  } else {
    next({
      status: 400,
      message: "table capacity is too low",
    });
  }
}

function tableIsFree(req, res, next) {
  if (res.locals.foundTable.occupied) {
    next({
      status: 400,
      message: "table is occupied.",
    });
  } else {
    next();
  }
}

/**~~~~~~~~~~~~~~~~END POINTS~~~~~~~~~~~~~~~*/
async function list(req, res) {
  res.json({ data: await service.list() });
}

function read(req, res) {
  res.json({ data: res.locals.foundTable });
}

async function updateOccupied(req, res) {
  const tableId = req.params.table_id;
  const updatedTable = await service.update(tableId);
  res.status(200).json({ data: updatedTable });
}

async function create(req, res) {
  const data = req.body.data;
  const newTable = await service.create(data);
  res.status(201).json({ data: newTable });
}

module.exports = {
  list,
  read: [asyncErrorBoundary(tableExists), read],
  updateOccupied: [
    hasData,
    resIdExists,
    asyncErrorBoundary(tableIdValid),
    asyncErrorBoundary(resIsValid),
    tableIsFree,
    capacityMatch,
    asyncErrorBoundary(updateOccupied),
  ],
  create: [
    hasData,
    hasName,
    nameHasTwoCharacters,
    hasCapacity,
    capacityIsANumber,
    capacityAtleastOne,
    asyncErrorBoundary(create),
  ],
};
