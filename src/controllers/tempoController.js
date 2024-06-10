var tempoModel = require("../models/tempoModel");

function buscarTempo(req, res) {
    const statusSetor = req.body.status
    const fkSetor = req.body.fkSetor
    tempoModel.buscarTempo(fkSetor, statusSetor).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}
module.exports = {
    buscarTempo
}