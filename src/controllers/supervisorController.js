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

module.exports = {
  buscarSupervisor,
  cadastrarSupervisor,
 
};
