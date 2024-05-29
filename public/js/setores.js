const modal = document.querySelector('#modal')
const setores = document.querySelector('#setores')

buscarSetores()
function buscarSetores(){
    fetch(`/setores/buscarSetores/`).then(res => {
        res.json().then(res => {
            for (posicao = 0; posicao < res.length; posicao++) {
                setores.innerHTML += `
                <div class="setoresText">
                <span>${res[posicao].nome}</span> 
                <button class="buttonSetor" value="${res[posicao].idSetor}" onclick="verSetor(this)">Ver setor <i class="fa-solid fa-arrow-right"></i></button>
                </div>
                `
            }
        })
    })
    setTimeout(()=> {
        buscarSupervisor()
    },2000)
}
    function registerNewSector(){
        modal.showModal()
    }
    function close(){
        modal.close()
    }
    function verSetor(res){
        window.location.href = "./setor.html"
        sessionStorage.setItem("idSetor", res.value)
    }