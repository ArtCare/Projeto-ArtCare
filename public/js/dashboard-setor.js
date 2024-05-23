const idSetor = sessionStorage.getItem("idSetor")
const headerContainer = document.querySelector('.header-container')
const sectorTitle = document.querySelector('#sectorTitle')
const temperatura = document.querySelector('#temperatura')
const umidade = document.querySelector('#umidade')

const registrosTemperatura = []
const registrosUmidade = []
const tempoRegistro = []
fetch(`/setores/buscarDadosSetor/${idSetor}`).then(res => {
    res.json().then(res => {
        sectorTitle.textContent = `Setor ${res[0].idSetor}: ${res[0].nome}`
    })
}
)
buscarCapturas()
function logout() {
    window.location.href = "login.html"
}


function mostrarLegendas() {

    if (legendaAtiva == true) {
        esconderLegendas()
    } else {
        headerContainer.innerHTML += `
            <div class="metricas">
                <div class="temperatura">
                    <span class="titulo-metrica">Métricas de temperatura do setor</span>
                    <div class="descricao">
                        <p>Temperatura máxima: 00ºC</p>
                        <p>Temperatura mínima: 00ºC</p>
                    </div>
                </div>
                <div class="umidade">
                    <span class="titulo-metrica">Métricas de umidade do setor</span>
                    <div class="descricao">
                        <p>Umidade máxima: 00ºC</p>
                        <p>Umidade mínima: 00ºC</p>
                    </div>
                </div>
            </div>
        `
        legendaAtiva = true;
    }
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
        data: {
            labels: umi.map(row => row.time),
            datasets: [
                {
                    data: umi.map(row => row.count),
                    borderColor: '#36A2EB',
                }
            ]
        }
    }
);
let graficoStatus = new Chart(
    document.getElementById('grafico_status'),
    {
        type: 'pie',
        data: {
            labels: [
                'Crítico',
                'Alerta',
                'Normal'
            ],
            datasets: [{
                data: [10, 15, 7],
                borderWidth: 1,
                backgroundColor: [
                    '#C62400',
                    '#DC9E00',
                    '#575757'
                ]
            }]
        },
    }
)
function buscarCapturas() {
    fetch(`/setores/buscarCapturasSetor/${idSetor}`).then(res => {
        res.json().then(res => {

            temperatura.textContent = `${res[0].temperatura}°C`
            umidade.textContent = `${res[0].umidade}%`

            registrosTemperatura.push(res[0].temperatura)
            tempoRegistro.push(res[0].tempo)
            if(registrosTemperatura.length > 7){
                tempoRegistro.shift()
                registrosTemperatura.shift()
            }
            graficoTemperatura.update();
            console.log(tempoRegistro)
        })
    })
    setTimeout(() => {
        buscarCapturas()
    }, 3000)
}