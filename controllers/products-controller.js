import { productosServices } from "../services/products-services.js";

const nuevoProducto = (name, price, img, id) => {
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

const allProducts = (name, price, img, id) => {
    const card = document.createElement("div");
    const addAdmin = JSON.parse(localStorage.getItem("admin")) || [];

    const contenido = `
                    <ul>
                        <li class="product_icon">
                            <button class="product_icon--trash" type="button" id="${id}"><i class="fa fa-trash-o"></i></button>
                            <a href="../edit-product.html?id=${id}"><button class="product_icon--edit" type="button"><i class="fa fa-edit"></i></button></a>
                        </li>
                        <li class="product_img"><img src="${img}" alt="${name}"></li>
                        <li class="product_name">${name}</li>
                        <li class="product_price">$ ${price}</li>
                        <li class="product_link"><a href="/description.html?id=${id}">Ver Producto</a></li>
                    </ul>`

    card.innerHTML = contenido;
    card.classList.add("product_box");

    if (addAdmin == '') {
        card.querySelector(".product_icon").style = "display: none"
        document.querySelector(".product_a-addproduct").style = "display: none"
    } else {
        card.querySelector(".product_icon").style = "display: flex"
        document.querySelector(".product_a-addproduct").style = "display: flex"
    }

    const btn = card.querySelector("button");
    btn.addEventListener("click", () => {
        const id = btn.id;
        productosServices.eliminarProducto(id).then( respuesta => {
            console.log(respuesta)
        }).catch(err => alert("Ocurrió un error"))
    })

    return card;
};

const producto = document.querySelector ("[datos-allproductos]");
const producto_1 = document.querySelector("[datos-productos-1]");
const producto_2 = document.querySelector("[datos-productos-2]");
const producto_3 = document.querySelector("[datos-productos-3]");

let categoria_1 = document.querySelector("[datos-categoria-1]");
let categoria_2 = document.querySelector("[datos-categoria-2]");
let categoria_3 = document.querySelector("[datos-categoria-3]");

if (categoria_1 && categoria_2 && categoria_3) {
    categoria_1 = categoria_1.innerText;
    categoria_2 = categoria_2.innerText;
    categoria_3 = categoria_3.innerText;
}

const render = async () => {
    try {
        const listaProductos = await productosServices.listaProductos();
        listaProductos.forEach(element => {
            if (categoria_1 === element.category) {
                producto_1.appendChild(nuevoProducto(element.name, element.price, element.img, element.id));
            } else if (categoria_2 === element.category) {
                producto_2.appendChild(nuevoProducto(element.name, element.price, element.img, element.id));
            } else if (categoria_3 === element.category) {
                producto_3.appendChild(nuevoProducto(element.name, element.price, element.img, element.id));
            } else {
                producto.appendChild(allProducts(element.name, element.price, element.img, element.id));
            }
        });
    } catch (error) {
        console.log(error);
        window.location.href="/error.html";
    }
}

render()
