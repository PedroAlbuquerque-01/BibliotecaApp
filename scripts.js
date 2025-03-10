document.addEventListener('DOMContentLoaded', function() {

    // Evento de login para autenticação do usuário
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();  // Impede o envio do formulário

            // Obter os valores dos campos de login
            let username = document.getElementById('username').value;
            let password = document.getElementById('password').value;

            // Definir credenciais para os usuários
            const usuarios = [
                { username: 'admin', password: 'admin', tipo: 'admin' },
                { username: 'operador', password: 'operador', tipo: 'operador' },
                { username: 'usuario', password: 'usuario', tipo: 'usuario' }
            ];

            // Verificar se o usuário e a senha são válidos
            let usuarioValido = usuarios.find(user => user.username === username && user.password === password);

            if (usuarioValido) {
                // Redirecionar o usuário para a página de acordo com o tipo de usuário
                sessionStorage.setItem('usuario', JSON.stringify(usuarioValido)); // Armazenar dados do usuário na sessão
                if (usuarioValido.tipo === 'admin') {
                    window.location.href = "admin_dashboard.html"; // Página para o administrador
                } else if (usuarioValido.tipo === 'operador') {
                    window.location.href = "operador_dashboard.html"; // Página para o operador
                } else {
                    window.location.href = "usuario_dashboard.html"; // Página para o usuário
                }
            } else {
                // Exibir mensagem de erro
                document.getElementById('error-message').style.display = 'block';
            }
        });
    }

    // Função de navegação
    const navigationLinks = [
        { id: 'ir-para-cadastrar-usuario', func: irParaCadastrarUsuario },
        { id: 'ir-para-acervo', func: irParaAcervo },  // AQUI FOI CORRIGIDO!
        { id: 'ir-para-emprestimo', func: irParaEmprestimo },
        { id: 'ir-para-multas', func: irParaMultas },
        { id: 'sair', func: sair },
        { id: 'voltar', func: voltar }
    ];

    navigationLinks.forEach(link => {
        const element = document.getElementById(link.id);
        if (element) {
            element.addEventListener('click', link.func);
        }
    });
    
    function irParaCadastrarLivro() {
    window.location.href = "cadastro_livro.html";  // Redireciona para a página de cadastro de livro
}

    // Função de controle de visibilidade do botão "Cadastrar Livro"
    const usuario = JSON.parse(sessionStorage.getItem('usuario'));
    const botaoCadastrarLivro = document.getElementById('cadastrar-livro');
    if (botaoCadastrarLivro) {
        if (usuario && (usuario.tipo === 'admin' || usuario.tipo === 'operador')) {
            botaoCadastrarLivro.style.display = 'inline-block'; // Exibe o botão
            // Adiciona o evento para redirecionar ao clicar no botão "Cadastrar Livro"
            botaoCadastrarLivro.addEventListener('click', function() {
                window.location.href = "cadastro_livro.html"; // Redireciona para a página de cadastro de livro
            });
        } else {
            botaoCadastrarLivro.style.display = 'none'; // Esconde o botão
        }
    }

    // Função de cadastro de usuário
    const formCadastro = document.getElementById('form-cadastro');
    if (formCadastro) {
        formCadastro.addEventListener('submit', function(event) {
            event.preventDefault();

            let login = document.getElementById('login').value;
            let senha = document.getElementById('senha').value;
            let nome = document.getElementById('nome').value;
            let email = document.getElementById('email').value;
            let tipoUsuario = document.getElementById('tipo-usuario').value;

            // Simulando um cadastro simples
            if (login && senha && nome && email && tipoUsuario) {
                alert("Cadastro realizado com sucesso!");
                window.location.href = "index.html";  // Redireciona para a tela principal após cadastro
            } else {
                alert("Por favor, preencha todos os campos.");
            }
        });
    }

    // Função para carregar o acervo de livros
    if (document.getElementById('tabela-acervo')) {
        carregarAcervo();
        const filtroAutor = document.getElementById('filtro-autor');
        if (filtroAutor) {
            filtroAutor.addEventListener('input', filtrarAcervo);
        }
    }

    // Função para adicionar um novo livro ao acervo (na página de cadastro de livro)
    const formCadastroLivro = document.getElementById('form-cadastro-livro');
    if (formCadastroLivro) {
        formCadastroLivro.addEventListener('submit', function(event) {
            event.preventDefault();

            let titulo = document.getElementById('titulo').value;
            let autor = document.getElementById('autor').value;
            let genero = document.getElementById('genero').value;
            let copias = document.getElementById('copias').value;

            // Simulando a adição de um livro ao acervo
            if (titulo && autor && genero && copias) {
                alert("Livro cadastrado com sucesso!");
                window.location.href = "acervo.html";  // Redireciona para a página de acervo após o cadastro
            } else {
                alert("Por favor, preencha todos os campos.");
            }
        });
    }

    // Função para simular a exibição de empréstimos ativos
    if (document.getElementById('tabela-emprestimos')) {
        carregarEmprestimos();
    }

    // Função para carregar multas na página de gerenciamento de multas
    if (document.getElementById('tabela-multas')) {
        carregarMultas();
    }
});

