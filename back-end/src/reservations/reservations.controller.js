const service = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const { today } = require("../utils/date-time");

/**~~~~~~~~~~~~~~~~MIDDLEWARE~~~~~~~~~~~~~~~*/

function hasData(req, res, next) {
  if (req.body.data) {
    next();
  } else {
    next({
      status: 400,
      message: "Request body must contain data.",
    });
  }
}

function hasFirstName(req, res, next) {
  const first_name = req.body.data.first_name;
  if (first_name && first_name !== "") {
    next();
  } else {
    next({
      status: 400,
      message: "Request Data must contain first_name",
    });
  }
}

function hasLastName(req, res, next) {
  const last_name = req.body.data.last_name;
  if (last_name && last_name !== "") {
    next();
  } else {
    next({
      status: 400,
      message: "Request Data must contain last_name",
    });
  }
}

function hasMobilePhone(req, res, next) {
  const mobile_number = req.body.data.mobile_number;
  if (mobile_number && mobile_number !== "") {
    next();
  } else {
    next({
      status: 400,
      message: "Request Data must contain mobile_number",
    });
  }
}

function hasDate(req, res, next) {
  const reservation_date = req.body.data.reservation_date;
  if (reservation_date && reservation_date !== "") {
    next();
  } else {
    next({
      status: 400,
      message: "Request Data must contain reservation_date",
    });
  }
}

function dateIsValid(req, res, next) {
  const reservation_date = req.body.data.reservation_date;
  if (Date.parse(reservation_date)) {
    next();
  } else {
    next({
      status: 400,
      message: "Requested reservation_date must be a date.",
    });
  }
}

function notTuesday(req, res, next) {
  const reservation_date = req.body.data.reservation_date;
  const inputDate = new Date(reservation_date);
  if (inputDate.getDay() === 1) {
    next({
      status: 400,
      message: "closed on tuesday",
    });
  } else {
    next();
  }
}

function futureDate(req, res, next) {
  const reservation_date = req.body.data.reservation_date;
  const inputDate = new Date(reservation_date);
  const todayDate = new Date(today());

  if (inputDate < todayDate) {
    next({
      status: 400,
      message: "date must be a future or present date/time",
    });
  } else {
    next();
  }
}

function hasTime(req, res, next) {
  const reservation_time = req.body.data.reservation_time;
  if (reservation_time && reservation_time !== "") {
    next();
  } else {
    next({
      status: 400,
      message: "Request Data must contain reservation_time",
    });
  }
}

function timeIsValid(req, res, next) {
  const reservation_time = req.body.data.reservation_time;

  const splitTime = reservation_time.split(":");

  const sixNumbersFormat =
    splitTime?.length === 2 &&
    splitTime[0]?.length === 2 &&
    splitTime[1]?.length === 2;

  if (sixNumbersFormat) {
    next();
  } else {
    next({
      status: 400,
      message: "Requested reservation_time must be a time.",
    });
  }
}

function notBeforeOpen(req, res, next) {
  const reservation_time = req.body.data.reservation_time;

  const splitTime = reservation_time.split(":");
  if (Number(splitTime[0]) <= 10) {
    if (Number(splitTime[0]) === 10) {
      if (Number(splitTime[1]) < 30) {
        next({
          status: 400,
          message: "Closed before 10:30",
        });
      }
    } else {
      next({
        status: 400,
        message: "Closed before 10:30",
      });
    }
  } else {
    next();
  }
}

function notBeforeClose(req, res, next) {
  const reservation_time = req.body.data.reservation_time;

  const splitTime = reservation_time.split(":");
  if (Number(splitTime[0]) >= 21) {
    if (Number(splitTime[0]) === 21) {
      if (Number(splitTime[1]) > 30) {
        next({
          status: 400,
          message: "Too close to closing time.",
        });
      }
    } else {
      next({
        status: 400,
        message: "Too close to closing time.",
      });
    }
  } else {
    next();
  }
}

function hasPeople(req, res, next) {
  const people = req.body.data.people;
  if (people && people !== "" && people !== 0) {
    next();
  } else {
    next({
      status: 400,
      message: "Request Data must contain people",
    });
  }
}

function peopleIsNumber(req, res, next) {
  const people = req.body.data.people;
  if (typeof people !== "number") {
    next({
      status: 400,
      message: "people must be a number.",
    });
  } else {
    next();
  }
}

/**~~~~~~~~~~~~~~~~STATUS MIDDLEWARE~~~~~~~~~~~~~~~*/
function booked(req, res, next) {
  const status = req.body.data.status;
  if (status === "booked" || !status) {
    next();
  } else {
    next({
      status: 400,
      message: `initial status cannot be ${status}`,
    });
  }
}

async function finished(req, res, next) {
  const currentRes = await service.read(req.params.reservation_id);
  if (currentRes.status !== "finished" && currentRes.status !== "cancelled") {
    next();
  } else {
    next({
      status: 400,
      message: `cannot update a finished or cancelled status`,
    });
  }
}

async function resIsValid(req, res, next) {
  const resId = req.params.reservation_id;
  const foundRes = await service.read(resId);
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

function validStatus(req, res, next) {
  const status = req.body.data.status;
  if (
    status === "booked" ||
    status === "seated" ||
    status === "finished" ||
    status === "cancelled"
  ) {
    next();
  } else {
    next({
      status: 400,
      message: `${status} is not a valid status`,
    });
  }
}

/**~~~~~~~~~~~~~~~~END POINTS~~~~~~~~~~~~~~~*/
async function list(req, res) {
  res.json({
    data: await service.list(),
  });
}

async function listByQuery(req, res) {
  const date = req.query.date;
  const mobile_number = req.query.mobile_number;
  if (date) {
    res.json({
      data: await service.listByDate(req.query.date),
    });
  } else if (mobile_number) {
    res.json({
      data: await service.listByPhone(req.query.mobile_number),
    });
  }
}

async function create(req, res) {
  res.status(201).json({ data: await service.create(req.body.data) });
}

async function read(req, res) {
  res.json({
    data: await service.read(req.params.reservation_id),
  });
}

async function updateStatus(req, res) {
  const status = req.body.data.status;
  const res_id = req.params.reservation_id;
  res.status(200).json({
    data: await service.updateStatus(res_id, status),
  });
}

async function update(req, res) {
  const newReservation = req.body.data;
  res.status(200).json({
    data: await service.update(newReservation),
  });
}

module.exports = {
  list: asyncErrorBoundary(list),
  read: asyncErrorBoundary(read),
  listByQuery: asyncErrorBoundary(listByQuery),
  create: [
    hasData,
    hasFirstName,
    hasLastName,
    hasMobilePhone,
    hasDate,
    dateIsValid,
    notTuesday,
    futureDate,
    hasTime,
    timeIsValid,
    notBeforeOpen,
    notBeforeClose,
    hasPeople,
    peopleIsNumber,
    booked,
    asyncErrorBoundary(create),
  ],
  updateStatus: [
    hasData,
    asyncErrorBoundary(resIsValid),
    validStatus,
    finished,
    asyncErrorBoundary(updateStatus),
  ],
  update: [
    hasData,
    asyncErrorBoundary(resIsValid),
    hasFirstName,
    hasLastName,
    hasMobilePhone,
    hasDate,
    dateIsValid,
    notTuesday,
    futureDate,
    hasTime,
    timeIsValid,
    notBeforeOpen,
    notBeforeClose,
    hasPeople,
    peopleIsNumber,
    booked,
    asyncErrorBoundary(update),
  ],
};
