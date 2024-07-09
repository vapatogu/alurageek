const formProduct = document.getElementById("formProduct");
let nombreInput = document.getElementById("nombre");
let precioInput = document.getElementById("precio");
let imagenInput = document.getElementById("imagen");
const productsContainer = document.getElementById("productsContainer");
let allProducts = JSON.parse(localStorage.getItem("productsAdded")) || [];
const clearButton = document.getElementById("clearButton");

formProduct.addEventListener("submit", function (event) {
  event.preventDefault();

  const nombre = nombreInput.value.trim();
  const precio = precioInput.value.trim();
  const imagen = imagenInput.value.trim();

  if (nombre && precio && imagen) {
    const product = {
      nombre,
      precio,
      imagen,
    };

    saveProduct(product);
    displayProducts();

    nombreInput.value = "";
    precioInput.value = "";
    imagenInput.value = "";
  }
});

clearButton.addEventListener("click", clearProducts);

function createProduct(product) {
  const productCard = document.createElement("div");
  productCard.classList.add("product_card");
  const { nombre, imagen, precio, id } = product;

  productCard.innerHTML = `
            <picture class="product_card_image">
            <img src='${imagen}' alt="" />
            </picture>
            <p class="product_card_title">${nombre}</p>
            <div class="product_card_description">
            <p>$ ${precio}</p>
            <button onclick="deleteProduct(${id})" class="button_delete_product">
                <img src="./assets/trash-icon.svg" alt="" />
            </button>
            </div>
    `;

  productsContainer.appendChild(productCard);
}

function saveProduct(product) {
  allProducts.push({ ...product, id: allProducts.length + 1 });
  localStorage.setItem("productsAdded", JSON.stringify(allProducts));
}

function clearProducts() {
  allProducts = [];
  localStorage.removeItem("productsAdded");
  displayProducts();
}

function deleteProduct(id) {
  allProducts = allProducts.filter((product) => product.id !== id);
  localStorage.setItem("productsAdded", JSON.stringify(allProducts));
  displayProducts();
}

function displayProducts() {
  productsContainer.innerHTML = "";
  if (allProducts.length > 0) {
    allProducts.forEach((product) => {
      createProduct(product);
    });
  } else {
    productsContainer.innerHTML = `
        <div class="no_products">No hay productos agregados</div>
    `;
  }
}

displayProducts();