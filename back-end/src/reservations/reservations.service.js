const knex = require("../db/connection");

function list() {
  return knex("reservations").select("*");
}

function listByDate(date) {
  return knex("reservations")
    .select("*")
    .where("reservation_date", date)
    .orderBy("reservation_time");
}

function create(newReservation) {
  return knex("reservations")
    .insert(newReservation, [
      "first_name",
      "last_name",
      "mobile_number",
      "people",
      "reservation_date",
      "reservation_time",
    ])
    .then((created) => created[0]);
}

module.exports = {
  list,
  listByDate,
  create,
};
