'use strict';
require('dotenv').config();

const chromeLauncher = require( 'chrome-launcher' );
const fs = require( 'fs' );
const lighthouse = require( 'lighthouse' );

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
