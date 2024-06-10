const idSetor = sessionStorage.getItem("idSetor")
const idSupervisor = sessionStorage.getItem("ID_SUPERVISOR")
const headerContainer = document.querySelector('.header-container')
const sectorTitle = document.querySelector('#sectorTitle')
const temperatura = document.querySelector('#temperatura')
const umidade = document.querySelector('#umidade')
const tempMax = document.querySelector('#tempMax')
const tempMin = document.querySelector('#tempMin')
const umiMax = document.querySelector('#umiMax')
const umiMin = document.querySelector('#umiMin')
const navigationSetores = document.querySelector("#navigationSetores")
const navigationSupervisor = document.querySelector("#navigationSupervisor")
const navigationRelatorio = document.querySelector("#navigationRelatorio")
const alertModal = document.querySelector("#alertModal")
const message = document.querySelector("#message")
const typeContent = document.querySelector("#typeContent")
const typeTitle = document.querySelector("#typeTitle")
const modalBtn = document.querySelector("#modalBtn")
const indicadorTemp = document.querySelector("#indicadorTemp")
const indicadorUmi = document.querySelector("#indicadorUmi")
const time = document.querySelector("#time")
const typeStatus = document.querySelector("#typeStatus")
const typeMessage = document.querySelector("#typeMessage")
const tempo = document.querySelector("#tempo")
const registrosTemperatura = []
const registrosUmidade = []
const tempoRegistro = []

const temperaturaMax = []
const temperaturaMin = []
const umidadeMax = []
const umidadeMin = []
let modalShow = false

if (idSupervisor > 0) {
    navigationSetores.style.display = "none"
    navigationSupervisor.style.display = "none"
    navigationRelatorio.style.display = "none"
}

Chart.defaults.plugins.legend.position = 'bottom';
Chart.defaults.color = "#292929";
Chart.defaults.font.size = 16;

fetch(`/setores/buscarDadosSetor/${idSetor}`).then(res => {
    res.json().then(res => {
        sectorTitle.textContent = `Setor: ${res[0].nome}`
    })
})
fetch(`/setores/buscarMetricasSetor/${idSetor}`).then(res => {
    res.json().then(res => {
        temperaturaMax.push(res[0].temperaturaMaxima)
        temperaturaMin.push(res[0].temperaturaMinima)
        umidadeMax.push(res[0].umidadeMaxima)
        umidadeMin.push(res[0].umidadeMinima)


        tempMax.textContent = `TEMPERATURA MÁXIMA: ${temperaturaMax[0]}°C`
        tempMin.textContent = `TEMPERATURA MÍNIMA: ${temperaturaMin[0]}°C`
        umiMax.textContent = `UMIDADE MÁXIMA: ${umidadeMax[0]}%`
        umiMin.textContent = `UMIDADE MÍNIMA: ${umidadeMin[0]}%`
        buscarCapturas()
    })
})

function logout() {
    sessionStorage.clear()
    window.location.href = "login.html"
}


let tempDados = {
    labels: tempoRegistro,
    datasets: [
        {
            data: registrosTemperatura,
            borderColor: "#D1495B"
        }
    ]
}
let umiDados = {
    labels: tempoRegistro,
    datasets: [
        {
            data: registrosUmidade,
            borderColor: "#072F9F"
        }
    ]
}
let graficoTemperatura = new Chart(
    document.getElementById('grafico_temperatura'),
    {
        type: 'line',
        options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    enabled: false
                }
            }
        },
        data: tempDados
    }
);

let graficoUmidade = new Chart(
    document.getElementById('grafico_umidade'),
    {
        type: 'line',
        options: {
            animation: false,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    enabled: false
                }
            }
        },
        data: umiDados
    }
);

let end = new Date()
let inicio = new Date(end - 604800000)

let inicioDay = inicio.getDate()
let inicioMouth = (new Date().getMonth(inicio)) + 1
let inicioYear = new Date().getFullYear(inicio)

