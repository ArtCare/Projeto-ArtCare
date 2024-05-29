const fkMuseu = sessionStorage.getItem("FK_MUSEU")

const modal = document.querySelector("#modalSupervisor")
const dadosSupervisoresContainer = document.querySelector("#dadosSupervisoresContainer")
const nome = document.querySelector("#input_nomeSupervisor")
const email = document.querySelector("#input_emailSupervisor")
const senha = document.querySelector("#input_senhaSupervisor")

buscarSupervisor()
function buscarSupervisor() {
    dadosSupervisoresContainer.innerHTML = ""
    fetch(`/supervisor/buscarSupervisor/${fkMuseu}`).then(res => {
        res.json().then(res => {
            for (posicao = 0; posicao < res.length; posicao++) {
                dadosSupervisoresContainer.innerHTML += `
                <div class="dadosSupervisores">
                <span class="nameSupervisor">${res[posicao].nome}</span>
                <span class="email">${res[posicao].email}</span>
                <button class="edit">
                    <i class="fa-solid fa-pen"></i>
                </button>
                <button class="del">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>
                `
            }
        })
    })
    setTimeout(() => {
        buscarSupervisor()
    }, 2000)
}

function novoSupervisor() {
    modal.showModal()
}
function cadastrarSupervisor() {

    let senhaNum = false
    console.log(email)
    console.log(nome.value)
    if (input_nomeSupervisor.value.length <= 3) {
        alertaSupervisor.innerHTML = `Seu nome precisa ter mais que 3 caracteres.`                      
    } else if (input_emailSupervisor.value.indexOf('@') == -1 || input_emailSupervisor.value.indexOf('.') == -1) {
        alertaSupervisor.innerHTML = "Email precisa conter '@' e '.'"
    } else if (input_senhaSupervisor.value.length <= 7) {
        alertaSupervisor.innerHTML ="Sua senha precisa ter mais que 7 caracteres."
    } else {
        for (let numero = 0; numero <= 9; numero++) {
            if (input_senhaSupervisor.value
                .indexOf(numero.toString()) != -1) {
                senhaNum = true
            }
        }
        if (senhaNum == false) {
            alertaSupervisor.innerHTML ="Senha precisa de um caracter numérico"
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
            modal.close()
            buscarSupervisor()
        }
    }
}