'use strict';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.sequelize.query(`
      CREATE TABLE IF NOT EXISTS messages (
        id SERIAL PRIMARY KEY,
        
        userId INTEGER NOT NULL,
        type SMALLINT NOT NULL, -- 1 - text, 2 - file
        content VARCHAR(2000) NULL,
        fileId INTEGER NULL,

        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    const tableExists = await queryInterface.sequelize.query(`
      SELECT to_regclass('public.files') IS NOT NULL as exists;
    `);

    const exists = tableExists[0][0].exists;

    if (exists) {
      await queryInterface.sequelize.query(`
        ALTER TABLE messages
        ADD CONSTRAINT messagesUserIdFk FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE;
      `);

      await queryInterface.sequelize.query(`
        ALTER TABLE messages
        ADD CONSTRAINT messagesFileIdFk FOREIGN KEY (fileId) REFERENCES files(id) ON DELETE SET NULL ON UPDATE CASCADE;
      `);
    } else {
      throw new Error('Table "files" does not exist!');
    }
  },

  down(queryInterface) {
    return queryInterface.sequelize.query('DROP TABLE IF EXISTS messages;');
  }
};