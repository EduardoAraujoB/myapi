// importando o express
const express = require("express");

// importando o cors
const cors = require("cors");

// importando ORM
const mongoose = require("mongoose");

// importando require-dir
const requireDir = require("require-dir");

// iniciando o app
const app = express();

// permitir envio de dados em .json
app.use(express.json());

// deixando a API pública
app.use(cors());

// conectando ao banco
mongoose.connect("mongodb://localhost:27017/my-api", { useNewUrlParser: true });

// iniciando models
requireDir("./src/models");

// iniciando rotas
app.use("/api", require("./src/routs"));

// porta da aplicão
app.listen("3100");
