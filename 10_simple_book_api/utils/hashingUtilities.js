//bcrypt
const bcrypt = require('bcrypt');

const doHash = async (value, saltRounds = parseInt(process.env.SALT_ROUNDS)) => {
  return await bcrypt.hash(value, saltRounds);
};

const compareHash = async (value, hashed) => {
  return await bcrypt.compare(value, hashed);
};

module.exports = { doHash, compareHash };