let inicioFormatted = `${inicioYear}:${inicioMouth}:${inicioDay}`

const ultimoRegistro = []
getTempo()
function getTempo(){
    fetch(`/tempo/buscarTempo/`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            fkSetor: idSetor,
            status: "Crítico"
        })
    }).then((res) => {
        res.json().then((res) => {
        let inicioTime = moment(res[0].tempo)
        let endTime = moment()
        let diferenca = moment(endTime,"HH:mm:ss").diff(moment(inicioTime,"HH:mm:ss"));;
        var d = moment.duration(diferenca);
        var s = Math.floor(d.asHours()) + moment.utc(diferenca).format(":mm:ss");
        time.textContent = s
        })
    })
    setTimeout(()=>{
        getTempo()
    },1000)
}



const labels = []
const datas = []


fetch(`/relatorio/buscarQuantidadeStatusPorSetor/`, {
    method: 'POST',
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({
        fkSetor: idSetor,
        status: "Crítico"
    }),
}).then(response => {
    response.json().then(res => {
        labels.push("Crítico")
        datas.push(res[0].quantidade)
        barChart()
    })
})
fetch(`/relatorio/buscarQuantidadeStatusPorSetor/`, {
    method: 'POST',
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({
        fkSetor: idSetor,
        status: "Alerta"
    }),
}).then(response => {
    response.json().then(res => {
        labels.push("Alerta")
        datas.push(res[0].quantidade)
        barChart()
    })
})
function barChart() {
    const barData = {
        labels: labels,
        datasets: [{
            label: 'Quantidade de vezes em estado de alerta',
            data: datas,
            backgroundColor: [
                'rgba(255, 205, 86, 0.2)',
                'rgba(255, 25, 86, 0.2)',

            ],
            borderColor: [
                'rgb(255, 205, 86)',
                'rgb(255, 25, 86)',
            ],
            borderWidth: 2
        }]
    };
    const barConfig = {
        type: 'bar',
        data: barData,
        options: {
            plugins: {
                legend: {
                    display: false
                },
            }
        },
    };

    const barChart = new Chart(
        document.getElementById('barChart'),
        barConfig,
    );

}

