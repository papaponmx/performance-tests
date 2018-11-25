require('dotenv').config();
const crypto = require('crypto');

const { ALGORITHM, SECRET } = process.env;

const hash = crypto.createHmac(ALGORITHM, SECRET)
  .digest('hex');

console.log('Method 2: ', hash);
module.exports.hash = hash;
