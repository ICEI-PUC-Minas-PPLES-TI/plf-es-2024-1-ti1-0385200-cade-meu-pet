const apiUrl = 'https://backend-cade-meu-pet.vercel.app/users'; 
const checkEmailUrl = 'https://backend-cade-meu-pet.vercel.app/check-email'; 

document.addEventListener("DOMContentLoaded", function () {
    const menuIcon = document.querySelector(".mobile-menu-icon button");
    const menu = document.querySelector(".menu");

    const btnInsert = document.getElementById("btnInsert");
    const formCadastro = document.getElementById("form-contato"); // Definindo a variável formCadastro

   btnInsert.addEventListener('click', function (event) {
    event.preventDefault();

    if (!formCadastro.checkValidity()) {
        displayMessage("Preencha o formulário corretamente.");
        return;
    }

    const nome = document.getElementById('inputNome').value;
    const email = document.getElementById('inputEmail').value;
    const senha = document.getElementById('inputSenha').value;

    if (!validateName(nome)) {
        displayMessage("Nome inválido. Por favor, insira um nome válido.");
        return;
    }

    if (!validateEmail(email)) {
        displayMessage("Email inválido. Por favor, insira um email válido.");
        return;
    }

    const passwordValidation = validatePassword(senha);
    if (!passwordValidation.minLength || !passwordValidation.hasNumber || !passwordValidation.hasSymbol || !passwordValidation.hasUppercase || !passwordValidation.hasLowercase) {
        displayMessage("Senha inválida. Por favor, siga os requisitos de senha.");
        return;
    }

    console.log(Verificando email: ${email});

    fetch(${checkEmailUrl}?email=${email})
        .then(response => {
            if (response.status === 400) {
                return response.json().then(data => {
                    throw new Error(data.message); // Lança um erro com a mensagem do backend
                });
            }
            if (!response.ok) {
                throw new Error('Erro ao verificar email');
            }
            return response.json(); // Continua para o próximo then se estiver tudo ok
        })
        .then(data => {
            console.log(Resposta do servidor: ${JSON.stringify(data)});
            const usuario = {
                nome: nome,
                email: email,
                senha: senha,
                relatos: [],
                animais_perdidos: []
            };

            createUsuario(usuario);
        })
        .catch(error => {
            console.error('Erro ao verificar email ou cadastrar usuário:', error.message);
            displayMessage(error.message); // Exibe a mensagem de erro no frontend
        });
});


    const togglePassword = document.getElementById('togglePassword');
    const passwordField = document.getElementById('inputSenha');
    const passwordValidation = document.getElementById('passwordValidation');

    togglePassword.addEventListener('click', function (e) {
        const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordField.setAttribute('type', type);
        this.querySelector('i').classList.toggle('fa-eye');
        this.querySelector('i').classList.toggle('fa-eye-slash');
    });

    passwordField.addEventListener('input', function () {
        const senha = passwordField.value;
        const validation = validatePassword(senha);

        let validationMessage = "";
        if (!validation.minLength) {
            validationMessage += "<span style='color:red'>A senha deve ter pelo menos 6 caracteres.</span><br>";
        } else {
            validationMessage += "<span style='color:green'>A senha tem pelo menos 6 caracteres.</span><br>";
        }
        if (!validation.hasNumber) {
            validationMessage += "<span style='color:red'>A senha deve conter pelo menos um número.</span><br>";
        } else {
            validationMessage += "<span style='color:green'>A senha contém pelo menos um número.</span><br>";
        }
        if (!validation.hasSymbol) {
            validationMessage += "<span style='color:red'>A senha deve conter pelo menos um símbolo.</span><br>";
        } else {
            validationMessage += "<span style='color:green'>A senha contém pelo menos um símbolo.</span><br>";
        }
        if (!validation.hasUppercase) {
            validationMessage += "<span style='color:red'>A senha deve conter pelo menos uma letra maiúscula.</span><br>";
        } else {
            validationMessage += "<span style='color:green'>A senha contém pelo menos uma letra maiúscula.</span><br>";
        }
        if (!validation.hasLowercase) {
            validationMessage += "<span style='color:red'>A senha deve conter pelo menos uma letra minúscula.</span><br>";
        } else {
            validationMessage += "<span style='color:green'>A senha contém pelo menos uma letra minúscula.</span><br>";
        }

        passwordValidation.innerHTML = validationMessage;
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const menuIcon = document.querySelector(".mobile-menu-icon button");
    const menu = document.querySelector(".menu");
  
    menuIcon.addEventListener("click", function () {
      menu.classList.toggle("active");
    });
  
    init();
});
  
document.addEventListener("DOMContentLoaded", function () {
    init();
  
    updateCadastroButton();
  
    document.getElementById('Anunciar').addEventListener('click', verificarLogin);
    document.getElementById('Cadastrar').addEventListener('click', verificarLogin);
});

function init() {}

async function verificarLogin(event) {
    const user = sessionStorage.getItem('userName') || localStorage.getItem('userName');

    if (!user) {
        event.preventDefault();
        window.location.href = '/html/cadastro_usuario.html';
    }
}

function updateCadastroButton() {
    const btnCadastrar = document.getElementById('Cadastrar').querySelector('a');
    const user = sessionStorage.getItem('userName') || localStorage.getItem('userName');

    if (btnCadastrar) {
        if (user) {
            btnCadastrar.textContent = 'Logado';
            btnCadastrar.href = '/html/editor_perfil.html';
        } else {
            btnCadastrar.textContent = 'Cadastrar';
            btnCadastrar.href = '/html/cadastro_usuario.html';
        }
    }
}

function displayMessage(mensagem) {
    window.alert(mensagem);
}

function validateName(name) {
    const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s']+$/;
    return nameRegex.test(name);
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePassword(password) {
    const passwordValidation = {
        minLength: password.length >= 6,
        hasNumber: /\d/.test(password),
        hasSymbol: /[!@#$%^&*(),.?":{}|<>]/.test(password),
        hasUppercase: /[A-Z]/.test(password),
        hasLowercase: /[a-z]/.test(password)
    };

    return passwordValidation;
}

async function createUsuario(usuario) {
    await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(usuario),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao cadastrar usuário');
            }
            return response.json();
        })
        .then(data => {
            localStorage.setItem('userId', data.id);
            localStorage.setItem('userName', data.nome);
            localStorage.setItem('userEmail', data.email);
            displayMessage("Usuário cadastrado com sucesso");
            window.location.href = "/html/home.html";
        })
        .catch(error => {
            console.error('Erro ao cadastrar usuário via API JSONServer:', error);
            displayMessage("Erro ao cadastrar usuário");
        });
}
