// importando ORM
const express = require("express");

// rota de autenticação
const authMiddleware = require("./middlewares/auth");

// preparando rotas
const routs = express.Router();

// controller artigos
const ArticleController = require("./controllers/ArticleController");

// controller membros
const MemberController = require("./controllers/MemberController");

// controle comentários
const CommentController = require("./controllers/CommentController");

// validar token
const token = require("./token");

// rota de validacao
routs.post("*/token/validate", token.validate);

// rotas artigos
routs.get("*/articles", ArticleController.index);
routs.get("*/articles/:id", ArticleController.show);
routs.post("*/articles", authMiddleware, ArticleController.store);
routs.put("*/articles/:id", authMiddleware, ArticleController.update);
routs.delete("*/articles/:id", authMiddleware, ArticleController.destroy);

// rotas membros
routs.get("*/members", authMiddleware, MemberController.index);
routs.get("*/member", authMiddleware, MemberController.show);
routs.post("*/member", MemberController.store);
routs.post("*/members/authenticate", MemberController.authenticate);
routs.put("*/member", authMiddleware, MemberController.update);
routs.delete("*/member", authMiddleware, MemberController.destroy);

// rotas comentários
routs.get("*/comments/:id", CommentController.index);
routs.get("*/comments/:id", CommentController.show);
routs.post("*/comments", authMiddleware, CommentController.store);
routs.put("*/comments/:id", authMiddleware, CommentController.update);
routs.delete("*/comments/:id", authMiddleware, CommentController.destroy);

module.exports = routs;
