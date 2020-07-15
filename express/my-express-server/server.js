import express from "express";

const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('<h1>Hello, Work</h1>'));
app.get('/about', (req, res) => res.send('<h3>I am Georgie\'s servant</h3>'));
app.listen(port, () => { console.log("App listening on port %d", port)});