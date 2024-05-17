const Sequelize = require("sequelize");
const connection = require("./database");

// define model
const Question = connection.define("question", {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
});

// create table
Question.sync({ force: false })
  .then(() => {
    console.log("Tabela criada!");
  })
  .catch((msgErro) => {
    console.log(msgErro);
  });

module.exports = Question;
