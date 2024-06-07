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