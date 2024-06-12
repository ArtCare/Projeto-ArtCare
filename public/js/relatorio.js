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

const nameSector = document.querySelector("#nameSector")
const statusSector = document.querySelector("#statusSector")
const date = document.querySelector("#date")

const tempMax = document.querySelector("#tempMax")
const tempMin = document.querySelector("#tempMin")
const umiMax = document.querySelector("#umiMax")
const umiMin = document.querySelector("#umiMin")

const detalhes = []

function showRelatorioCompleto(res){
    if(detalhes[res].Status == "Alerta"){
        statusSector.style.color = "#DC9E00"
    }else{
         statusSector.style.color = "#C80006"
    }
    nameSector.textContent = detalhes[res].Setor
    statusSector.textContent = detalhes[res].Status
    date.textContent = detalhes[res].DataHora
    tempMax.textContent = `Temperatura máxima: ${detalhes[res].MaximoDeTemperatura}°C `
    tempMin.textContent = `Temperatura mínima: ${detalhes[res].MinimoDeTemperatura}°C `
    umiMax.textContent = `Umidade máxima: ${detalhes[res].MaximoDeUmidade}% `
    umiMin.textContent = `Umidade mínima: ${detalhes[res].MinimoDeUmidade}% `
    infoSector.showModal()
}
function closeModal(){
    infoSector.close()
}
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
        for (posicao = 0; posicao < res.length; posicao++) {
            let color = "#C62400"
            if(res[posicao].Status == "Alerta"){
                color = "#DC9E00"
            }
            detalhes.push(res[posicao])
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
            <i class="fa-solid fa-rectangle-list fa-xl menuicon btnRelatorio" onclick="showRelatorioCompleto(${posicao})"></i>

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
