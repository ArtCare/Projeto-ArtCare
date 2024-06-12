var relatorioModel = require("../models/relatorioModel");

function buscarRelatorioVisualizacao(req, res) {
    const fkMuseu = req.params.fkMuseu
    relatorioModel.buscarRelatorioVisualizacao(fkMuseu).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os avisos: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function inserirRelatorioVisualizacao(req, res) {
    const fkMuseu = req.params.idMuseu
    const fkSetor = req.body.fkSetor
    const fkSupervisor = req.body.fkSupervisor

    relatorioModel.inserirRelatorioVisualizacao(fkSetor, fkSupervisor,fkMuseu)
        .then(
            function (resultado) {
                if (resultado.length > 0) {
                    res.status(200).json(resultado);
                } else {
                    res.status(204).send("Nenhum resultado encontrado!");
                }
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "Houve um erro ao buscar os avisos: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
}



function inserirRelatorioSetor(req, res) {
    const fkSetor = req.body.fkSetor
    const statusSetor = req.body.statusSetor
    const temperatura = req.body.temperatura
    const umidade = req.body.umidade

    relatorioModel.inserirRelatorioSetor(fkSetor, statusSetor, temperatura, umidade)
        .then(
            function (resultado) {
                if (resultado.length > 0) {
                    res.status(200).json(resultado);
                } else {
                    res.status(204).send("Nenhum resultado encontrado!");
                }
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "Houve um erro ao buscar os avisos: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function buscarQuantidadeStatusAlerta(req, res) {
    const fkMuseu = req.params.idMuseu
    relatorioModel.buscarQuantidadeStatusAlerta(fkMuseu).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os avisos: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}


function pesquisarPorNome(req, res) {
    const fkMuseu = req.params.fkMuseu
    const nomePesquisado = req.body.nomeSupervisor

    relatorioModel.pesquisarPorNome(fkMuseu, nomePesquisado).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os avisos: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}
function buscarQuantidadeStatusPorSetor(req, res) {
    const fkSetor = req.body.fkSetor
    const status= req.body.status


    relatorioModel.buscarQuantidadeStatusPorSetor(fkSetor, status)
        .then(
            function (resultado) {
                if (resultado.length > 0) {
                    res.status(200).json(resultado);
                } else {
                    res.status(204).send("Nenhum resultado encontrado!");
                }
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "Houve um erro ao buscar os avisos: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
}
module.exports = {
    buscarRelatorioVisualizacao,
    inserirRelatorioVisualizacao,
    pesquisarPorNome,
    inserirRelatorioSetor,
    buscarQuantidadeStatusAlerta,
    buscarQuantidadeStatusPorSetor
}