var express = require("express");
var router = express.Router();

var setoresController = require("../controllers/setoresController");

router.get("/buscarSetores/", function (req, res) {
    setoresController.buscarSetores(req, res);
});
router.get("/buscarSetoresCriticos/", function (req, res) {
    setoresController.buscarSetoresCriticos(req, res);
});
router.get("/buscarSetoresAlerta/", function (req, res) {
    setoresController.buscarSetoresAlerta(req, res);
});

router.get("/buscarDadosSetor/:idSetor", function (req, res) {
    setoresController.buscarDadosSetor(req, res);
})

module.exports = router;