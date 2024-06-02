const fkMuseu = sessionStorage.getItem("FK_MUSEU")
const nome = document.querySelector("#nome")
const setor = document.querySelector("#setor")
const dataHora = document.querySelector("#dataHora")
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