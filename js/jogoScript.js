document.addEventListener('DOMContentLoaded', function() {
    const caixas = document.querySelectorAll('.caixa');
    const comecarBt = document.getElementById('comecarBt');
    const embaralharBt = document.getElementById('embaralharBt');
    const msgDiv = document.getElementById('msg');
    let numero = Math.floor(Math.random() * 3) + 1;

    comecarBt.addEventListener('click', comecarJogo);
    embaralharBt.addEventListener('click', embaralharCaixas);

    caixas.forEach(caixa => {
        caixa.addEventListener('click', verificarCaixa);
    });

    function comecarJogo() {
        numero = Math.floor(Math.random() * 3) + 1;
        msgDiv.textContent = '';
        caixas.forEach(caixa => {
            caixa.textContent = '';
            caixa.classList.remove('hidden');
        });
        caixas[numero - 1].textContent = numero;
        embaralharBt.disabled = false;
    }

    function embaralharCaixas() {
        caixas.forEach(caixa => {
            caixa.classList.add('hidden');
            caixa.textContent = '';
        });

        embaralharBt.disabled = true;

        let embaralhador = 20;
        let interval = setInterval(() => {
            embaralhador--;

            let posicoes = [0, 1, 2];
            for (let i = posicoes.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [posicoes[i], posicoes[j]] = [posicoes[j], posicoes[i]];
            }

            const container = document.querySelector('.container');
            const caixasEmbaralhadas = posicoes.map(pos => caixas[pos]);
            caixasEmbaralhadas.forEach(caixa => container.appendChild(caixa));

            if (embaralhador === 0) {
                clearInterval(interval);
                caixas.forEach(caixa => caixa.classList.remove('hidden'));
            }
        }, 30);
    }

    function verificarCaixa(event) {
        const caixaSelecionada = event.target;
        caixas.forEach(caixa => {
            caixa.textContent = '';
        });
        caixas[numero - 1].textContent = numero;

        if (caixaSelecionada === caixas[numero - 1]) {
            msgDiv.textContent = 'Parabéns! Você encontrou o número.';
        } else {
            msgDiv.textContent = 'Tente novamente.';
        }
    }
});