const modal = document.querySelector('#alertModal')
const sucesso = document.querySelector('#sucesso')
const email = document.querySelector('#email')
const senha = document.querySelector('#senha')

function ValidarLogin() {
    let senhaNum = false
    if (email.value.indexOf('@') == -1 || email.value.indexOf('.') == -1) {
        modal.showModal()
    } else if (senha.value.length <= 4) {
        modal.showModal()
    } else {
        for (let numero = 0; numero <= 9; numero++) {
            if (senha.value.indexOf(numero.toString()) != -1) {
                senhaNum = true
            }
        }
        if (senhaNum == false) {
            modal.showModal()
        } else {
            fetch("/usuarios/autenticar", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: email.value,
                    senha: senha.value
                })
            }).then(function (resposta) {
                if (resposta.ok) {
                    sucesso.showModal()
                    resposta.json().then(json => {
                        sessionStorage.EMAIL_USUARIO = json.email;
                        sessionStorage.NOME_USUARIO = json.nome;
                        sessionStorage.ID_USUARIO = json.idRepresentante;
                        sessionStorage.FK_MUSEU = json.fkMuseu;

                        setTimeout(() => {
                            window.location = "./dashboard/dashboard.html"
                        }, 3000)

                    });

                } else {
                    resposta.text().then(text => {
                        modal.showModal();
                    });
                }
            }).catch(function (erro) {
                console.log(erro);
            })

        }
    }
}

function closeModal() {
    modal.close()
}