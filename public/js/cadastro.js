const conteudoCadastro = document.querySelector('#conteudoCadastro')
const cadastroRepresentante = document.querySelector('#cadastroRepresentante')
const message = document.querySelector('#message')
const nome = input_nome
const cnpj = input_cnpj
const rm = input_rm
const modal = document.querySelector('#alertModal')
const sucesso = document.querySelector('#sucesso')

const nomeRep = document.querySelector('#nomeRepresentante')
const emailRepresentante = document.querySelector('#email')

const password = document.querySelector('#senhaRepresentante')
const confSenha = document.querySelector('#confSenha')

function nextStep() {
    if (nome.value.length <= 2) {
        modal.showModal()
        message.textContent = "Seu nome precisa ter mais que 2 caracteres."
    } else if (cnpj.value.length != 14) {
        modal.showModal()
        message.textContent = "Seu cnpj precisa ter 14 dígitos."
    } else if (rm.value.length <= 8 || rm.value.length >= 10) {
        modal.showModal()
        message.textContent = "Registro de museu inválido."
    } else {
        fetch("/usuarios/cadastrarMuseu", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                nome: nome.value,
                cnpj: cnpj.value,
                rm: rm.value
            }),
        }).catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });

        conteudoCadastro.style.display = "none";
        cadastroRepresentante.style.display = "flex";
    }
}



async function cadastro() {
    let senhaNum = false
    console.log(email)
    console.log(nomeRep.value)
    if (nomeRep.value.length <= 3) {
        modal.showModal()
        message.textContent = "Seu nome precisa ter mais que 3 caracteres."
    } else if (emailRepresentante.value.indexOf('@') == -1 || emailRepresentante.value.indexOf('.') == -1) {
        modal.showModal()
        message.textContent = "Email inválido."
    } else if (password.value.length <= 4) {
        modal.showModal()
        message.textContent = "Sua senha precisa ter mais que 4 caracteres."
    } else {
        for (let numero = 0; numero <= 9; numero++) {
            if (password.value.indexOf(numero.toString()) != -1) {
                senhaNum = true
            }
        }
        if (senhaNum == false) {
            modal.showModal()
            message.textContent = "Senha precisa de um caracter numérico"
        } else {
            sucesso.showModal()
            
           await fetch(`/usuarios/buscarMuseu/`).then(res => {
                res.json().then(res => {
                    let idMuseu = res[0].idMuseu

                    fetch("/usuarios/cadastrarRepresentante", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    fkMuseu: idMuseu,
                    nome: nomeRep.value,
                    email: emailRepresentante.value,
                    senha: password.value,
                }),
            }).catch(function (resposta) {
                console.log(`#ERRO: ${resposta}`);
            });
                    })
            }).catch(function (erro) {
                console.log(erro);
            })
            

            setTimeout(() => {
                location.replace('./login.html')
            }, 3000)
        }
    }
}

function closeModal() {
    modal.close()
}



