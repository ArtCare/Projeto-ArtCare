var express = require("express");
var router = express.Router();

var tempoController = require("../controllers/tempoController");

router.post("/buscarTempo/", function (req, res) {
    tempoController.buscarTempo(req, res);
});

module.exports = router;