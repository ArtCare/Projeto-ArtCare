sessionStorage.removeItem("idSetor")
const idMuseu = sessionStorage.getItem("FK_MUSEU")
const idSupervisor = sessionStorage.getItem("ID_SUPERVISOR")
const totalSectors = document.querySelector("#totalSectors")
const nameSector = document.querySelector("#nameSector")
const statusSetor = document.querySelector("#statusSetor")
const sectors = document.querySelector("#sectors")
const qtdAlerta = document.querySelector("#qtdAlerta")
const qtdCritico = document.querySelector("#qtdCritico")
const navigationSetores = document.querySelector("#navigationSetores")
const navigationSupervisor = document.querySelector("#navigationSupervisor")
const navigationRelatorio = document.querySelector("#navigationRelatorio")
const modal = document.querySelector("#modalDashboard")

const critico = document.querySelector("#barChartCritico")
const alerta = document.querySelector("#barChart")

if (idSupervisor > 0) {
    navigationSetores.style.display = "none"
    navigationSupervisor.style.display = "none"
    navigationRelatorio.style.display = "none"
}

qtdCritico.textContent = 0
qtdAlerta.textContent = 0

let setoresCriticos = []
let setoresAlerta = []
let totalSetores = 0

const registrosTemperatura = []
const registrosUmidade = []
const temperaturaMax = []
const temperaturaMin = []
const umidadeMax = []
const umidadeMin = []

