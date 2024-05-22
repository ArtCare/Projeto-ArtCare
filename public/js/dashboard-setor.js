const headerContainer = document.querySelector('.header-container')
const metricas = document.querySelector('metricas')
let legendaAtiva = true;

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