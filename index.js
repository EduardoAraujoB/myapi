// configurando ambiente
require("dotenv/config");

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
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true });

// iniciando models
requireDir("./src/models");

// iniciando rotas
app.use(require("./src/routs"));

// porta da aplicão
app.listen(process.env.PORT);
