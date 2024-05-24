sessionStorage.removeItem("idSetor")
const totalSectors = document.querySelector("#totalSectors")
const nameSector = document.querySelector("#nameSector")
const statusSetor = document.querySelector("#statusSetor")
const sectors = document.querySelector("#sectors")
const qtdAlerta = document.querySelector("#qtdAlerta")
const qtdCritico = document.querySelector("#qtdCritico")

fetch("/setores/buscarSetores").then(function (resposta) {
    resposta.json().then(res => {
        let totalSetores = res.length
        totalSectors.textContent = `Total ${res.length}, monitore-os abaixo`
        for(posicao = 0; posicao <= res.length;posicao++){
            let name = res[posicao].nome
            let status = "Normal"
            let color = "#666666"
            if(res[posicao].statusSetor == 3){
                status = "Crítico"
                color = "#C62400"
            }else if(res[posicao].statusSetor == 2){
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
                        <span class="sectorCaption">Tempo</span>
                        <span class="name">00:05:00</span>
                    </div>
                    <button class="seeSector" value="${res[posicao].idSetor}" onclick="verSetor(this)">Ver setor <i class="fa-solid fa-arrow-right"></i></button>
                </div>
            `

fetch("/setores/buscarSetoresCriticos").then(function (resposta) {
    resposta.json().then(res => {
        let setoresCriticos = res.length

        fetch("/setores/buscarSetoresAlerta").then(function (resposta) {
            resposta.json().then(res => {
                let setoresAlerta = res.length

                qtdCritico.textContent = setoresCriticos
                qtdAlerta.textContent = setoresAlerta

                let porcentagemCritico = (setoresCriticos / totalSetores) * 100
                let porcentagemAlerta = (setoresAlerta / totalSetores) * 100
                let porcentagemNormal = 100 - (porcentagemAlerta + porcentagemCritico)

                Chart.defaults.color = "#292929";
                Chart.defaults.font.size = 20;
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
                   
            })
        }).catch(function (erro) {
            console.log(erro);
        })
    })
}).catch(function (erro) {
    console.log(erro);
})
        }
    })
}).catch(function (erro) {
    console.log(erro);
})

const labels = ["Setor 1", "Setor 4", "Setor 5", "Setor 7", "setor 12"]
const barData = {
    labels: labels,
    datasets: [{
        label: 'Quantidade de vezes em estado de alerta',
        data: [5, 10, 7, 3, 15],
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
function logout() {
    window.location.href = "../login.html"
}
function verSetor(res){
    window.location.href = "./setor.html"
    sessionStorage.setItem("idSetor", res.value)
}
