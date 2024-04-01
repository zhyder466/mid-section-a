const products = [
  {
    name: "Scooter",
    price: 199.99,
    imageUrl: "https://api.dicebear.com/8.x/icons/svg?seed=Scooter",
  },
  {
    name: "Headphones",
    price: 99.99,
    imageUrl: "https://api.dicebear.com/8.x/icons/svg?seed=Headphones",
  },
  {
    name: "Smartphone",
    price: 599.99,
    imageUrl: "https://api.dicebear.com/8.x/icons/svg?seed=Smartphone",
  },
  {
    name: "Laptop",
    price: 999.99,
    imageUrl: "https://api.dicebear.com/8.x/icons/svg?seed=Laptop",
  },
  {
    name: "Watch",
    price: 149.99,
    imageUrl: "https://api.dicebear.com/8.x/icons/svg?seed=Watch",
  },
  {
    name: "Sunglasses",
    price: 49.99,
    imageUrl: "https://api.dicebear.com/8.x/icons/svg?seed=Sunglasses",
  },
  {
    name: "Backpack",
    price: 79.99,
    imageUrl: "https://api.dicebear.com/8.x/icons/svg?seed=Backpack",
  },
  {
    name: "Gaming Console",
    price: 399.99,
    imageUrl: "https://api.dicebear.com/8.x/icons/svg?seed=Gaming%20Console",
  },
];

const container = document.getElementById("product-container");
const cartItemsContainer = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
let cart = [];


function updateCartTotal() {
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  cartTotal.textContent = total.toFixed(2);
}


function renderCartItems() {
  cartItemsContainer.innerHTML = "";
  cart.forEach(item => {
    const cartItem = document.createElement("div");
    cartItem.innerHTML = `
      <div>${item.name} - $${(item.price * item.quantity).toFixed(2)}</div>
      <input type="number" min="1" value="${item.quantity}" data-name="${item.name}" class="quantity-input">
      <button class="remove-btn" data-name="${item.name}">Remove</button>
    `;
    cartItemsContainer.appendChild(cartItem);
  });

  updateCartTotal();
}


function addToCart(name) {
  const product = products.find(product => product.name === name);
  if (product) {
    const existingItemIndex = cart.findIndex(item => item.name === name);
    if (existingItemIndex !== -1) {
      cart[existingItemIndex].quantity++;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    renderCartItems();
  }
}


function removeFromCart(name) {
  const index = cart.findIndex(item => item.name === name);
  if (index !== -1) {
    cart.splice(index, 1);
    renderCartItems();
  }
}

container.addEventListener("click", event => {
  if (event.target.classList.contains("add-to-cart-btn")) {
    const productName = event.target.parentNode.querySelector("h2").textContent;
    addToCart(productName);
  }
});


cartItemsContainer.addEventListener("input", event => {
  if (event.target.classList.contains("quantity-input")) {
    const productName = event.target.dataset.name;
    const newQuantity = parseInt(event.target.value);
    const item = cart.find(item => item.name === productName);
    if (item) {
      item.quantity = newQuantity;
      renderCartItems();
    }
  }
});

cartItemsContainer.addEventListener("click", event => {
  if (event.target.classList.contains("remove-btn")) {
    const productName = event.target.dataset.name;
    removeFromCart(productName);
  }
});


products.forEach((product) => {
  const productDiv = document.createElement("div");
  productDiv.classList.add("product");

  const imageContainer = document.createElement("div");
  imageContainer.classList.add("image-container");

  const image = document.createElement("img");
  image.src = product.imageUrl;
  image.alt = product.name;
  image.classList.add("product-image");

  imageContainer.appendChild(image);

  const infoDiv = document.createElement("div");
  infoDiv.classList.add("info");

  const name = document.createElement("h2");
  name.textContent = product.name;

  const price = document.createElement("p");
  price.textContent = "$" + product.price.toFixed(2);

  const button = document.createElement("button");
  button.textContent = "Add to Cart";
  button.classList.add("add-to-cart-btn");

  infoDiv.appendChild(name);
  infoDiv.appendChild(price);
  infoDiv.appendChild(button);

  productDiv.appendChild(imageContainer);
  productDiv.appendChild(infoDiv);

  container.appendChild(productDiv);

});