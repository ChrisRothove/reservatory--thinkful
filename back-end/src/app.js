const path = require("path");
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({ path: path.join(__dirname, "..", ".env") });
}
const morgan = require("morgan");
const express = require("express");
const cors = require("cors");

const errorHandler = require("./errors/errorHandler");
const notFound = require("./errors/notFound");
const reservationsRouter = require("./reservations/reservations.router");
const tablesRouter = require("./tables/tables.router");

const app = express();
app.use(morgan("combined"));
app.use(cors());
app.use(express.json());
if (process.env.NODE_ENV === "production") {
  app.use(
    "/",
    express.static(path.join(__dirname, "..", "..", "front-end", "build"))
  );
}

app.use("/reservations", reservationsRouter);
app.use("/tables", tablesRouter);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
