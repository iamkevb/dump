//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const lodash = require("lodash");

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.set("useFindAndModify", false);
mongoose.connect("mongodb://localhost:27017/todolistDB", { useNewUrlParser: true, useUnifiedTopology: true });

const itemSchema = {
  name: String,
};
const Item = mongoose.model("item", itemSchema);

const listSchema = {
  name: String,
  items: [itemSchema],
};
const List = mongoose.model("list", listSchema);

app.get("/", function (req, res) {
  res.redirect("/Today");
});

app.get("/:listName", (req, res) => {
  const listName = lodash.capitalize(req.params.listName);
  List.findOne({ name: listName }, (err, list) => {
    if (list) {
      res.render("list", { listName: listName, newListItems: list.items });
    } else {
      list = new List({
        name: listName,
      });
      list.save((err) => {
        res.render("list", { listName: listName, newListItems: list.items });
      });
    }
  });
});

app.post("/", function (req, res) {
  const item = new Item({ name: req.body.newItem });
  const listName = req.body.list;

  List.findOneAndUpdate(
    { name: listName },
    {
      $push: { items: item },
    },
    (err) => {
      res.redirect("/" + listName);
    }
  );
});

app.post("/delete", (req, res) => {
  const itemId = req.body.item;
  var listName = req.body.list;

  List.findOneAndUpdate(
    { name: listName },
    {
      $pull: {
        items: { _id: itemId },
      },
    },
    (err, result) => {
      res.redirect("/" + listName);
    }
  );
});

app.get("/about", function (req, res) {
  res.render("about");
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
