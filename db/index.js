const Sequelize = require('sequelize');

module.exports = async () => {
  const sql = new Sequelize({
    host: 'mailshake-applicants.cgdsgo2tzurk.us-east-1.rds.amazonaws.com',
    database: 'music',
    username: 'kylemarlin',
    password: '56CV_?$tr6TG*j3W',
    dialect: 'mysql'
  });
  
  try {
    await sql.authenticate();

    console.log('Database connection established.');

    process.on('exit', () => {
      sql.close();
    });

    return sql;
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};
