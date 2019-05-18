// importando ORM
const express = require("express");

// preparando rotas
const routs = express.Router();

// controller artigos
const ArticleController = require("./controllers/ArticleController");

// controller membros
const MemberController = require("./controllers/MemberController");

// rotas artigos
routs.get("/articles", ArticleController.index);
routs.get("/articles/:id", ArticleController.show);
routs.post("/articles", ArticleController.store);
routs.put("/articles/:id", ArticleController.update);
routs.delete("/articles/:id", ArticleController.destroy);

// rotas membros
routs.get("/members", MemberController.index);
routs.get("/members/:id", MemberController.show);
routs.post("/members", MemberController.store);
routs.put("/members/:id", MemberController.update);
routs.delete("/members/:id", MemberController.destroy);

module.exports = routs;
