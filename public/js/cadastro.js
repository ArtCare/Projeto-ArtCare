const conteudoCadastro = document.querySelector('#conteudoCadastro')
const nome = input_nome.value
const cnpj = input_cnpj.value
const rm = input_rm.value
const senha = input_senha.value

function cadastro() {
    let senhaNum = false

    if(nome.length <= 2){
        alert("Seu nome precisa ter mais que 2 caracteres")
    } else if (cnpj.length != 14){
        alert("Seu cnpj precisa ter 14 dígitos")
    } else if (rm.length <= 8 || rm.length >= 10){
        alert("Registro de museu inválido")
    } else if (senha.length <= 4){
        alert("Sua senha precisa ter mais que 4 caracteres")
    } else {
        for(let numero = 0; numero <= 9; numero ++ ){
            if(senha.indexOf(numero.toString())!= -1){
                senhaNum = true
            } 
        }
        if(senhaNum == false){
            alert("Senha precisa de um caracter numérico")
        } else {
            window.location = "login.html"
        }

    }

}


function nextStep(){
   conteudoCadastro.innerHTML = `<div id="cadastroRepresentante" class="cadastroRepresentante" data-aos="fade-left" data-aos-duration="1500">
   <h1>Cadastre um <br>representante</h1>
   <div  class="box-input ">
       <div class="box-children-input">
           <span>Nome</span>
           <input class="input-Cadastro" type="text" id="input_nome">
       </div>
       <div class="box-children-input">
           <span>Email</span>
           <input class="input-Cadastro" type="text" id="input_rm">
       </div>
       <div class="box-children-input">
           <span>Senha</span>
           <input class="input-Cadastro" type="text" id="input_cnpj">
       </div>
       <div class="box-children-input">
           <span>Confirmar senha</span>
           <input class="input-Cadastro" type="password" id="input_senha">
       </div>
       <div class="btnDiv">
           <button class="btnForm" onclick="cadastro()">CADASTRE-SE</button>
       </div>
   </div>
</div>`
}

