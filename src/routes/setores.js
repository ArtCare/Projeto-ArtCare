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
router.get("/buscarCapturasSetor/:idSetor", function (req, res) {
    setoresController.buscarCapturasSetor(req, res);
})
router.get("/buscarMetricasSetor/:idSetor", function (req, res) {
    setoresController.buscarMetricasSetor(req, res);
})
router.post("/novoSetor/", function (req, res) {
    setoresController.novoSetor(req, res);
})

module.exports = router;