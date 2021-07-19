const controller = require("./tables.controller");
const router = require("express").Router();
const methodNotAllowed = require("../errors/methodNotAllowed");

router
  .route("/")
  .get(controller.list)
  .post(controller.create)
  .all(methodNotAllowed);
router
  .route("/:table_id")
  .get(controller.read)
  .put(controller.update)
  .all(methodNotAllowed);
