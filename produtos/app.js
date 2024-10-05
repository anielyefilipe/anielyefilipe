document.addEventListener("DOMContentLoaded", function () {
    // Carregar o arquivo JSON com a lista de produtos
    fetch('produtos.json')
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
        modalImage.src = './pix/169.png'; // Caminho da imagem do QR Code

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
