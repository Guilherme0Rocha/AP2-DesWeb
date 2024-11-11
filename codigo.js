window.onload = function () {

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
    `


        const verificaSenha = ( ) => {
            const entrada = document.getElementById("senha").value;
            const senha = 'ce855f48b7422de36b50512a9a0a06a59d4f2f6efac6f439456777a396773cc1';
            if (hex_sha256(entrada) === senha){
                localStorage.setItem('logado', 'sim');
                location.reload()
            } else {
                alert('A senha está incorreta!');
            }
        }

        document.getElementById('logar').onclick = verificaSenha;

    if (localStorage.getItem('logado') === 'sim') {
        document.body.style.display = "block";
        document.body.innerHTML = `
        <header>
            <h1>Atletas Botafogo 2024-1</h1>
            <button id="sair">Sair</button>
        </header>
        <div id="escolhas">
            <button value="masculino">Masculino</button>
            <button value="feminino">Feminino</button>
            <button value="all">Elenco Completo</button>
        </div>
        <select id="select">
            <option selected="true" disabled>Escolha o elenco</option>
            <option value="masculino">Masculino</option>
            <option value="feminino">Feminino</option>
            <option value="all">Elenco Completo</option>
        </select>
        <div id="caixaBusca">
            <input type="search" placeholder="BUSQUE POR NOME">
        </div>
        <h2 id="carregando">Carregando...</h2>
        <div id="container-jogadores">
        </div>
        `
    } else {
        return
    }

    document.getElementById('sair').onclick = ( ) => {localStorage.removeItem('logado'); location.reload()}
        
}


