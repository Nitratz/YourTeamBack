const logger = require("./logger");
const express = require("express");
const app = express();

const port = 3300;

const server = app.listen(port, () => {
  logger.info(`Server is launched on ${port} port`);
});

module.exports = {
  app,
  server
};
