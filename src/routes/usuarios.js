var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrarMuseu", function (req, res) {
    usuarioController.cadastrarMuseu(req, res);
})
router.post("/cadastrarRepresentante", function (req, res) {
    usuarioController.cadastrarRepresentante(req, res);
})
router.get("/buscarMuseu", function (req, res) {
    usuarioController.buscarMuseu(req, res);
})

router.post("/autenticar", function (req, res) {
    usuarioController.autenticar(req, res);
});

module.exports = router;