atualizarSetores()
function atualizarSetores() {
    fetch(`/setores/buscarSetores/${idMuseu}`).then(function (resposta) {
        if (resposta.status == 200) {
            resposta.json().then(res => {
                for (posicao = 0; posicao < res.length; posicao++) {
                    let setor = res[posicao].idSetor
                    fetch(`/setores/buscarMetricasSetor/${setor}`).then(response => {
                        response.json().then(res => {
                            let temperaturaMax = res[0].temperaturaMaxima
                            let temperaturaMin = res[0].temperaturaMinima
                            let umidadeMax = res[0].umidadeMaxima
                            let umidadeMin = res[0].umidadeMinima

                            fetch(`/setores/buscarCapturasSetor/${setor}`).then(res => {
                                res.json().then(res => {
                                    registrosTemperatura.push(res[0].temperatura)
                                    registrosUmidade.push(res[0].umidade)
                                    if (
                                        registrosTemperatura[registrosTemperatura.length - 1] < temperaturaMax - 1 &&
                                        registrosTemperatura[registrosTemperatura.length - 1] > temperaturaMin + 1 &&
                                        registrosUmidade[registrosUmidade.length - 1] < umidadeMax - 1 &&
                                        registrosUmidade[registrosUmidade.length - 1] > umidadeMin + 1
                                    ) {
                                        setoresCriticos.push(0)
                                        setoresAlerta.push(0)
                                        atualizarSetor(1)
                                    }
                                    else if (
                                        (
                                            registrosTemperatura[registrosTemperatura.length - 1] > temperaturaMax ||
                                            registrosTemperatura[registrosTemperatura.length - 1] < temperaturaMin
                                        )
                                        ||
                                        (
                                            registrosUmidade[registrosUmidade.length - 1] > umidadeMax ||
                                            registrosUmidade[registrosUmidade.length - 1] < umidadeMin
                                        )
                                    ) {
                                        setoresAlerta.push(0)
                                        atualizarSetor(3)
                                    } else if (
                                        (
                                            registrosTemperatura[registrosTemperatura.length - 1] >= temperaturaMax - 1
                                            &&
                                            registrosTemperatura[registrosTemperatura.length - 1] <= temperaturaMax

                                            ||

                                            registrosTemperatura[registrosTemperatura.length - 1] <= temperaturaMin + 1
                                            &&
                                            registrosTemperatura[registrosTemperatura.length - 1] >= temperaturaMin + 1

                                        )
                                        ||
                                        (
                                            (
                                                registrosUmidade[registrosUmidade.length - 1] >= umidadeMax - 1
                                                &&
                                                registrosUmidade[registrosUmidade.length - 1] <= umidadeMax
                                            )
                                            ||
                                            (
                                                registrosUmidade[registrosUmidade.length - 1] <= umidadeMin + 1
                                                &&
                                                registrosUmidade[registrosUmidade.length - 1] >= umidadeMin
                                            )
                                        )
                                    ) {
                                        setoresCriticos.push(0)
                                        atualizarSetor(2)
                                    }

                                })
                            })
                        })
                    })

                    function atualizarSetor(status) {
                        setTimeout(() => {
                            fetch(`/setores/atualizarStatusSetor/${setor}`, {
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
                            buscarSetores()
                        }, 200)
                    }
                }
            })
        } else {
            noSector()
        }
    })
}


function buscarSetores() {
    fetch(`/setores/buscarSetores/${idMuseu}`).then(function (resposta) {
        if (resposta.status == 200) {
            resposta.json().then(res => {
                totalSetores = res.length
                totalSectors.textContent = `Total ${res.length}, monitore-os abaixo`
                sectors.innerHTML = ""
                for (posicao = 0; posicao < res.length; posicao++) {
                    let name = res[posicao].nome
                    let status = "Normal"
                    let color = "#666666"
                    if (res[posicao].statusSetor == 3) {
                        status = "Crítico"
                        color = "#C62400"
                    } else if (res[posicao].statusSetor == 2) {
                        status = "Alerta"
                        color = "#DC9E00"
                    }
                    sectors.innerHTML += `
            <div class="sector">
                    <div class="sectorName">
                        <span class="sectorCaption">Nome</span>
                        <span class="name" id="nameSector">${name}</span>
                    </div>
                    <div class="sectorContainer">
                        <span class="sectorCaption">Status</span>
                        <span class="name" style="color: ${color}" id="statusSetor">${status}</span>
                    </div>
                    <div class="sectorContainer">
                        <span class="sectorCaption">Andar</span>
                        <span class="name">${res[posicao].andar}</span>
                    </div>
                    <button class="seeSector" value="${res[posicao].idSetor}" onclick="verSetor(this)">Ver setor <i class="fa-solid fa-arrow-right"></i></button>
                </div>
            `
                }
            })
        }

        fetch(`/setores/buscarSetoresCriticos/${idMuseu}`).then(function (respostaCritico) {
            if (respostaCritico.status != 200) {
                pie()
            }
            respostaCritico.json().then(res => {
                setoresCriticos.push(res.length)
                qtdCritico.textContent = setoresCriticos[setoresCriticos.length - 1]

                fetch(`/setores/buscarSetoresAlerta/${idMuseu}`).then(function (resposta) {
                    if (resposta.status != 200) {
                        pie()
                    } else {
                        resposta.json().then(res => {
                            setoresAlerta.push(res.length)
                            qtdCritico.textContent = setoresCriticos[setoresCriticos.length - 1]
                            qtdAlerta.textContent = setoresAlerta[setoresAlerta.length - 1]
                        }
                        )
                        pie()

                    }
                }).catch(function (erro) {
                    console.log(erro);
                })
            })
        }).catch(function (erro) {
            console.log(erro);
        })



        async function pie() {
            await fetch(`/setores/buscarSetoresAlerta/${idMuseu}`).then(function (resposta) {
                resposta.json().then(res => {
                })
            })
            setTimeout(() => {
                let critico = Number(qtdCritico.textContent)
                let alerta = Number(qtdAlerta.textContent)

                let porcentagemCritico = (critico / totalSetores) * 100
                let porcentagemAlerta = (alerta / totalSetores) * 100
                let porcentagemNormal = 100 - (porcentagemAlerta + porcentagemCritico)

                Chart.defaults.color = "#292929";
                Chart.defaults.font.size = 14;
                Chart.defaults.plugins.legend.position = 'right';

                const pieData = {
                    datasets: [{
                        label: 'Criticidade',
                        data: [porcentagemCritico, porcentagemAlerta, porcentagemNormal],
                        backgroundColor: [
                            '#C62400',
                            '#DC9E00',
                            '#575757'
                        ],
                        position: "#right"
                    }],
                    labels: ["Crítico", "Alerta", "Normal"],
                    legend: "none"
                };

                const pieConfig = {
                    type: 'pie',
                    data: pieData,

                };

                const pieChart = new Chart(
                    document.getElementById('pieChart'),
                    pieConfig,
                );
            }, 200);
        }
    }).catch(function (erro) {
        console.log(erro);
    })

}


function logout() {
    sessionStorage.clear()
    window.location.href = "../login.html"
}
function verSetor(res) {
    if (idSupervisor > 0) {
        fetch(`/relatorio/inserirRelatorioVisualizacao/${idMuseu}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                fkSetor: res.value,
                fkSupervisor: idSupervisor,
            }),
        }).catch(function (resposta) {
            // console.log(`#ERRO: ${resposta}`);
        });
        window.location.href = "./setor.html"
        sessionStorage.setItem("idSetor", res.value)
    } else {
        window.location.href = "./setor.html"
        sessionStorage.setItem("idSetor", res.value)
    }


}

function noSector() {
    modalDashboard.showModal()
    totalSectors.textContent = `Total de 0 setores, cadastre um setor para monitora-lo`
    qtdCritico.textContent = 0
    qtdAlerta.textContent = 0

    Chart.defaults.color = "#292929";
    Chart.defaults.font.size = 20;
    Chart.defaults.plugins.legend.position = 'right';

    const pieData = {
        datasets: [{
            label: 'Criticidade',
            data: [0, 0, 1],
            backgroundColor: [
                '#C62400',
                '#DC9E00',
                '#575757'
            ],
            position: "#right"
        }],
        labels: ["Crítico", "Alerta", "Normal"],
        legend: "none"
    };

    const pieConfig = {
        type: 'pie',
        data: pieData,

    };
    const pieChart = new Chart(
        document.getElementById('pieChart'),
        pieConfig,
    );
}

const labels = []
const datas = []

fetch(`/relatorio/buscarQuantidadeStatusAlerta/${idMuseu}`).then(response => {
    response.json().then(res => {
        console.log(res)
        for (posicao = 0; posicao < res.length; posicao++) {
            labels.push(res[posicao].nome)
            datas.push(res[posicao].quantidade)
        }
        barChart()
    })
})

const labelsCritico = []
const datasCritico = []

fetch(`/relatorio/buscarQuantidadeStatusCritico/${idMuseu}`).then(response => {
    response.json().then(res => {
        console.log(res)
        for (posicao = 0; posicao < res.length; posicao++) {
            labelsCritico.push(res[posicao].nome)
            datasCritico.push(res[posicao].quantidade)
        }
        barChart()
    })
})
function barChart() {
    const barData = {
        labels: labels,
        datasets: [{
            label: 'Quantidade de vezes em status alerta',
            data: datas,
            backgroundColor: [
                'rgba(255, 205, 86, 0.2)',

            ],
            borderColor: [
                'rgb(255, 205, 86)',
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

    const barDataCritico = {
        labels: labelsCritico,
        datasets: [{
            label: 'Quantidade de vezes em status Crítico',
            data: datasCritico,
            backgroundColor: [
                'rgba(255, 25, 86, 0.2)',

            ],
            borderColor: [
                'rgb(255, 25, 00)',
            ],
            borderWidth: 2
        }]
    };
    const barConfigCritico = {
        type: 'bar',
        data: barDataCritico,
        options: {
            plugins: {
                legend: {
                    display: false
                },
            }
        },
    };

    const barChartCritico = new Chart(
        document.getElementById('barChartCritico'),
        barConfigCritico,
    );

}
let chart = "critico"
function switchChart() {
    if (chart == "critico") {
        alerta.style.opacity = "1"
        critico.style.opacity = "0"
        chart = "alerta"
    }else{
        alerta.style.opacity = "0"
        critico.style.opacity = "1"
        chart = "critico"
    }

}