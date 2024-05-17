const { Sequelize } = require("sequelize");

const connection = new Sequelize("guiaperguntas", "root", "MySQL_123", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = connection;
