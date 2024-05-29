const fkMuseu = sessionStorage.getItem("FK_MUSEU")
const modal = document.querySelector('#modal')
const setores = document.querySelector('#setores')
const input_umidade_minima = document.querySelector('#input_umidade_minima')
const input_umidade_maxima = document.querySelector('#input_umidade_maxima')
const input_temperatura_minima = document.querySelector('#input_temperatura_minima')
const input_temperatura_maxima = document.querySelector('#input_temperatura_maxima')
const input_nome_setor = document.querySelector("#input_nome_setor")
const input_andar = document.querySelector("#input_andar")
const errorNameDiv = document.querySelector("#errorNameDiv")
const errorMessageDiv = document.querySelector("#errorMessageDiv")

let umiMin = 40
let umiMax = 45
let tempMin = 18
let tempMax = 22

let alterMetricas = false

metricas()
function metricas() {
    if (!alterMetricas) {
        input_umidade_minima.disabled = true
        input_umidade_maxima.disabled = true
        input_temperatura_minima.disabled = true
        input_temperatura_maxima.disabled = true
    } else {
        input_umidade_minima.disabled = false
        input_umidade_maxima.disabled = false
        input_temperatura_minima.disabled = false
        input_temperatura_maxima.disabled = false
    }
}
function habilitarMetricas() {
    alterMetricas = true
    metricas()
}
function desabilitarMetricas() {
    alterMetricas = false
    metricas()
}

buscarSetores()
function buscarSetores() {
    setores.innerHTML = ""
    fetch(`/setores/buscarSetores/`).then(res => {
        res.json().then(res => {
            for (posicao = 0; posicao < res.length; posicao++) {
                setores.innerHTML += `
                <div class="setoresText">
                <span>${res[posicao].nome}</span> 
                <button class="seeSector" value="${res[posicao].idSetor}" onclick="verSetor(this)">Ver setor <i class="fa-solid fa-arrow-right"></i></button>
                </div>
                `
            }
        })
    })
    setTimeout(() => {
        buscarSetores()
    }, 2000)
}
function registerNewSector() {
    modal.showModal()
}
function close() {
    modal.close()
}
function verSetor(res) {
    window.location.href = "./setor.html"
    sessionStorage.setItem("idSetor", res.value)
}

function cadastrarSetor() {
    if (input_nome_setor.value == "") {
        errorNameDiv.style.display = "flex"
        console.log('oi')
    }
    else if (
        alterMetricas &&
        input_umidade_minima.value == "" ||
        input_umidade_maxima.value == "" ||
        input_temperatura_minima.value == "" ||
        input_temperatura_maxima.value == ""
    ) {
        errorMessageDiv.style.display = "block"
    } else if (alterMetricas) {
        umiMin = input_umidade_minima.value
        umiMax = input_umidade_maxima.value
        tempMin = input_temperatura_minima.value
        tempMax = input_temperatura_maxima.value
    }
    fetch("/setores/novoSetor", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            nome: input_nome_setor.value,
            andar: input_andar.value,
            fkSensor: 1,
            fkMuseu: fkMuseu,
            umidadeMinima: umiMin,
            umidadeMaxima: umiMax,
            temperaturaMinima: tempMin,
            temperaturaMaxima: tempMax
        }),
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
    });
}