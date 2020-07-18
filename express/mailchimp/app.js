import express from 'express';
import parser from 'body-parser';
import path from 'path';
import request from 'request';
import https from 'https';

const app = express();
const port = 3000;

const __dirname = path.resolve();

app.use(express.static(path.join(__dirname, 'public')));
app.use(parser.urlencoded({extended: true}));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'signup.html'));
});

app.post('/', (req, res) => {
  const firstName = req.body.fname;
  const lastName = req.body.lname;
  const email = req.body.email;

  const data = {
    members: [{
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName
      }
    }]
  };
  const jsonData = JSON.stringify(data);

  const url = "https://us10.api.mailchimp.com/3.0/lists/53e720350f"
  const options = {
    method: "POST",
    auth: "DrSauerkraut:d0bd7f240cc7c9ddb35a773a53ccf440-us10"
  }
  const request = https.request(url, options, (response) => {
    response.on("data", (data) => {
      const responseJson = JSON.parse(data);
      if (responseJson.error_count > 0) {
        res.sendFile(path.join(__dirname, 'failure.html'));
      } else {
        res.sendFile(path.join(__dirname, 'success.html'));
      }
    });
  });
  request.on("error", (e) => {
    res.sendFile(path.join(__dirname, 'failure.html'));
  });
  request.write(jsonData);
  request.end();
});
app.listen(port, () => { console.log("App listening on port %d", port)});


// api key
// d0bd7f240cc7c9ddb35a773a53ccf440-us10

// list ID
// 53e720350f