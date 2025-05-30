let products = new Map();
let productHistory = new WeakMap();
let orders = new Set();
let customers = new WeakSet();

function addProduct(name, price, quantity) {
    if (products.has(name)) return alert(`Продукт "${name}" вже існує`);
    products.set(name, { price, quantity });
    productHistory.set(products.get(name), [`Додано: ${new Date().toLocaleString()}`]);
    updateProductList();
}

function updateProduct(name, newPrice, newQuantity) {
    if (!products.has(name)) return alert(`Продукт "${name}" не знайдено`);
    let product = products.get(name);
    product.price = newPrice;
    product.quantity = newQuantity;
    productHistory.get(product).push(`Оновлено: ${new Date().toLocaleString()}`);
    updateProductList();
}

function removeProduct(name) {
    if (!products.has(name)) return alert(`Продукт "${name}" не знайдено`);
    products.delete(name);
    updateProductList();
}

function placeOrder(customer, name, quantity) {
    if (!products.has(name)) return alert(`Продукт "${name}" не знайдено`);
    let product = products.get(name);
    if (product.quantity < quantity) return alert(`Недостатньо "${name}" на складі`);
    product.quantity -= quantity;
    orders.add({ customer, name, quantity });
    customers.add({ name: customer });
    updateProductList();
}

function updateProductList() {
    let productList = document.getElementById("productList");
    productList.innerHTML = "";
    products.forEach((value, key) => {
        let li = document.createElement("li");
        li.textContent = `${key}: ${value.price} грн, ${value.quantity} шт.`;
        productList.appendChild(li);
    });
}

function handleAddProduct() {
    let name = document.getElementById("productName").value;
    let price = parseFloat(document.getElementById("productPrice").value);
    let quantity = parseInt(document.getElementById("productQuantity").value);
    if (!name || isNaN(price) || isNaN(quantity)) return alert("Введіть коректні дані");
    addProduct(name, price, quantity);
}

function handleUpdateProduct() {
    let name = document.getElementById("updateName").value;
    let price = parseFloat(document.getElementById("updatePrice").value);
    let quantity = parseInt(document.getElementById("updateQuantity").value);
    if (!name || isNaN(price) || isNaN(quantity)) return alert("Введіть коректні дані");
    updateProduct(name, price, quantity);
}

function handleRemoveProduct() {
    let name = document.getElementById("deleteName").value;
    if (!name) return alert("Введіть назву продукту");
    removeProduct(name);
}

function handlePlaceOrder() {
    let customer = document.getElementById("customerName").value;
    let name = document.getElementById("orderProductName").value;
    let quantity = parseInt(document.getElementById("orderQuantity").value);
    if (!customer || !name || isNaN(quantity)) return alert("Введіть коректні дані");
    placeOrder(customer, name, quantity);
}
