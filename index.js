

require('dotenv').config();

const express = require('express');
const fs = require('fs');
const { lighthousePerfAudits } = require('./audits/lighthousePerfAudits');

const app = express();
const { APP_STAGING_URL, APP_PRODUCTION_URL } = process.env;
const flags = {
  output: 'json',
};

app.use(bodyParser.json());

app.get('/run', (req, res) => {
  // 1. Check secret
  if (req.headers['X-Hub-Signature']) {
    console.log('it is working great');

    /**
     * Secret is valid,
     * run tests and write json data
     * on both environments
     */
    lighthousePerfAudits(APP_PRODUCTION_URL, flags)
      .then((results) => {
        fs.writeFile('/production_results.json', JSON.stringify(results), (err) => {
          if (err) {
            return console.log(err);
          }
          console.log('The file was saved!');
        });
      });

    lighthousePerfAudits(APP_STAGING_URL, flags)
      .then((results) => {
        fs.writeFile('/staging_results.json', JSON.stringify(results), (err) => {
          if (err) {
            return console.log(err);
          }
          console.log('The file was saved!');
        });
      });

    //       send response with 200
    res.status(200).send();
  } else {
    res.status(500).send();
  }

  //    secret is not valid, return 500
});
