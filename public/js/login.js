const modal = document.querySelector('#alertModal')
const sucesso = document.querySelector('#sucesso')
const rm = document.querySelector('#rm')
const senha = document.querySelector('#senha')


function ValidarLogin(){
    let senhaNum = false
    if (rm.value.length <= 8 || rm.value.length >= 10){
        modal.showModal()
    }else if (senha.value.length <= 4){
        modal.showModal()
    } else {
        for(let numero = 0; numero <= 9; numero ++ ){
            if(senha.value.indexOf(numero.toString())!= -1){
                senhaNum = true
            } 
        }
        if(senhaNum == false){
            modal.showModal()
        } else {
            sucesso.showModal()
            setTimeout(()=> {
                window.location = "./dashboard/dashboard.html"
            }, 3000)
        }
    }
}

function closeModal(){
    modal.close()
}