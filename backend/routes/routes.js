var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
var Expense = require("../../models/Expense");

router.get("/", function(req, res) {
  res.render("index");
});

router.route("/insert").post(function(request, response) {
  var expense = new Expense();
  expense.description = request.body.description;
  expense.amount = request.body.amount;
  expense.month = request.body.month;
  expense.year = request.body.year;

  expense.save(function(err) {
    if (err) {
      response.send(err);
    } else {
      response.send("Expense added successfully!");
    }
  });
});

router.route("/update").post(function(request, response) {
  const doc = {
    description: request.body.description,
    amount: request.body.amount,
    month: request.body.month,
    year: request.body.year
  };
  console.log(doc);
  Expense.update({ _id: request.body._id }, doc, function(err, result) {
    if (err) {
      response.send(err);
    } else {
      response.send("Expense updated successfully !");
    }
  });
});

router.get("/delete", function(request, response) {
  Expense.find({ _id: request.query.id })
    .remove()
    .exec(function(err, result) {
      if (err) {
        response.send(error);
      } else {
        response.send("Expense deleted successfully !");
      }
    });
});

router.get("/getAll", function(request, response) {
  var monthRec = request.query.month;
  var yearRec = request.query.year;
  if (monthRec && monthRec !== "All") {
    Expense.find({ $and: [{ month: monthRec }, { year: yearRec }] }, function(
      err,
      result
    ) {
      if (err) {
        response.send(err);
      } else {
        response.json(result);
      }
    });
  } else {
    Expense.find({ year: yearRec }, function(err, expenses) {
      if (err) {
        response.send(err);
      } else {
        response.json(expenses);
      }
    });
  }
});

module.exports = router;
