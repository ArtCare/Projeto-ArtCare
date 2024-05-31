const idSetor = sessionStorage.getItem("idSetor")
const headerContainer = document.querySelector('.header-container')
const sectorTitle = document.querySelector('#sectorTitle')
const temperatura = document.querySelector('#temperatura')
const umidade = document.querySelector('#umidade')
const tempMax = document.querySelector('#tempMax')
const tempMin = document.querySelector('#tempMin')
const umiMax = document.querySelector('#umiMax')
const umiMin = document.querySelector('#umiMin')

const registrosTemperatura = []
const registrosUmidade = []
const tempoRegistro = []

Chart.defaults.plugins.legend.position = 'bottom';
Chart.defaults.color = "#292929";
Chart.defaults.font.size = 16;

fetch(`/setores/buscarDadosSetor/${idSetor}`).then(res => {
    res.json().then(res => {
        sectorTitle.textContent = `Setor ${res[0].idSetor}: ${res[0].nome}`
    })
})
fetch(`/setores/buscarMetricasSetor/${idSetor}`).then(res => {
    res.json().then(res => {
        tempMax.textContent = `TEMPERATURA MÁXIMA: ${res[0].temperaturaMaxima}°C`
        tempMin.textContent = `TEMPERATURA MÍNIMA: ${res[0].temperaturaMinima}°C`
        umiMax.textContent = `UMIDADE MÁXIMA: ${res[0].umidadeMaxima}%`
        umiMin.textContent = `UMIDADE MÍNIMA: ${res[0].umidadeMinima}%`
    })
})
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
let graficoStatus = new Chart(
    document.getElementById('grafico_status'),
    {
        type: 'pie',
        data: {
            labels: [
                '20% dos dias com status crítico',
                '40% dos dias em status alerta',
                '40% dos dias em status normal',
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
            registrosUmidade.push(res[0].umidade)
          
            tempoRegistro.push(res[0].tempo)

            if(registrosTemperatura.length > 7){
                tempoRegistro.shift()
                registrosTemperatura.shift()
                registrosUmidade.shift()
            }
            graficoTemperatura.update();
            graficoUmidade.update();
            console.log(tempoRegistro)
        })
    })
    setTimeout(() => {
        buscarCapturas()
    }, 3000)
}