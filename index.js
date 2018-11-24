'use strict';
require('dotenv').config();

const fs = require( 'fs' );
const { lighthousePerfAudits } = require('./audits/lighthousePerfAudits')

const { APP_STAGING_URL, APP_PRODUCTION_URL } = process.env;


const flags = {
  output: 'json'
};


lighthousePerfAudits( APP_PRODUCTION_URL, flags )
  .then( results => {
     fs.writeFile( '/production_results.json', JSON.stringify(results), function ( err ) {
        if ( err ) {
          return console.log( err );
        }
        console.log( 'The file was saved!' );
      } );
});

lighthousePerfAudits( APP_STAGING_URL, flags )
  .then( results => {
     fs.writeFile( '/staging_results.json', JSON.stringify(results), function ( err ) {
        if ( err ) {
          return console.log( err );
        }
        console.log( 'The file was saved!' );
      } );
});
