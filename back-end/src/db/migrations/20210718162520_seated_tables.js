exports.up = function (knex) {
  return knex.schema.createTable("seated_tables", (table) => {
    table.increments("seating_id").primary();
    table.integer("reservation_id").unsigned();
    table.foreign("reservation_id").references("reservations.reservation_id");
    table.integer("table_id").unsigned();
    table.foreign("table_id").references("tables.table_id");
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("seated_tables");
};
