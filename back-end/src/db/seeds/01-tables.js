exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("tables")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("tables").insert([
        {
          table_name: "Bar #1",
          table_capacity: 1,
        },
        {
          table_name: "Bar #2",
          table_capacity: 1,
        },
        {
          table_name: "#1",
          table_capacity: 1,
        },
        {
          table_name: "#2",
          table_capacity: 1,
        },
      ]);
    });
};
