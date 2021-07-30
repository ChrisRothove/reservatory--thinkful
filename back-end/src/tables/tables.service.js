const knex = require("../db/connection");

function list() {
  return knex("tables").select("*").orderBy("table_name");
}

function read(table_id) {
  return knex("tables")
    .select("*")
    .where({ table_id: table_id })
    .then((created) => created[0]);
}

function update(table_id, reservation_id) {
  return knex("tables")
    .where("table_id", table_id)
    .update({ reservation_id: reservation_id }, [
      "table_id",
      "table_name",
      "capacity",
      "reservation_id",
    ]);
}

function updateFinish(table_id) {
  return knex("tables")
    .where("table_id", table_id)
    .update({ reservation_id: null }, [
      "table_id",
      "table_name",
      "capacity",
      "reservation_id",
    ]);
}

function create(data) {
  return knex("tables")
    .insert(data, ["table_id", "table_name", "capacity"])
    .then((created) => created[0]);
}

module.exports = {
  list,
  read,
  update,
  create,
  updateFinish,
};
