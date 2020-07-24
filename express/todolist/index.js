import express from "express";
import parser from "body-parser";
import path from "path";
import {getDate} from "./date.js";

const port = 3000;
const app = express();
const __dirname = path.resolve();

let items = [];
let workItems = [];

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, 'public')));
app.use(parser.urlencoded({extended: true}));

app.get("/", (req, res) => {
  const lang = req.headers["accept-language"] || "en-us";
  const day = date(lang);
  res.render("list", { listTitle: day, items: items });
});

app.post("/", (req, res) => {
  if (req.body.list === "Work") {
    workItems.push(req.body.newItem);
    res.redirect("/work");
  } else {
    items.push(req.body.newItem);
    res.redirect("/");
  }
});

app.get("/work", (req, res) => {
  res.render("list", { listTitle: "Work", items: workItems });
});

app.listen(port, () => {
  console.log("Listening on %d", port);
});
