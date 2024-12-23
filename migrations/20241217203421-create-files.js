'use strict';

module.exports = {
  up(queryInterface) {
    return queryInterface.sequelize.query(`
      CREATE TABLE IF NOT EXISTS files (
        id SERIAL PRIMARY KEY,
        
        filePath VARCHAR(255) NOT NULL,
        mimeType VARCHAR(50) NOT NULL,
        size VARCHAR(30) NOT NULL,

        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );`
      .replace(/\s+/ig, ' ').trim());
  },

  down(queryInterface) {
    return queryInterface.sequelize.query('DROP TABLE IF EXISTS files;');
  }
};