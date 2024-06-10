var database = require("../database/config");

function buscarTempo(fkSetor, statusSetor) {
    var instrucaoSql = `
    select date_format(dtRelatorio, '%Y/%m/%d %H:%i:%s') as tempo from relatorio where statusSetor = '${statusSetor}' and fkSetor = ${fkSetor} order by dtRelatorio desc limit 1;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    buscarTempo
}