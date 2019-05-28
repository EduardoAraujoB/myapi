// importando ORM
const express = require("express");

// preparando rotas
const routs = express.Router();

// controller artigos
const ArticleController = require("./controllers/ArticleController");

// controller membros
const MemberController = require("./controllers/MemberController");

// controle comentários
const CommentController = require("./controllers/CommentController");

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
routs.post("/members/authenticate", MemberController.authenticate);
routs.put("/members/:id", MemberController.update);
routs.delete("/members/:id", MemberController.destroy);

// rotas comentários
routs.get("/comments", CommentController.index);
routs.get("/comments/:id", CommentController.show);
routs.post("/comments", CommentController.store);
routs.put("/comments/:id", CommentController.update);
routs.delete("/comments/:id", CommentController.destroy);

module.exports = routs;
