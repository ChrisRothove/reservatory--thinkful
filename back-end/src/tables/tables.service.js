const knex = require("../db/connection");

function list() {
  return knex("tables").select("*");
}

function read(table_id) {
  return knex("tables")
    .select("*")
    .where("table_id", table_id)
    .orderBy("table_id");
}

function update(data) {
  return knex("tables")
    .where("table_id", data.table_id)
    .update({ occupied: data.occupied }, [
      "table_id",
      "table_name",
      "table_capacity",
      "occupied",
    ]);
}

function create(data) {
  return knex("tables").insert(data, [
    "table_id",
    "table_name",
    "table_capacity",
    "occupied",
  ]);
}

module.exports = {
  list,
  read,
  update,
  create,
};
