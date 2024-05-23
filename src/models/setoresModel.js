var database = require("../database/config");

function buscarSetores() {
    var instrucaoSql = `select idSetor, nome, statusSetor from setor order by statusSetor DESC;`;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarSetoresCriticos() {
    var instrucaoSql = `select * from setor where statusSetor = 3;`;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}
function buscarSetoresAlerta() {
    var instrucaoSql = `select * from setor where statusSetor = 2;`;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}    

function buscarDadosSetor(idSetor){
    var instrucaoSql = `select * from setor where idSetor = ${idSetor};`;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}
function buscarCapturasSetor(idSetor){
    var instrucaoSql = `select umidade, temperatura from setor 
    join sensor on setor.fkSensor = idSensor 
    join registro on registro.fkSensor = idSensor where idSetor = ${idSetor};`;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    buscarSetores,
    buscarSetoresCriticos,
    buscarSetoresAlerta,
    buscarDadosSetor,
    buscarCapturasSetor
}
