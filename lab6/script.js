let products = [];
let currentId = 1;
let editingProduct = null;

const $ = (selector) => document.querySelector(selector);

const createNode = (tag, props = {}, ...children) => {
    const el = document.createElement(tag);
    Object.entries(props).forEach(([k, v]) => k.startsWith("on")
        ? el.addEventListener(k.substring(2).toLowerCase(), v)
        : el.setAttribute(k, v)
    );
    children.forEach(child => {
        if (typeof child === 'string') el.appendChild(document.createTextNode(child));
        else el.appendChild(child);
    });
    return el;
};

const render = () => {
    const list = $('#product-list');
    const emptyMsg = $('#empty-message');
    list.innerHTML = '';

    if (products.length === 0) {
        emptyMsg.style.display = 'block';
    } else {
        emptyMsg.style.display = 'none';
        products.forEach(product => {
            const card = createProductCard(product);
            list.appendChild(card);

            requestAnimationFrame(() => card.classList.add('enter-active'));
        });
    }
    updateTotal();
};

const createProductCard = (p) =>
    createNode('div', {
             class: 'card enter',
            'data-category': p.category
        },
        createNode('img', { src: p.image, alt: p.name }),
        createNode('h3', {}, `${p.name}`),
        createNode('p', {}, `Ціна: ${p.price} $`),
        createNode('p', {}, `Категорія: ${p.category}`),
        createNode('p', {}, `ID: ${p.id}`),
        createNode('div', { class: 'actions' },
            createNode('button', { onClick: () => openEditModal(p) }, 'Редагувати'),
            createNode('button', { onClick: () => deleteProduct(p.id) }, 'Видалити')
        )
    );


const showToast = (message) => {
    const toast = $('#toast');
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
};

const openModal = () => { $('#product-modal').style.display = 'flex'; };
const closeModal = () => {
    $('#product-form').reset();
    $('#product-modal').style.display = 'none';
    editingProduct = null;
};

const addProduct = (product) => {
    products = [...products, { ...product, id: currentId++, createdAt: new Date(), updatedAt: new Date() }];
    render();
};

const updateProduct = (updated) => {
    products = products.map(p => p.id === updated.id ? { ...updated, updatedAt: new Date() } : p);
    showToast(`Товар ${updated.id} - ${updated.name} оновлено`);
    render();
};

const deleteProduct = (id) => {
    products = products.filter(p => p.id !== id);
    showToast(`Товар видалено`);
    render();
};

const updateTotal = () => {
    const total = products.reduce((sum, p) => sum + Number(p.price), 0);
    $('#total-price').textContent = `Total: $${total.toFixed(2)}`;
};

const sortByPrice = () => {
    products.sort((a, b) => a.price - b.price);
    render();
};

const sortByCreatedAt = () => {
    products.sort((a, b) => a.createdAt - b.createdAt);
    render();
};

const sortByUpdatedAt = () => {
    products.sort((a, b) => b.updatedAt - a.updatedAt);
    render();
};

const resetSort = () => {
    products.sort((a, b) => a.id - b.id);
    render();
};


// const displaySortedProducts = () => {
//     const list = $('#product-list');
//     list.innerHTML = '';
//     products.forEach(product => {
//         const card = createProductCard(product);
//         list.appendChild(card);
//     });
// };

$('#add-product-btn').addEventListener('click', openModal);

$('#product-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const form = e.target;
    const fileInput = form.image;
    const file = fileInput.files[0];

    let imageUrl = editingProduct ? editingProduct.image : '';

    if (file) {
        imageUrl = URL.createObjectURL(file);
    }

    const product = {
        id: editingProduct ? editingProduct.id : null,
        name: form.name.value,
        price: parseFloat(form.price.value),
        category: form.category.value,
        image: imageUrl
    };

    editingProduct ? updateProduct(product) : addProduct(product);
    closeModal();
});

$('#cancel-btn').addEventListener('click', closeModal);

const openEditModal = (product) => {
    editingProduct = product;
    const form = $('#product-form');
    form.name.value = product.name;
    form.price.value = product.price;
    form.category.value = product.category;

    const imagePreview = $('#image-preview');
    imagePreview.src = product.image;
    imagePreview.style.display = 'block';

    openModal();
};

const filterButtons = document.querySelectorAll('.filter-btn');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        const category = button.getAttribute('data-category');
        filterProducts(category);
    });
});


function filterProducts(category) {
    const products = document.querySelectorAll('#product-list .card');

    products.forEach(product => {
        const productCategory = product.getAttribute('data-category');

        if (category === 'all' || productCategory === category) {
            product.style.display = 'flex';
        } else {
            product.style.display = 'none';
        }
    });
}

$('#sort-price').addEventListener('click', () => {
    sortByPrice();
    // displaySortedProducts();
});

$('#sort-created').addEventListener('click', () => {
    sortByCreatedAt();
    // displaySortedProducts();
});

$('#sort-updated').addEventListener('click', () => {
    sortByUpdatedAt();
    // displaySortedProducts();
});

$('#reset-sort').addEventListener('click', () => {
    resetSort();
    // displaySortedProducts();
});

$('#filter-all').addEventListener('click', () => filterProducts('all'));
$('#filter-keyboards').addEventListener('click', () => filterProducts('keyboards'));
$('#filter-headphones').addEventListener('click', () => filterProducts('headphones'));
$('#filter-mouse').addEventListener('click', () => filterProducts('mouse'));

document.getElementById('reset-filter').addEventListener('click', () => {
    const allProducts = document.querySelectorAll('#product-list .card ');
    allProducts.forEach(product => {
        product.style.display = 'block';
    });

    const filterButtons = document.querySelectorAll('.filter-buttons button');
    filterButtons.forEach(btn => btn.classList.remove('active'));
});


render();
