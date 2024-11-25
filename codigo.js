window.onload = function () {
    // Function to verify the password
    const verificaSenha = () => {
        const entrada = document.getElementById("senha").value;
        const senhaHash = 'ce855f48b7422de36b50512a9a0a06a59d4f2f6efac6f439456777a396773cc1';
        if (hex_sha256(entrada) === senhaHash) {
            localStorage.setItem('logado', 'sim');
            renderLoggedInView();
        } else {
            alert('A senha está incorreta!');
        }
    };

    // Function to fetch JSON data
    const pega_json = async (caminho) => {
        const resposta = await fetch(caminho);
        const dados = await resposta.json();
        return dados;
    };

    const trataClick = (e) => {
        const artigo = e.currentTarget;

        localStorage.setItem('id', artigo.dataset.id);

        window.location = `detalhes.html?id=${artigo.dataset.id}`;
    };

    // Function to create player cards
    const montaCartao = (atleta) => {
        const container = document.getElementById('container-jogadores');
        const cartao = document.createElement('article');
        const nome = document.createElement('h1');
        const imagem = document.createElement('img');
        const botao = document.createElement('div');

        cartao.className = "card";
        nome.innerHTML = atleta.nome;
        nome.className = "nome";
        imagem.src = atleta.imagem;
        imagem.className = "imagem";
        botao.className = "saibaMais";
        botao.innerHTML = "Saiba Mais";

        cartao.appendChild(imagem);
        cartao.appendChild(botao);
        cartao.appendChild(nome);

        cartao.onclick = trataClick;

        cartao.dataset.id = atleta.id;
        cartao.dataset.nome = atleta.nome;
        cartao.dataset.imagem = atleta.imagem;

        container.appendChild(cartao);
    };

    const renderLoggedInView = () => {
        document.body.innerHTML = `
            <header>
                <h1>Atletas Botafogo 2024-1</h1>
                <button id="sair">Sair</button>
            </header>
            <div id="filtros">
                <div id="escolhas">
                    <button id="masculino">Masculino</button>
                    <button id="feminino">Feminino</button>
                    <button id="all">Elenco Completo</button>
                </div>
                <div id="caixaBusca">
                    <input id="busca" type="search" placeholder="BUSQUE POR NOME">
                </div>
            </div>
            <div id="container-jogadores"></div>
        `;

        const container = document.getElementById('container-jogadores');
        const searchInput = document.getElementById('busca');

        let currentPlayers = []; // Array to store the currently fetched players

        // Function to render filtered players based on the search input
        const filterPlayers = () => {
            const searchTerm = searchInput.value.toLowerCase();
            const filteredPlayers = currentPlayers.filter(player =>
                player.nome.toLowerCase().includes(searchTerm)
            );

            container.innerHTML = ''; // Clear the container
            filteredPlayers.forEach(player => montaCartao(player)); // Render filtered players
        };

        document.getElementById('masculino').onclick = () => {
            pega_json("https://botafogo-atletas.mange.li/2024-1/masculino").then((obj) => {
                currentPlayers = obj;
                container.innerHTML = '';
                obj.forEach((elemento) => montaCartao(elemento));
            });
        };

        document.getElementById('feminino').onclick = () => {
            pega_json("https://botafogo-atletas.mange.li/2024-1/feminino").then((obj) => {
                currentPlayers = obj;
                container.innerHTML = '';
                obj.forEach((elemento) => montaCartao(elemento));
            });
        };

        document.getElementById('all').onclick = () => {
            pega_json("https://botafogo-atletas.mange.li/2024-1/all").then((obj) => {
                currentPlayers = obj;
                container.innerHTML = '';
                obj.forEach((elemento) => montaCartao(elemento));
            });
        };

        document.getElementById('sair').onclick = () => {
            localStorage.removeItem('logado');
            location.reload();
        };

        // Add the event listener for the search input
        searchInput.addEventListener('input', filterPlayers);
    };

    // Initial view rendering
    if (localStorage.getItem('logado') === 'sim') {
        renderLoggedInView();
    } else {
        document.body.innerHTML = `
            <div id="container">
                <div id="header">
                    <h1>Atletas do Botafogo em 2024-1</h1>
                    <p>Criado com objetivos exclusivamente didáticos para a disciplina Desenvolvimento Web do Ibmec Rio.</p>
                </div>
                <div id="login">
                    <input id="senha" type="text" placeholder="Informe a senha.">
                    <button id="logar">Entrar</button>
                    <p>Efetue login com a senha: LIBERTADORES</p>
                </div>
            </div>
        `;

        document.getElementById('logar').onclick = verificaSenha;
    }
};
