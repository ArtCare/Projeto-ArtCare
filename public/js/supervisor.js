const fkMuseu = sessionStorage.getItem("FK_MUSEU")
const modal = document.querySelector("#modalSupervisor")
const modal2 = document.querySelector("#modalEditSupervisor")
const modal3 = document.querySelector("#modalExcluirSupervisor")
const dadosSupervisoresContainer = document.querySelector("#dadosSupervisoresContainer")
const nome = document.querySelector("#input_nomeSupervisor")
const email = document.querySelector("#input_emailSupervisor")
const senha = document.querySelector("#input_senhaSupervisor")
const alertaSupervisor = document.querySelector("#alertaSupervisor")
let idSupervisor = 0 
let supervisores

buscarSupervisor()
function buscarSupervisor() {
    dadosSupervisoresContainer.innerHTML = ""
    fetch(`/supervisor/buscarSupervisor/${fkMuseu}`).then(res => {
        res.json().then(res => {
            supervisores = res;
            for (posicao = 0; posicao < res.length; posicao++) {
                dadosSupervisoresContainer.innerHTML += `
                <div class="dadosSupervisores">
                <div class="nomeDiv">
                <span class="nameSupervisor">${res[posicao].nome}</span>
                </div>
                <div class="nomeDiv">
                <span class="email">${res[posicao].email}</span>
                </div>
                <button name="${res[posicao].idSupervisor}" onclick="editarSupervisor(this)" class="edit">
                    <i  class="fa-solid fa-pen"></i>
                </button>
                <button id="${res[posicao].idSupervisor}" onclick="excluirSupervisor(this)" class="del">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>
                `
            }
        })
    })
}

function novoSupervisor() {
    modal.showModal()
    input_emailSupervisor.value = ""
    input_senhaSupervisor.value = ""
    alertaSupervisor.innerHTML = ""

}

function editarSupervisor(item) {
    for(let posicao = 0; posicao < supervisores.length; posicao++) {

        if(supervisores[posicao].idSupervisor == item.name) {

            input_alterarNomeSupervisor.value = supervisores[posicao].nome;
            input_alterarEmailSupervisor.value = supervisores[posicao].email;
            input_alterarSenhaSupervisor.value = supervisores[posicao].senha;

            idSupervisor = supervisores[posicao].idSupervisor
        }

    }
    modal2.showModal()
}

function excluirSupervisor(item) {
    idSupervisor = item.id
    modal3.showModal()
}
function cadastrarSupervisor() {
 
    let senhaNum = false
    console.log(email)
    console.log(nome.value)
    if (nome.value.length <= 3) {
        alertaSupervisor.innerHTML = `Seu nome precisa ter mais que 3 caracteres.`
    } else if (email.value.indexOf('@') == -1 || email.value.indexOf('.') == -1) {
        alertaSupervisor.innerHTML = "Email inválido"
    } else if (senha.value.length <= 7) {
        alertaSupervisor.innerHTML = "Sua senha precisa ter mais que 7 caracteres."
    } else {
        for (let numero = 0; numero <= 9; numero++) {
            if (senha.value
                .indexOf(numero.toString()) != -1) {
                senhaNum = true
            }
        }
        if (senhaNum == false) {
            alertaSupervisor.innerHTML = "Senha precisa de um caracter numérico"
        } else {
            fetch(`/supervisor/cadastrarSupervisor/${fkMuseu}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    nome: nome.value,
                    email: email.value,
                    senha: senha.value
                }),
            }).catch(function (resposta) {
                console.log(`#ERRO: ${resposta}`);
            });
            location.reload()
            buscarSupervisor()
        }
    }
}

function excluirSupervisores() {
    fetch(`/supervisor/excluirSupervisor/${idSupervisor}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }   
    }).then(function (resposta) {

        if (resposta.ok) {

            modal3.close()
            buscarSupervisor()
            
        } else {

            console.log("Houve um erro ao tentar realizar a consulta!");
        }

    }).catch(function (erro) {
        console.log(erro);
    })

}

function alterarDadosSupervisor() {
    fetch(`/supervisor/atualizarSupervisor/${idSupervisor}`, {
        method: "PUT",
        body: JSON.stringify({
            nome: input_alterarNomeSupervisor.value,
            email: input_alterarEmailSupervisor.value,
            senha: input_alterarSenhaSupervisor.value
        }),
        headers: {
            "Content-Type": "application/json"
        }   
    }).then(function (resposta) {

        if (resposta.ok) {

            modal2.close()
            buscarSupervisor()
            
        } else {

            console.log("Houve um erro ao tentar realizar a consulta!");
        }

    }).catch(function (erro) {
        console.log(erro);
    })

}


function logout() {
    sessionStorage.clear()
    window.location.href = "../login.html"
}