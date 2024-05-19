var usuarioModel = require("../models/usuarioModel");

function autenticar(req, res) {
    var email = req.body.email;
    var senha = req.body.senha;

    usuarioModel.autenticar(email, senha)
    .then(
        function (resultadoAutenticar) {
            if (resultadoAutenticar.length == 0) {
                res.status(403).send("Email e/ou senha inválido(s)");
            } else {
                res.status(200).json(resultadoAutenticar[0])
            }
        }
    ).catch(
        function (erro) {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        }
    );
}
    



function cadastrarMuseu(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var nome = req.body.nome;
    var cnpj = req.body.cnpj;
    var rm = req.body.rm;


    // Faça as validações dos valores
    if (nome.length <= 2) {
        res.status(400).send("Seu nome está undefined!");
    } else if (cnpj.length != 14) {
        res.status(400).send("Seu email está undefined!");
    } else if (rm.length != 9) {
        res.status(400).send("Seu rm está undefined!");
    } else {
        usuarioModel.cadastrarMuseu(nome, cnpj, rm)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function cadastrarRepresentante(req, res) {

    var fkMuseu = req.body.fkMuseu;
    var nome = req.body.nome;
    var email = req.body.email;
    var senha = req.body.senha;


    // Faça as validações dos valores
    if (nome.value <= 3) {
        res.status(400).send("Seu nome está undefined!");
    } else if (senha.length <= 7) {
        res.status(400).send("Sua senha está undefined!");
    } else {

        usuarioModel.cadastrarRepresentante(fkMuseu,nome, email, senha)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function buscarMuseu(req, res) {
     usuarioModel.buscarMuseu().then(response => {
        res.status(200).json(response);
        }).catch(
        function (erro) {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        }
    );
}
module.exports = {
    autenticar,
    cadastrarMuseu,
    cadastrarRepresentante,
    buscarMuseu
}