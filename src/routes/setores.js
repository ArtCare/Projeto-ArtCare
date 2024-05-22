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

router.get("/tempo-real/:idAquario", function (req, res) {
    medidaController.buscarMedidasEmTempoReal(req, res);
})

module.exports = router;