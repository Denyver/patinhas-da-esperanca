api_login = "https://z8ui3ydxbd.execute-api.sa-east-1.amazonaws.com/dev/login";


function loginValidation(email, senha) {
    //console.log("Fetch")
    console.log(senha, email)
    fetch(api_login,
        {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "email": email,
                "senha": senha
            })
        }
    ).then(response => response.json())
        .then(code => {
            if (code.statusCode == 404) { //Se o retorno do fetch for o status code 404, not found ele retorna 0.
                let failedLogin = document.getElementById('failedLogin');
                failedLogin.setAttribute('style', 'display:block; color: red; margin-top: 5%;');
                failedLogin.innerHTML = '"E-mail" ou "Senha" incorretos!';
                return 0;
            }
            clearMessageErroLogin();
            changeToAdminConsole(code.user);

        })
}

function changeToAdminConsole() {
    window.location.href = "\\html\\status_adocao.html";
}

function login() {
    let email = document.getElementById('email').value;
    let senha = document.getElementById('senha').value;
    senha = btoa(senha);
    if (validarCamposVazios(email, senha)) {
        loginValidation(email, senha);
    }

}

function validarCamposVazios(email, senha) {
    if (senha == '' | email == '') {
        window.alert('Campos requeridos vazios!');
        return false;
    }
    return true;
}

function clearMessageErroLogin() {
    let failedLogin = document.getElementById('failedLogin');
    failedLogin.setAttribute('style', 'display:none; color: red; margin-top: 5%;');
}