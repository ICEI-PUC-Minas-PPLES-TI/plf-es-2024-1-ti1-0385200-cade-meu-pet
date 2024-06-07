const apiUrl = 'https://bc8bb33f-6175-4214-998c-292c322364a2-00-2ddr60lv3tm7s.worf.replit.dev/cadastros';

document.addEventListener("DOMContentLoaded", function () {
    const menuIcon = document.querySelector(".mobile-menu-icon button");
    const menu = document.querySelector(".menu");

    menuIcon.addEventListener("click", function () {
        menu.classList.toggle("active");
    });

    const formCadastro = document.getElementById("form-contato");

    const btnInsert = document.getElementById("btnInsert");
    btnInsert.addEventListener('click', function () {
        if (!formCadastro.checkValidity()) {
            displayMessage("Preencha o formulário corretamente.");
            return;
        }

        const campoNome = document.getElementById('inputNome').value;
        const campoEmail = document.getElementById('inputEmail').value;
        const campoSenha = document.getElementById('inputSenha').value;

        const usuario = {
            nome: campoNome,
            email: campoEmail,
            senha: campoSenha
        };

        createUsuario(usuario);

        formCadastro.reset();
    });
});

function displayMessage(mensagem) {
    const msg = document.getElementById('msg');
    msg.innerHTML = '<div class="alert alert-warning">' + mensagem + '</div>';
    setTimeout(function () {
        msg.innerHTML = '';
    }, 5000);
}

function createUsuario(usuario) {
    console.log('Tentando cadastrar usuário:', usuario);

    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(usuario),
    })
    .then(response => {
        console.log('Resposta recebida:', response);
        if (!response.ok) {
            throw new Error('Erro ao cadastrar usuário');
        }
        return response.json();
    })
    .then(data => {
        console.log('Dados recebidos:', data);
        // displayMessage("Usuário cadastrado com sucesso");
        alert("Usuário cadastrado com sucesso");
        window.location.href = "../html/Home.html";
    })
    .catch(error => {
        console.error('Erro ao cadastrar usuário via API JSONServer:', error);
        // displayMessage("Erro ao cadastrar usuário");
        alert("Erro ao cadastrar usuário");
    });
}