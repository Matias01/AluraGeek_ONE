import { productosServices } from "../services/products-services.js";

const showProduct = document.querySelector("[data-descripcion]");
const relatedProducts = document.querySelector("[data-relacionados]");

const descriptionProduct = (name, price, img, descripcion) => {
    const card = document.createElement("div");
    
    const contenido = `
        <img src="${img}" alt="${name}">
        <div class="description_text">
            <h1 class="description_title">${name}</h1>
            <p class="description_price">$ ${price}</p>
            <p class="description_subtext">${descripcion}</p>
        </div>
    `

    card.innerHTML = contenido;
    card.classList.add("description_div");

    return card;
}

const relacionados = (name, price, img, id) => {
    const card = document.createElement("div");

    const contenido = `
                    <ul>
                        <li class="product_img"><img src="${img}" alt="${name}"></li>
                        <li class="product_name">${name}</li>
                        <li class="product_price">$ ${price}</li>
                        <li class="product_link"><a href="/description.html?id=${id}">Ver Producto</a></li>
                    </ul>`

    card.innerHTML = contenido;
    card.classList.add("product_box");

    return card;
};

const showDescription = () => {
    const url = new URL(window.location);
    const id = url.searchParams.get("id");

    if (id == null) {
        window.location.href = "error.html"
    }

    productosServices.detalleProducto(id).then(element => {
        showProduct.appendChild(descriptionProduct(element.name, element.price, element.img, element.descripcion));
    })
}

showDescription()

const render = async () => {
    try {
        const url = new URL(window.location);
        const id = url.searchParams.get("id");

        const listaProductos = await productosServices.listaProductos();

        productosServices.detalleProducto(id).then( respuesta => {
            listaProductos.forEach(element => {
                if (element.category === respuesta.category) {
                    relatedProducts.appendChild(relacionados(element.name, element.price, element.img, element.id));
                }
            });
        })

    } catch (error) {
        console.log(error);
        window.location.href="/error.html";
    }
}

render()