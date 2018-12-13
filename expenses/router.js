"use strict";
const express = require("express");
const bodyParser = require("body-parser");
const { Expense } = require("./models");
const passport = require("passport");
const router = express.Router();
const jsonParser = bodyParser.json();
const jwtAuth = passport.authenticate("jwt", { session: false });

router.get("/", jwtAuth, (req, res) => {
  Expense.find({
    user: req.user.id
  })
    .then(expenses => {
      res.json({
        expenses: expenses.map(expense => expense.serialize())
      });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    });
});

router.post("/", jwtAuth, jsonParser, (req, res) => {
  const requiredFields = ["description", "category", "value"];
  for (let i = 0; i < requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`;
      console.error(message);
      return res.status(400).send(message);
    }
  }

  Expense.create({
    user: req.user.id,
    description: req.body.description,
    category: req.body.category,
    value: req.body.value,
    date: req.body.date
  })
    .then(expense => res.status(201).json(expense.serialize()))
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    });
});

router.put("/:id", jwtAuth, jsonParser, (req, res) => {
  if (!(req.params.id && req.body.id && req.params.id === req.body.id)) {
    const message =
      `Request path id (${req.params.id}) and request body id ` +
      `(${req.body.id}) must match`;
    console.error(message);
    return res.status(400).json({ message: message });
  }
  const toUpdate = {};
  const updateableFields = ["description", "category", "value", "date"];

  updateableFields.forEach(field => {
    if (field in req.body) {
      toUpdate[field] = req.body[field];
    }
  });

  Expense.findByIdAndUpdate(req.params.id, { $set: toUpdate })
    .then(expense => res.status(204).end())
    .catch(err => res.status(500).json({ message: "Internal server error" }));
});

router.delete("/:id", jwtAuth, (req, res) => {
  Expense.findByIdAndRemove(req.params.id)
    .then(expense => res.status(204).end())
    .catch(err => res.status(500).json({ message: "Internal server error" }));
});

module.exports = { router };
