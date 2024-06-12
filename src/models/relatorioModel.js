var database = require("../database/config");

function buscarRelatorioVisualizacao(fkMuseu) {
    var instrucaoSql = `
    select supervisor.nome as nomeSupervisor, setor.nome as nomeSetor, date_format(dtVisualizacao, '%Y/%m/%d %H:%i:%s') as dataHora from supervisor join visualizacao on idSupervisor = fkSupervisor join setor on fkSetor = idSetor where visualizacao.fkMuseu = ${fkMuseu};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function inserirRelatorioVisualizacao(fkSetor, fkSupervisor, fkMuseu) {
    var instrucaoSql = `
    insert into visualizacao (fkSetor, fkSupervisor, fkMuseu) values (${fkSetor}, ${fkSupervisor}, ${fkMuseu});
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}
function inserirRelatorioSetor(fkSetor, statusSetor, temperatura, umidade) {
    var instrucaoSql = `
   insert into relatorio (fkSetor, statusSetor, temperatura, umidade) values (${fkSetor}, '${statusSetor}', ${temperatura}, ${umidade});
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarQuantidadeStatusAlerta(fkMuseu) {
    var instrucaoSql = `
    select nome, count(idRelatorio) as quantidade from relatorio join setor on fkSetor = idSetor where relatorio.statusSetor = 'Alerta' and  fkMuseu = ${fkMuseu} group by nome order by nome; ;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}
function pesquisarPorNome(fkMuseu, nomePesquisado) {
    var instrucaoSql = `
    select supervisor.nome as nomeSupervisor, setor.nome as nomeSetor, date_format(dtVisualizacao, '%Y/%m/%d %H:%i:%s') as dataHora from supervisor join visualizacao on idSupervisor = fkSupervisor join setor on fkSetor = idSetor where visualizacao.fkMuseu = ${fkMuseu} and supervisor.nome like '${nomePesquisado}%';
    `

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}
function buscarQuantidadeStatusPorSetor(fkSetor, status) {
    var instrucaoSql = `
        select count(idRelatorio) as quantidade from relatorio join setor on fkSetor = idSetor where relatorio.statusSetor = '${status}' and fkSetor = ${fkSetor};
    `

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    buscarRelatorioVisualizacao,
    inserirRelatorioVisualizacao,
    pesquisarPorNome,
    inserirRelatorioSetor,
    buscarQuantidadeStatusAlerta,
    buscarQuantidadeStatusPorSetor
}
