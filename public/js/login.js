const modal = document.querySelector('#alertModal')
const rm = document.querySelector('#rm').value
const senha = document.querySelector('#senha').value


function ValidarLogin(){
    let senhaNum = false

    if (rm.length <= 8 || rm.length >= 10){
        modal.showModal()
    }else if (senha.length <= 4){
        modal.showModal()
    } else {
        for(let numero = 0; numero <= 9; numero ++ ){
            if(senha.indexOf(numero.toString())!= -1){
                senhaNum = true
            } 
        }
        if(senhaNum == false){
            modal.showModal()
        } else {
            window.location = "./dashboard/dashboard.html"
        }
    }
}

function closeModal(){
    modal.close()
}