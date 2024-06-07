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

function listarPorUsuario(idUsuario) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarPorUsuario()");
    var instrucaoSql = `
        SELECT 
            a.id AS idAviso,
            a.titulo,
            a.descricao,
            a.fk_usuario,
            u.id AS idUsuario,
            u.nome,
            u.email,
            u.senha
        FROM aviso a
            INNER JOIN usuario u
                ON a.fk_usuario = u.id
        WHERE u.id = ${idUsuario};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function publicar(titulo, descricao, idUsuario) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function publicar(): ", titulo, descricao, idUsuario);
    var instrucaoSql = `
        INSERT INTO aviso (titulo, descricao, fk_usuario) VALUES ('${titulo}', '${descricao}', ${idUsuario});
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function editar(novaDescricao, idAviso) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function editar(): ", novaDescricao, idAviso);
    var instrucaoSql = `
        UPDATE aviso SET descricao = '${novaDescricao}' WHERE id = ${idAviso};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function deletar(idAviso) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function deletar():", idAviso);
    var instrucaoSql = `
        DELETE FROM aviso WHERE id = ${idAviso};
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

module.exports = {
    buscarRelatorioVisualizacao,
    inserirRelatorioVisualizacao,
    pesquisarPorNome
}
