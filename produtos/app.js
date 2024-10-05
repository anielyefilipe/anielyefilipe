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
                    openModal(produto.title, produto.description);
                });
            });
        })
        .catch(error => {
            console.error('Erro ao carregar os produtos:', error);
        });

    // Função para abrir o modal
    function openModal(title, description) {
        const modal = document.getElementById('paymentModal');
        const modalTitle = document.getElementById('modal-title');
        const modalDescription = document.getElementById('modal-description');
        const modalImage = document.getElementById('modal-image');

        modalTitle.textContent = title;
        modalDescription.textContent = description;
        modalImage.src = 'produtos/pix/169.png'; // Caminho da imagem do QR Code

        modal.style.display = 'flex'; // Mostrar o modal

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