function buscarCapturas() {
    fetch(`/setores/buscarCapturasSetor/${idSetor}`).then(res => {
        res.json().then(res => {
            temperatura.textContent = `${res[0].temperatura}°C`
            umidade.textContent = `${res[0].umidade}%`
            registrosTemperatura.push(res[0].temperatura)
            registrosUmidade.push(res[0].umidade)
            tempoRegistro.push(res[0].tempo)

            if (registrosTemperatura.length > 7) {
                tempoRegistro.shift()
                registrosTemperatura.shift()
                registrosUmidade.shift()
            }
            if (
                registrosTemperatura[registrosTemperatura.length - 1] < temperaturaMax[0] - 1 &&
                registrosTemperatura[registrosTemperatura.length - 1] > temperaturaMin[0] + 1 &&
                registrosUmidade[registrosUmidade.length - 1] < umidadeMax[0] - 1 &&
                registrosUmidade[registrosUmidade.length - 1] > umidadeMin[0] + 1
            ) {
                indicadorTemp.style.border = "none"
                indicadorUmi.style.border = "none"
                if (modalShow) {
                    modalShow = false
                }
                atualizarSetor(1)
                typeStatus.textContent = "Normal"
                typeStatus.style.color = '#666666'
                typeMessage.textContent = "Setor dentro das métricas"
                tempo.style.display = "none"
            }
            else if (
                (registrosTemperatura[registrosTemperatura.length - 1] > temperaturaMax[0] ||
                    registrosTemperatura[registrosTemperatura.length - 1] < temperaturaMin[0]) &&
                (
                    registrosUmidade[registrosUmidade.length - 1] > umidadeMax[0] ||
                    registrosUmidade[registrosUmidade.length - 1] < umidadeMin[0]
                )
            ) {
                if (modalShow == false) {
                    typeTitle.textContent = 'CRÍTICO!'
                    typeStatus.textContent = "CRÍTICO"
                    typeStatus.style.color = '#C62400'
                    message.textContent = "Temperatura e umidade fora das métricas, verifique o setor!"
                    typeMessage.textContent = "Temperatura e umidade fora das métricas!"
                    alertModal.showModal()
                    modalShow = true
                    atualizarSetor(3)
                    novoRelatorio("Crítico", registrosTemperatura[registrosTemperatura.length - 1], registrosUmidade[registrosUmidade.length - 1])
                    indicadorTemp.style.border = "4px solid #C62400"
                    indicadorUmi.style.border = "4px solid #1C50E0"
                    tempo.style.display = "block"
                }
            }
            else if (
                registrosTemperatura[registrosTemperatura.length - 1] > temperaturaMax[0] ||
                registrosTemperatura[registrosTemperatura.length - 1] < temperaturaMin[0]
            ) {
                if (modalShow == false) {
                    typeTitle.textContent = 'CRÍTICO!'
                    typeStatus.textContent = "CRÍTICO"
                    typeStatus.style.color = '#C62400'
                    message.textContent = "Temperatura fora das métricas, verifique o setor!"
                    typeMessage.textContent = "Temperatura fora das métricas!"
                    alertModal.showModal()
                    modalShow = true
                    atualizarSetor(3)
                    novoRelatorio("Crítico", registrosTemperatura[registrosTemperatura.length - 1], registrosUmidade[registrosUmidade.length - 1])
                    indicadorTemp.style.border = "4px solid #C62400"
                    tempo.style.display = "block"
                }
            } else if (
                registrosUmidade[registrosUmidade.length - 1] > umidadeMax[0] ||
                registrosUmidade[registrosUmidade.length - 1] < umidadeMin[0]

            ) {
                if (modalShow == false) {
                    typeTitle.textContent = 'CRÍTICO!'
                    typeStatus.textContent = "CRÍTICO"
                    typeStatus.style.color = '#C62400'
                    message.textContent = "Umidade fora das métricas, verifique o setor!"
                    typeMessage.textContent = "Umidade fora das métricas!"
                    alertModal.showModal()
                    modalShow = true
                    atualizarSetor(3)
                    novoRelatorio("Crítico", registrosTemperatura[registrosTemperatura.length - 1], registrosUmidade[registrosUmidade.length - 1])
                    indicadorUmi.style.border = "4px solid #1C50E0"
                    tempo.style.display = "block"
                }
            } else if (
                (
                    (registrosTemperatura[registrosTemperatura.length - 1] >= temperaturaMax - 1 &&
                        registrosTemperatura[registrosTemperatura.length - 1] <= temperaturaMax)
                    ||
                    (registrosTemperatura[registrosTemperatura.length - 1] <= temperaturaMin + 1 &&
                        registrosTemperatura[registrosTemperatura.length - 1] >= temperaturaMin + 1)
                )
                &&
                (
                    (registrosUmidade[registrosUmidade.length - 1] >= umidadeMax - 1 &&
                        registrosUmidade[registrosUmidade.length - 1] <= umidadeMax) ||

                    (registrosUmidade[registrosUmidade.length - 1] <= umidadeMin + 1 &&
                        registrosUmidade[registrosUmidade.length - 1] >= umidadeMin
                    )
                )
            ) {
                if (modalShow == false) {
                    typeStatus.textContent = "ALERTA"
                    tempo.style.display = "block"
                    typeStatus.style.color = '#DC9E00'
                    alertModal.style.borderColor = "#DC9E00"
                    typeContent.style.backgroundColor = '#DC9E00'
                    modalBtn.style.backgroundColor = '#DC9E00'
                    typeTitle.style.color = '#DC9E00'
                    time.style.color = '#DC9E00'
                    typeTitle.textContent = 'ALERTA!'
                    message.textContent = "Temperatura e umidade muito próximos as métricas, verifique o setor!"
                    typeMessage.textContent = "Temperatura e umidade muito próximos as métricas!"
                    alertModal.showModal()
                    modalShow = true
                    atualizarSetor(2)
                    novoRelatorio("Alerta", registrosTemperatura[registrosTemperatura.length - 1], registrosUmidade[registrosUmidade.length - 1])
                    indicadorTemp.style.border = "4px solid #DC9E00"
                    indicadorUmi.style.border = "4px solid #DC9E00"
                }
            }
            else if (
                (
                    (registrosTemperatura[registrosTemperatura.length - 1] >= temperaturaMax - 1 &&
                        registrosTemperatura[registrosTemperatura.length - 1] <= temperaturaMax)
                    ||
                    (registrosTemperatura[registrosTemperatura.length - 1] <= temperaturaMin + 1 &&
                        registrosTemperatura[registrosTemperatura.length - 1] >= temperaturaMin + 1)
                )
            ) {
                if (modalShow == false) {
                   typeStatus.textContent = "ALERTA"
                   tempo.style.display = "block"
                   typeStatus.style.color = '#DC9E00'
                    alertModal.style.borderColor = "#DC9E00"
                    typeContent.style.backgroundColor = '#DC9E00'
                    modalBtn.style.backgroundColor = '#DC9E00'
                    typeTitle.style.color = '#DC9E00'
                    time.style.color = '#DC9E00'
                    typeTitle.textContent = 'ALERTA!'
                    message.textContent = "Temperatura muito próxima as métricas, verifique o setor!"
                    typeMessage.textContent = "Temperatura muito próximos as métricas!"
                    alertModal.showModal()
                    modalShow = true
                    atualizarSetor(2)
                    novoRelatorio("Alerta", registrosTemperatura[registrosTemperatura.length - 1], registrosUmidade[registrosUmidade.length - 1])
                    indicadorTemp.style.border = "4px solid #DC9E00"
                }
            } else if (
                (registrosUmidade[registrosUmidade.length - 1] >= umidadeMax - 1 &&
                    registrosUmidade[registrosUmidade.length - 1] <= umidadeMax)
                ||
                (registrosUmidade[registrosUmidade.length - 1] <= umidadeMin + 1 &&
                    registrosUmidade[registrosUmidade.length - 1] >= umidadeMin
                )
            ) {
                if (modalShow == false) {
                    typeStatus.textContent = "ALERTA"
                    typeStatus.style.color = '#DC9E00'
                    alertModal.style.borderColor = "#DC9E00"
                    time.style.color = '#DC9E00'
                    typeContent.style.backgroundColor = '#DC9E00'
                    tempo.style.display = "block"
                    modalBtn.style.backgroundColor = '#DC9E00'
                    typeTitle.style.color = '#DC9E00'
                    typeTitle.textContent = 'ALERTA!'
                    message.textContent = "Umidade muito próxima as métricas, verifique o setor!"
                    typeMessage.textContent = "Umidade muito próximos as métricas!"
                    alertModal.showModal()
                    modalShow = true
                    atualizarSetor(2)
                    novoRelatorio("Alerta", registrosTemperatura[registrosTemperatura.length - 1], registrosUmidade[registrosUmidade.length - 1])
                    indicadorUmi.style.border = "4px solid #DC9E00"
                }
            }
            graficoTemperatura.update();
            graficoUmidade.update();
        })
    })
    setTimeout(() => {
        buscarCapturas()
    }, 3000)
}

function closeModal() {
    alertModal.close()
}
function atualizarSetor(status) {
    fetch(`/setores/atualizarStatusSetor/${idSetor}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            statusSetor: status,
        }),
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
    });
}

function novoRelatorio(status, temperatura, umidade) {
    fetch(`/relatorio/inserirRelatorioSetor/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            fkSetor: idSetor,
            statusSetor: status,
            temperatura: temperatura,
            umidade: umidade,
        })
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
    });
}

