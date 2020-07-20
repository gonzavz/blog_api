'use string';
const crypto = require('crypto');

/**
 * This method use crypto lib to return the hash of a string,
 * based on sha256 algorithm.
 * @params value{String} a string value to be hashed.
 * @return {String} an hex hash of the input value.
 */
const hash = (value) => crypto.createHash('sha256').update(value).digest('hex');

module.exports = hash;
