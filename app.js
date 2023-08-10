"use strict";

const express = require("express");
const morgan = require("morgan");
const itemRoutes = require("./itemRoutes");
const { NotFoundError } = require("./expressError");
const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(morgan('dev'));
app.use("/items", itemRoutes);

// ROUTES

app.use(function (req, res) { throw new NotFoundError(); });

app.use(function (err, req, res, next) {
  const status = err.status || 500;
  const message = err.message;
  if (process.env.NODE_ENV !== "test") console.error(status, err.stack);
  return res.status(status).json({ error: { message, status } });
});

module.exports = app;