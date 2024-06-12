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

router.post("/pesquisarPorNome/:fkMuseu", function (req, res) {
    relatorioController.pesquisarPorNome(req, res);
})
router.post("/inserirRelatorioSetor/", function (req, res) {
    relatorioController.inserirRelatorioSetor(req, res);
})

router.get("/buscarQuantidadeStatusAlerta/:idMuseu", function (req, res) {
    relatorioController.buscarQuantidadeStatusAlerta(req, res);
})
router.post("/buscarQuantidadeStatusPorSetor/", function (req, res) {
    relatorioController.buscarQuantidadeStatusPorSetor(req, res);
})
router.get("/buscarRelatoriosCompletos/", function (req, res) {
    relatorioController.buscarRelatoriosCompletos(req, res);
})

module.exports = router;