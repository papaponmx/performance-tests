require('dotenv').config();

const { APP_STAGING_URL, APP_PRODUCTION_URL } = process.env;

const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const { lighthousePerfAudits } = require('./audits/lighthousePerfAudits');
const { hash } = require('./crypto/index');

console.log('DQTP', hash);
const app = express();
const flags = {
  output: 'json',
};

app.use(bodyParser.json());

app.get('/run', (req, res) => {
  // 1. Check secret
  console.log('DQTP', req.body);
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

app.listen(process.env.PORT || 8080, () => {
  console.log('App linstening on ', process.env.PORT || 8080);
});
