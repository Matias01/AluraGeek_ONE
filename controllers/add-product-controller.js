import { productosServices } from "../services/products-services.js";

//  add product
const formulario = document.querySelector("[data-add-product]");
const products = document.querySelectorAll("[data-product]");

formulario.addEventListener("submit", event => {
    event.preventDefault();
    const image1 = products[0].value
    const image2 = products[1].files[0]
    const categoria = products[2].value
    const nombre = products[3].value
    const precio = products[4].value
    const descripcion = products[5].value
    if (image1 != '') {
        productosServices.crearProducto(image1, categoria, nombre, precio, descripcion)
            .then( () => window.location.href = "/all-products.html" )
            .catch(err => console.log(err));
    } else {
        convertToBase64(image2).then(response =>
            productosServices.crearProducto(response, categoria, nombre, precio, descripcion)
            .then( () => window.location.href = "/all-products.html" )
            .catch(err => console.log(err)));
    }
});

const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      if (file.size === 0) {
        reject(new Error("Sin fichero"));
      }
      let fileReader = new FileReader()
      fileReader.onload = function () {
        resolve(fileReader.result);
      }
      fileReader.readAsDataURL(file);
    });
}