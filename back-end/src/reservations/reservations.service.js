const knex = require("../db/connection");

function list() {
  return knex("reservations").select("*").whereNot({ status: "finished" });
}

function read(reservation_id) {
  return knex("reservations")
    .select("*")
    .where("reservation_id", reservation_id)
    .then((created) => created[0]);
}

function listByDate(date) {
  return knex("reservations")
    .select("*")
    .whereNot({ status: "finished", status: "cancelled" })
    .where("reservation_date", date)
    .orderBy("reservation_time");
}

function listByPhone(phone) {
  return knex("reservations")
    .select("*")
    .whereNot({ status: "finished", status: "cancelled" })
    .where("mobile_number", "like", `%${phone}%`)
    .orderBy("reservation_time");
}

function create(newReservation) {
  return knex("reservations")
    .insert(newReservation, [
      "reservation_id",
      "first_name",
      "last_name",
      "mobile_number",
      "people",
      "status",
      "reservation_date",
      "reservation_time",
    ])
    .then((created) => created[0]);
}

function updateStatus(res_id, status) {
  return knex("reservations")
    .where({ reservation_id: res_id })
    .update({ status: status }, [
      "reservation_id",
      "first_name",
      "last_name",
      "mobile_number",
      "people",
      "status",
      "reservation_date",
      "reservation_time",
    ])
    .then((created) => created[0]);
}

function update(newReservation) {
  return knex("reservations")
    .where({ reservation_id: newReservation.reservation_id })
    .update(newReservation, "*")
    .then((created) => created[0]);
}

module.exports = {
  list,
  listByDate,
  listByPhone,
  create,
  read,
  updateStatus,
  update,
};
