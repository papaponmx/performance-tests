'use strict';
require('dotenv').config();

const chromeLauncher = require('chrome-launcher' );
const lighthouse = require( 'lighthouse' );

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
