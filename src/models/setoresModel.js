var database = require("../database/config");

function buscarSetores(fkMuseu) {
    var instrucaoSql = `select idSetor, nome, statusSetor, andar from setor where fkMuseu = ${fkMuseu} order by statusSetor DESC;`;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarSetoresCriticos(fkMuseu) {
    var instrucaoSql = `select * from setor where statusSetor = 3 and fkMuseu = ${fkMuseu};`;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}
function buscarSetoresAlerta(fkMuseu) {
    var instrucaoSql = `select * from setor where statusSetor = 2 and fkMuseu = ${fkMuseu};`;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}    

function buscarDadosSetor(idSetor){
    var instrucaoSql = `select * from setor where idSetor = ${idSetor};`;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}
function buscarCapturasSetor(idSetor){
    var instrucaoSql = `select setor.nome, round((umidade),1) as umidade, round((temperatura),1) as temperatura, TIME(dtRegistro) as tempo from setor 
    join sensor on setor.fkSensor = idSensor join
     registro on registro.fkSensor = idSensor where idSetor = ${idSetor} order by idRegistro DESC limit 1;`;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}
function buscarMetricasSetor(idSetor){
    var instrucaoSql = `select tempMax as temperaturaMaxima, tempMin as temperaturaMinima, umiMax as umidadeMaxima, umiMin as umidadeMinima
    from verificacao where fkSetor = ${idSetor};`;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function novoSetor(fkSensor, fkMuseu, nome, andar){
    var instrucaoSql = `insert into setor (fkSensor, fkMuseu, nome, andar) values (${fkSensor}, ${fkMuseu}, '${nome}', '${andar}');`;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}
function novaVerificacao(tempMax, tempMin, umiMax, umiMin, fkSetor){
    var instrucaoSql = `insert into verificacao (tempMax, tempMin, umiMax, umiMin, fkSetor) values (${tempMax}, ${tempMin}, '${umiMax}', '${umiMin}', ${fkSetor});`;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}
function buscarUltimoSetor(fkMuseu) {
    var instrucaoSql = `select * from setor where fkMuseu = ${fkMuseu} order by idSetor desc limit 1;`;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}    
function atualizarStatusSetor(statusSetor, idSetor) {
    var instrucaoSql = `update setor set statusSetor = ${statusSetor} where idSetor = ${idSetor};`;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}  


module.exports = {
    buscarSetores,
    buscarSetoresCriticos,
    buscarSetoresAlerta,
    buscarDadosSetor,
    buscarCapturasSetor,
    buscarMetricasSetor,
    novoSetor,
    novaVerificacao,
    buscarUltimoSetor,
    atualizarStatusSetor
}
