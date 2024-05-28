var express = require("express");
var router = express.Router();

var supervisorController = require("../controllers/supervisorController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.get("/buscarSupervisor/:fkMuseu", function (req, res) {
  supervisorController.buscarSupervisor(req, res);
});

router.post("/cadastrarSupervisor/:fkMuseu", function (req, res) {
  supervisorController.cadastrarSupervisor(req, res);
})


router.get("/buscar/:id", function (req, res) {
  supervisorController.buscarPorId(req, res);
});

router.get("/listar", function (req, res) {
  supervisorController.listar(req, res);
});

module.exports = router;