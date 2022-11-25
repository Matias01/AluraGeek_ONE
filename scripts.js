import { validarConsulta } from "./assets/js/validar-consulta.js";
import { validarLogin } from "./assets/js/validar-login.js";
import { validarProduct } from "./assets/js/validar-product.js";
import { productosServices } from "./services/products-services.js";

const inputs = document.querySelectorAll("[data-consulta]");
const login = document.querySelectorAll("[data-login]");
const product = document.querySelectorAll("[data-product]");

inputs.forEach( input => {
    input.addEventListener('blur', (input) => {
        validarConsulta(input.target);
    });
});

login.forEach( input => {
    input.addEventListener('blur', (input) => {
        validarLogin(input.target);
    });
});

product.forEach( input => {
    input.addEventListener('blur', (input) => {
        validarProduct(input.target);
    });
});

const menuBoton = () => {
    const addAdmin = JSON.parse(localStorage.getItem("admin")) || [];
    
    if (addAdmin == '' ) {
        document.querySelector(".menu_login--admin").style = "display: none"
        document.querySelector(".menu_login--login").style = "display: flex"
    } else {
        document.querySelector(".menu_login--login").style = "display: none"
        document.querySelector(".menu_login--admin").style = "display: flex"
    }
}

menuBoton()

// search

const send = document.querySelector("#send")

const searchProduct = async (e) => {
    try {
        e.preventDefault();
        const search = document.querySelector("[data-search]").value

        const listaProductos = await productosServices.listaProductos();
        listaProductos.forEach( (element) => {
            if (search === element.name) {
                productosServices.detalleProducto(element.id).then( () => {
                    window.location.href = "/description.html?id="+element.id
                })}
        });
    } catch (error) {
        console.log(error);
        window.location.href="/error.html";
    }
}

send.addEventListener('click', event => searchProduct(event));

send.removeEventListener('click', event => searchProduct(event));