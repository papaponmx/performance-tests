'use strict';
require('dotenv').config();




lighthousePerfAudits( APP_URL, flags )
  .then( results => {
     fs.writeFile( './results.json', JSON.stringify(results), function ( err ) {
        if ( err ) {
          return console.log( err );
        }
        console.log( 'The file was saved!' );
      } );
});
