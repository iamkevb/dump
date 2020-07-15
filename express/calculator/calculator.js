import express from "express";
import path from 'path';
import parser from 'body-parser';
import { truncate } from "fs";

//__dirname not defined when using ES^ Modules.
const moduleURL = new URL(import.meta.url);
const __dirname = path.dirname(moduleURL.pathname);

const app = express();
const port = 3000;

app.use(parser.urlencoded({extended: true}));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});
app.post('/', (req, res) => {
  let num1 = Number(req.body.num1);
  let num2 = Number(req.body.num2);
  res.send('The result of the calculation is '+ (num1+num2));
});

app.get('/bmi', (req, res) => {
  res.sendFile(__dirname + '/bmiCalculator.html');
});
app.post('/bmi', (req, res) => {
  let weight = req.body.weight;
  let height = req.body.height;
  res.send('<h1>Your BMI is ' + weight/(height*height) + '</h1>')
});
app.listen(port, () => { console.log("App listening on port %d", port)});