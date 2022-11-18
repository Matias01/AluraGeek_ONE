import { validarConsulta } from "./assets/js/validar-consulta.js";
import { validarLogin } from "./assets/js/validar-login.js";
import { validarProduct } from "./assets/js/validar-product.js";

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
