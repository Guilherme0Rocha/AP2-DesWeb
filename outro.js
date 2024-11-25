const params = new URLSearchParams(window.location.search)
window.onload = function () {

    if (localStorage.getItem('logado') === 'sim') {
        const id = params.get(`id`)

        const pega_json = async (caminho) => {
            const resposta = await fetch(caminho);
            const dados = await resposta.json();
            return dados;
        }

        pega_json(`https://botafogo-atletas.mange.li/2024-1/${id}`).then(
            ( atleta ) => {
                const article = document.getElementById('detalhes');
                const fotoNome = document.getElementById('fotoNome');
                const detalhesAtleta = document.getElementById('detalhesAtleta');
                const nome = document.createElement('p');
                const imagem = document.createElement('img');
                const desc = document.createElement('p');
                const posicao = document.createElement('h3');
                const nat = document.createElement('h3');
                const nascimento = document.createElement('h3');
                const num = document.createElement('h3');
                const altura = document.createElement('h3');
                const button = document.createElement('button');

                imagem.src = atleta.imagem;
                imagem.className = "imgDetalhes"
                imagem.alt = `foto de ${atleta.nome}`
                fotoNome.appendChild(imagem);

                nome.innerHTML = atleta.nome;
                fotoNome.appendChild(nome);

                desc.innerHTML = atleta.detalhes;
                detalhesAtleta.appendChild(desc);

                num.innerHTML = `Jogos pelo Botafogo: ${atleta.n_jogos}`;
                detalhesAtleta.appendChild(num);

                nascimento.innerHTML = `Nascimento: ${atleta.nascimento}`;
                detalhesAtleta.appendChild(nascimento);

                altura.innerHTML = `Altura: ${atleta.altura}`;
                detalhesAtleta.appendChild(altura);

                nat.innerHTML = `Naturalidade: ${atleta.naturalidade}`;
                detalhesAtleta.appendChild(nat);

                posicao.innerHTML = `Posição: ${atleta.posicao}`;
                detalhesAtleta.appendChild(posicao);

                button.id = "voltar";
                button.innerHTML = "Voltar";

                document.body.appendChild(button);

                document.getElementById('voltar').onclick = ( ) => {window.location = 'index.html'}
            }
        )
    } else {
        document.body.innerHTML = ``
        const mensagem = document.createElement('h1');
        const button = document.createElement('button');

        mensagem.innerHTML = 'Usuário não está logado!';
        document.body.appendChild(mensagem);

        button.id = "voltar";
        button.innerHTML = "Voltar";

        document.body.appendChild(button);

        document.getElementById('voltar').onclick = ( ) => {window.location = 'index.html'}

    }


}