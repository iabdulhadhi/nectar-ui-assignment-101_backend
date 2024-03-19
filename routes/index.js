const express = require("express");
const routes = express.Router();

const location = require('./location');
routes.use("/location", location);

module.exports = routes;