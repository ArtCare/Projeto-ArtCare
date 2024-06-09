var supervisorModel = require("../models/supervisorModel");

function buscarSupervisor(req, res) {
  var fkMuseu = req.params.fkMuseu;
  supervisorModel.buscarSupervisor(fkMuseu).then((resultado) => {
    res.status(200).json(resultado);
  });
}
function cadastrarSupervisor(req, res) {
  var fkMuseu = req.params.fkMuseu;
  var nome = req.body.nome;
  var email = req.body.email;
  var senha = req.body.senha;

  supervisorModel.buscarPorEmail(email).then((resultado) => {
    if (resultado.length > 0) {
      res
        .status(401)
        .json({ mensagem: `o supervisor com email ${email} já existe` });
    } else {
      supervisorModel.cadastrarSupervisor(nome, email, senha, fkMuseu).then((resultado) => {
        res.status(201).json(resultado);
      });
    }
  });
}

function autenticar(req, res) {
  var email = req.body.email;
  var senha = req.body.senha;

  supervisorModel.autenticar(email, senha)
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

function excluirSupervisor(req, res) {

  supervisorModel.excluirSupervisor(req.params.idSupervisor)
    .then(
      function (resultado) {
        console.log(`\nResultados encontrados: ${resultado.length}`);
        console.log(`Resultados: ${JSON.stringify(resultado)}`); // transforma JSON em String

        res.status(200).json(resultado);
      }
    ).catch(
      function (erro) {
        console.log(erro);
        console.log("\nHouve um erro ao realizar a consulta !Erro: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
      }
    );

}

module.exports = {
  buscarSupervisor,
  cadastrarSupervisor,
  autenticar,
  excluirSupervisor
};
