const error = require("../middleware/error_middleware");
const selectionsRouter = require("../routes/selection_route");
const notFoundRouter = require("../routes/not_found_route");

const initRoutes = (app) => {
  app.use("/", selectionsRouter);

  app.use(error);
  app.use("*", notFoundRouter);
};

module.exports = {
  init: initRoutes,
};
