function cadastro() {
    const nome = input_nome.value
    const cnpj = input_cnpj.value
    const email = input_email.value
    const senha = input_senha.value
    let senhaNum = false

    if(nome.length <= 2){
        alert("Seu nome precisa ter mais que 2 caracteres")
    } else if (cnpj.length != 14){
        alert("Seu cnpj precisa ter 14 dígitos")
    } else if (email.indexOf("@") == -1){
        alert("Seu email não possui ' @ '")
    } else if (email.indexOf(".") == -1){
        alert("Seu email precisa ter um ' . ' ")
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