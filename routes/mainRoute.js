const { Router } = require("express");
const express = require("express");
const mainRouter = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require("../config/auth");

// Welcome Page
mainRouter.get("/", forwardAuthenticated, (req, res) => {
  res.render("welcome");
});

// Dashboard
mainRouter.get("/dashboard", ensureAuthenticated, (req, res) =>
  res.render("dashboard", {
    user: req.user,
  })
);

module.exports = mainRouter;
