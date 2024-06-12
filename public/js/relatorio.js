const fkMuseu = sessionStorage.getItem("FK_MUSEU")
const nome = document.querySelector("#nome")
const setor = document.querySelector("#setor")
const dataHora = document.querySelector("#dataHora")
const nomePesquisado = document.querySelector("#ipt_pesquisa")

const supervisor = document.querySelector("#supervisor")
const setores = document.querySelector("#setores")

const spanHistorico = document.querySelector("#spanHistorico")
const spanAcesso = document.querySelector("#spanAcesso")
const infoSector = document.querySelector("#infoSector")


function showHistorico(){
    supervisor.style.display = "none"
    setores.style.display = "flex"
    spanHistorico.style.color = "#B08067"
    spanAcesso.style.color = "#666666"
}

function showAcesso(){
    setores.style.display = "none"
    supervisor.style.display = "flex"
    spanAcesso.style.color = "#B08067"
    spanHistorico.style.color = "#666666"
}
fetch(`/relatorio/buscarRelatorioVisualizacao/${fkMuseu}`).then(res => {
    res.json().then(res => {
        console.log(res[0].dataHora)
        for (posicao = 0; posicao < res.length; posicao++) {
            dadosSupervisoresContainer.innerHTML += `
            <div class="dadosSupervisores">
            <div class="div">
            <span class="nameSupervisor" id="nome">${res[posicao].nomeSupervisor}</span>
            </div>
            <div class="div">
            <span class="setor" id="setor">${res[posicao].nomeSetor}</span>
            </div>
            <div class="div">
            <span class="dataHora" id="dataHora">${res[posicao].dataHora}</span>
            </div>
            </div>
            `
        }
    })
})

fetch(`/relatorio/buscarRelatoriosCompletos/`).then(res => {
    res.json().then(res => {
        console.log(res[0])
        for (posicao = 0; posicao < res.length; posicao++) {
            let color = "#C62400"
            if(res[posicao].Status == "Alerta"){
                color = "#DC9E00"
            }
            dadosSetorContainer.innerHTML += `
            <div class="dadosSupervisores">
            <div class="div">
            <span class="nameSupervisor" id="nome">${res[posicao].Setor}</span>
            </div>
            <div class="div">
            <span class="setor status" style="color: ${color}" id="setor">${res[posicao].Status}</span>
            </div>
            <div class="div">
            <span class="dataHora" id="dataHora">${res[posicao].DataHora}</span>
            </div>
            <i class="fa-solid fa-rectangle-list fa-xl menuicon btnRelatorio" onclick="showRelatorioCompleto()"></i>

            </div>
            `
        }
    })
})

function logout() {
    sessionStorage.clear()
    window.location.href = "../login.html"
}

function pesquisarPorNome() {
    fetch(`/relatorio/pesquisarPorNome/${fkMuseu}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nomeSupervisor: nomePesquisado.value
        })
    }).then(function (resposta) {

        if (resposta.ok) {

            resposta.json().then(res => {
                dadosSupervisoresContainer.innerHTML = ''
                for(posicao = 0; posicao < res.length; posicao++) {
                    dadosSupervisoresContainer.innerHTML += `
                    <div class="dadosSupervisores">
                    <div class="div">
                    <span class="nameSupervisor" id="nome">${res[posicao].nomeSupervisor}</span>
                    </div>
                    <div class="div">
                    <span class="setor" id="setor">${res[posicao].nomeSetor}</span>
                    </div>
                    <div class="div">
                    <span class="dataHora" id="dataHora">${res[posicao].dataHora}</span>
                    </div>
                    </div>
                    `
                }  
            })
        } else {
            resposta.text().then(texto => {
                console.error(texto);
            });

            dadosSupervisoresContainer.innerHTML = 'Nenhum registro foi encontrado!'
        }
    }).catch(function (erro) {
        console.log(erro)
    })

    return false
}

function showRelatorioCompleto(){
    infoSector.showModal()
}