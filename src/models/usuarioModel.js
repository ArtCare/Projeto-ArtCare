var database = require("../database/config")

function autenticar(email, senha) {
    var instrucaoSql = `
        SELECT idRepresentante, nome, email FROM representante WHERE email = '${email}' AND senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
function cadastrarMuseu(nome, cnpj, rm,) {
        var instrucaoSql = `
        INSERT INTO museu (nome, cnpj, rm) VALUES ('${nome}', '${cnpj}', '${rm}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function cadastrarRepresentante(fkMuseu, nome, email, senha) {
    var instrucaoSql = `
    insert into representante (fkMuseu, nome, email, senha) values (${fkMuseu}, '${nome}', '${email}','${senha}');
`;
console.log("Executando a instrução SQL: \n" + instrucaoSql);
return database.executar(instrucaoSql);
}

function buscarMuseu() {
    var instrucaoSql = `
    SELECT idMuseu FROM museu ORDER BY idMuseu DESC LIMIT 1;
`;
console.log("Executando a instrução SQL: \n" + instrucaoSql);
return database.executar(instrucaoSql);
}


module.exports = {
    autenticar,
    cadastrarMuseu,
    cadastrarRepresentante,
    buscarMuseu
};