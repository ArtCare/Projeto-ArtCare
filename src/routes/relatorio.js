var express = require("express");
var router = express.Router();

var relatorioController = require("../controllers/relatorioController");

router.get(`/buscarRelatorioVisualizacao/:fkMuseu`, function (req, res) {
    relatorioController.buscarRelatorioVisualizacao(req, res);
});

router.post("/inserirRelatorioVisualizacao/:idMuseu", function (req, res) {
    relatorioController.inserirRelatorioVisualizacao(req, res);
});

router.get("/pesquisar/:descricao", function (req, res) {
    relatorioController.pesquisarDescricao(req, res);
});

router.post("/publicar/:idUsuario", function (req, res) {
    relatorioController.publicar(req, res);
});

router.put("/editar/:idrelatorio", function (req, res) {
    relatorioController.editar(req, res);
});

router.delete("/deletar/:idrelatorio", function (req, res) {
    relatorioController.deletar(req, res);
});

module.exports = router;