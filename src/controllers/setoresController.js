var setoresModel = require("../models/setoresModel");

function buscarSetores(req, res) {
    const fkMuseu = req.params.idMuseu
    setoresModel.buscarSetores(fkMuseu).then(function (resultado) {
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
function buscarSetoresCriticos(req, res) {
    setoresModel.buscarSetoresCriticos().then(function (resultado) {
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
function buscarSetoresAlerta(req, res) {
    setoresModel.buscarSetoresAlerta().then(function (resultado) {
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

function buscarDadosSetor(req, res) {
    const idSetor = req.params.idSetor
    setoresModel.buscarDadosSetor(idSetor).then(function (resultado) {
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
function buscarCapturasSetor(req, res) {
    const idSetor = req.params.idSetor
    setoresModel.buscarCapturasSetor(idSetor).then(function (resultado) {
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
function buscarMetricasSetor(req, res) {
    const idSetor = req.params.idSetor
    setoresModel.buscarMetricasSetor(idSetor).then(function (resultado) {
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
function novoSetor(req, res) {
    const fkSensor = req.body.fkSensor
    const fkMuseu = req.body.fkMuseu
    const nome = req.body.nome
    const andar = req.body.andar
    const umiMin = req.body.umidadeMinima
    const umiMax = req.body.umidadeMaxima
    const tempMin = req.body.temperaturaMinima
    const tempMax = req.body.temperaturaMaxima
    
    setoresModel.novoSetor(fkSensor, fkMuseu, nome, andar).then(function () {
        setoresModel.buscarUltimoSetor().then(function (resposta){
            const fkSetor = resposta[0].idSetor
        setoresModel.novaVerificacao(tempMax, tempMin, umiMax, umiMin, fkSetor) 
        })

       
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao cadastrar um novo setor.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
    buscarSetores,
    buscarSetoresCriticos,
    buscarSetoresAlerta,
    buscarDadosSetor,
    buscarCapturasSetor,
    buscarMetricasSetor,
    novoSetor,
}