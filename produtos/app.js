document.addEventListener("DOMContentLoaded", function () {
      // Função para o timer
    function countdownTimer() {
        // Data do casamento: 28 de dezembro de 2024, 17:00
        const weddingDate = new Date('2024-12-28T17:00:00').getTime();

        // Atualizar o timer a cada segundo
        const interval = setInterval(function () {
            const now = new Date().getTime();
            const timeLeft = weddingDate - now;

            // Cálculos de tempo
            const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

            // Atualizar os valores no DOM
            document.getElementById('days').textContent = days;
            document.getElementById('hours').textContent = hours;
            document.getElementById('minutes').textContent = minutes;
            document.getElementById('seconds').textContent = seconds;

            // Se a contagem terminar, exibir uma mensagem
            if (timeLeft < 0) {
                clearInterval(interval);
                document.getElementById('timer').innerHTML = "<h3>O grande dia chegou!</h3>";
            }
        }, 1000);
    }

    // Iniciar o timer
    countdownTimer();
    // Carregar o arquivo JSON com a lista de produtos
    fetch('produtos/produtos.json')
        .then(response => response.json())
        .then(produtos => {
            const container = document.getElementById('product-container');

            // Para cada produto no JSON, criamos um card
            produtos.forEach(produto => {
                // Criar o card do produto
                const card = document.createElement('div');
                card.classList.add('product-card');

                // Imagem do produto
                const img = document.createElement('img');
                img.src = produto.image;
                img.alt = produto.title;
                card.appendChild(img);

                // Título do produto
                const title = document.createElement('h3');
                title.textContent = produto.title;
                card.appendChild(title);

                // Descrição do produto
                const description = document.createElement('p');
                description.textContent = produto.description;
                card.appendChild(description);

                // Preço do produto
                const price = document.createElement('p');
                price.classList.add('price');
                price.textContent = produto.price;
                card.appendChild(price);

                // Botão de compra
                const button = document.createElement('button');
                button.textContent = 'Comprar';
                card.appendChild(button);

                // Adicionar o card ao container
                container.appendChild(card);

                // Evento para abrir o modal ao clicar em "Comprar"
                button.addEventListener('click', function () {
                    openModal(produto.title, produto.description, `produtos/pix/${convertToCents(produto.price)}.png`, produto.pixCode);
                });
            });
        })
        .catch(error => {
            console.error('Erro ao carregar os produtos:', error);
        });

        function openModal(title, description, qrCodeSrc, pixCode) {
            const modal = document.getElementById('paymentModal');
            const modalTitle = document.getElementById('modal-title');
            const modalDescription = document.getElementById('modal-description');
            const modalImage = document.getElementById('modal-image');
            const modalPixCode = document.getElementById('modal-pix-code'); // Elemento para o código Pix
            const copyButton = document.getElementById('copy-button'); // Botão para copiar o código
            const copyPixKeyButton = document.getElementById('copy-pix-key'); // Botão para copiar o código
        
            // Atualizar o título, descrição, e imagem do QR code
            modalTitle.textContent = title;
            modalDescription.textContent = description;
            modalImage.src = qrCodeSrc; // QR Code recebido como parâmetro
            modalPixCode.textContent = pixCode; // Código Pix recebido como parâmetro
        
            // Mostrar o modal
            modal.style.display = 'flex';
        
            // Função para copiar o código Pix para a área de transferência
            copyButton.onclick = function () {
                navigator.clipboard.writeText(pixCode).then(() => {
                    alert("Código Pix copiado para a área de transferência!");
                }).catch(err => {
                    console.error("Falha ao copiar o texto: ", err);
                });
            };

            // Função para copiar a chave Pix para a área de transferência
            copyPixKeyButton.onclick = function () {
                navigator.clipboard.writeText("anielyefilipe@gmail.com").then(() => {
                    alert("Chave Pix copiada para a área de transferência!");
                }).catch(err => {
                    console.error("Falha ao copiar o texto: ", err);
                });
            };
        
            // Fechar o modal ao clicar no "x"
            const closeBtn = document.querySelector('.close');
            closeBtn.onclick = function () {
                modal.style.display = 'none';
            };
        
            // Fechar o modal ao clicar fora do conteúdo
            window.onclick = function (event) {
                if (event.target == modal) {
                    modal.style.display = 'none';
                }
            };
        }
        
    
});


function convertToCents(price) {
    // Remove "R$" e espaços
    let cleanValue = price.replace(/[R$\s]/g, '');

    // Substitui a vírgula por ponto
    cents = cleanValue.replace(',', '');

    if (cents === "????") {
        cents = 'any';
    }

    return cents;
}