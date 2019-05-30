// importando ORM
const express = require("express");

const authMiddleware = require("./middlewares/auth");

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
routs.post("/articles", authMiddleware, ArticleController.store);
routs.put("/articles/:id", authMiddleware, ArticleController.update);
routs.delete("/articles/:id", ArticleController.destroy);

// rotas membros
routs.get("/members", authMiddleware, MemberController.index);
routs.get("/member", authMiddleware, MemberController.show);
routs.post("/member", MemberController.store);
routs.post("/members/authenticate", MemberController.authenticate);
routs.put("/member", authMiddleware, MemberController.update);
routs.delete("/member", authMiddleware, MemberController.destroy);

// rotas comentários
routs.get("/comments", CommentController.index);
routs.get("/comments/:id", CommentController.show);
routs.post("/comments", CommentController.store);
routs.put("/comments/:id", CommentController.update);
routs.delete("/comments/:id", CommentController.destroy);

module.exports = routs;
