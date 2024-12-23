'use strict';

module.exports = {
  up(queryInterface) {
    return queryInterface.sequelize.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,

        username VARCHAR(129) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        salt VARCHAR(255) NOT NULL,
        isVerified BOOLEAN NOT NULL DEFAULT FALSE,

        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );`
      .replace(/\s+/ig, ' ').trim());
  },

  down(queryInterface) {
    return queryInterface.sequelize.query('DROP TABLE IF EXISTS users;');
  }
};