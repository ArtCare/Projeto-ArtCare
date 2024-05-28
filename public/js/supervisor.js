const fkMuseu = sessionStorage.getItem("FK_MUSEU")

const modal = document.querySelector("#modalSupervisor")
const dadosSupervisoresContainer = document.querySelector("#dadosSupervisoresContainer")
const nome = document.querySelector("#input_nomeSupervisor")
const email = document.querySelector("#input_emailSupervisor")
const senha = document.querySelector("#input_senhaSupervisor")


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

function novoSupervisor() {


    modal.showModal()
}
function cadastrarSupervisor() {
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
    // modal.close()
}