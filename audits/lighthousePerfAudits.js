'use strict';
require('dotenv').config();

const chromeLauncher = require( 'lighthouse/chrome-launcher/chrome-launcher' );
const fs = require( 'fs' );
const lighthouse = require( 'lighthouse' );

const { APP_URL } = proccess.env;

const flags = {
  output: 'json'
};

const lighthousePerfAudits = (url, flags, config = null) => {
  return chromeLauncher.launch()
    .then( chrome => {
      flags.port = chrome.port;
      return lighthouse(url, flags, config)
        .then( results =>
          chrome.kill()
          .then(() => results)
        );
    } );
}

module.exports.lighthousePerfAudits = lighthousePerfAudits;
