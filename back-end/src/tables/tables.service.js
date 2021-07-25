const knex = require("../db/connection");

function list() {
  return knex("tables").select("*").orderBy("table_name");
}

function read(table_id) {
  return knex("tables")
    .where("table_id", table_id)
    .select("*")
    .then((created) => created[0]);
}

function update(data) {
  return knex("tables")
    .where("table_id", data.table_id)
    .update({ occupied: true }, [
      "table_id",
      "table_name",
      "capacity",
      "occupied",
    ]);
}

function create(data) {
  return knex("tables")
    .insert(data, ["table_name", "capacity"])
    .then((created) => created[0]);
}

module.exports = {
  list,
  read,
  update,
  create,
};