// Funções de navegação
function irParaCadastrarUsuario() {
    window.location.href = "cadastro_usuario.html";
}

function irParaAcervo() {
    // Verificando se o usuário está logado corretamente
    const usuario = JSON.parse(sessionStorage.getItem('usuario'));
    if (usuario && usuario.tipo === 'usuario') {
        window.location.href = "acervo.html"; // Redireciona para o acervo
    } else {
        window.location.href = "acervo.html"; // Garante que a página de acervo seja carregada
    }
}

function irParaEmprestimo() {
    window.location.href = "emprestimo.html";
}

function irParaMultas() {
    window.location.href = "multa.html";
}

function sair() {
    if (confirm("Tem certeza de que deseja sair?")) {
        sessionStorage.removeItem('usuario');
        window.location.href = "login.html"; // Redireciona para a tela de login
    }
}

function voltar() {
    window.history.back();
}

function carregarAcervo() {
    let livros = [
        { id: 1, nome: '1984', autor: 'George Orwell', genero: 'Distopia', copias: 3 },
        { id: 2, nome: 'O Senhor dos Anéis: A Sociedade do Anel', autor: 'J.R.R. Tolkien', genero: 'Fantasia', copias: 5 },
        { id: 3, nome: 'Dom Casmurro', autor: 'Machado de Assis', genero: 'Romance', copias: 2 },
        { id: 4, nome: 'O Hobbit', autor: 'J.R.R. Tolkien', genero: 'Fantasia', copias: 4 },
        { id: 5, nome: 'Orgulho e Preconceito', autor: 'Jane Austen', genero: 'Romance', copias: 1 }
    ];

    const tabela = document.getElementById('tabela-acervo').getElementsByTagName('tbody')[0];
    tabela.innerHTML = '';  // Limpa a tabela antes de adicionar os novos livros

    livros.forEach(livro => {
        const row = tabela.insertRow();
        row.innerHTML = `
            <td>${livro.id}</td>
            <td>${livro.nome}</td>
            <td>${livro.autor}</td>
            <td>${livro.genero}</td>
            <td>${livro.copias}</td>
        `;
    });
}

// Função para filtrar o acervo por autor
function filtrarAcervo() {
    let filtro = document.getElementById('filtro-autor').value.toLowerCase();
    let linhas = document.querySelectorAll('#tabela-acervo tbody tr');
    
    linhas.forEach(linha => {
        let autor = linha.querySelector('td:nth-child(3)').textContent.toLowerCase();
        linha.style.display = autor.includes(filtro) ? '' : 'none';
    });
}

// Funções de navegação
function irParaCadastrarUsuario() {
    window.location.href = "cadastro_usuario.html";
}

function irParaAcervo() {
    window.location.href = "acervo.html";  // Aqui a navegação foi corrigida.
}

