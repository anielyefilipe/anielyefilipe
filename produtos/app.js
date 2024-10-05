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
            });
        })
        .catch(error => {
            console.error('Erro ao carregar os produtos:', error);
        });
});
