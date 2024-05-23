const idSetor = sessionStorage.getItem("idSetor")
const headerContainer = document.querySelector('.header-container')
const sectorTitle = document.querySelector('#sectorTitle')
const temperatura = document.querySelector('#temperatura')
const umidade = document.querySelector('#umidade')

let legendaAtiva = true;

fetch(`/setores/buscarDadosSetor/${idSetor}`).then(res => {
     res.json().then(res =>{
         sectorTitle.textContent = `Setor ${res[0].idSetor}: ${res[0].nome}`
     })
}
)
fetch(`/setores/buscarCapturasSetor/${idSetor}`).then(res => {
    res.json().then(res =>{
        temperatura.textContent = `${res[0].temperatura}°C`
        umidade.textContent = `${res[0].umidade}%`
    })
}
)

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

function esconderLegendas() {
    headerContainer.innerHTML = `
        <div class="principal">
            <span class="titulo-header">Setor 00 - Nome do Setor</span>
            <button class="btn-verLegenda" onclick="mostrarLegendas()">Ver legendas</button>
        </div>
    `
    legendaAtiva = false;
}