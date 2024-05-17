const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");
const Question = require("./database/Question");
const Answer = require("./database/Answer");

// database
connection
  .authenticate()
  .then(() => {
    console.log("Conexão feita com o banco de dados!");
  })
  .catch((msgErro) => {
    console.log(msgErro);
  });

// Configurações
app.set("view engine", "ejs");
app.use(express.static("public"));

// body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// rotas
app.get("/", (req, res) => {
  Question.findAll({ raw: true, order: [["id", "DESC"]] }).then((questions) => {
    res.render("index", {
      questions: questions,
    });
  });
});

app.get("/toQuestion", (req, res) => {
  res.render("toQuestion");
});

app.post("/questionsave", (req, res) => {
  var titulo = req.body.title;
  var descricao = req.body.description;
  Question.create({
    title: titulo,
    description: descricao,
  })
    .then(() => {
      res.redirect("/");
    })
    .catch((msgErro) => {
      console.log(msgErro);
    });
});

app.get("/question/:id", (req, res) => {
  var id = req.params.id;
  Question.findOne({
    where: { id: id }, // conditional
  }).then((question) => {
    if (question != undefined) {
      Answer.findAll({
        where: { questionId: question.id },
        order: [["id", "DESC"]],
      }).then((answers) => {
        res.render("question", {
          question: question,
          answers: answers,
        });
      });
    } else {
      res.redirect("/");
    }
  });
});

app.post("/answer", (req, res) => {
  var body = req.body.body;
  var questionId = req.body.questionId;
  Answer.create({
    body: body,
    questionId: questionId,
  }).then(() => {
    res.redirect("/question/" + questionId);
  });
});

app.listen(8080, () => {
  console.log("App rodando!");
});
