import { productosServices } from "../services/products-services.js";

const formulario = document.querySelector("[data-add-product]");

// edit product

const informacionProducto = async () => {
    const url = new URL(window.location);
    const id = url.searchParams.get("id");

    if (id == null) {
        window.location.href = "error.html"
    }

    const image = formulario[0]
    const categoria = formulario[2]
    const nombre = formulario[3]
    const precio = formulario[4]
    const descripcion = formulario[5]

    try {
        const productos = await productosServices.detalleProducto(id);
        if (productos.img && productos.category && productos.name && productos.price && productos.descripcion) {
            
            if (formulario[1].value == '') {
                formulario[1].setAttribute('disabled', '');
            }
            
            image.value = productos.img
            categoria.value = productos.category
            nombre.value = productos.name
            precio.value = productos.price
            descripcion.value = productos.descripcion
        } else {
            throw new Error();
        }
    } catch (error) {
        window.location.href = "/error.html"
    }
};

informacionProducto();

formulario.addEventListener("submit", event => {
    event.preventDefault();
    const url = new URL(window.location);
    const id = url.searchParams.get("id");

    const image1 = formulario[0].value
    const image2 = formulario[1].files[0]
    const categoria = formulario[2].value
    const nombre = formulario[3].value
    const precio = formulario[4].value
    const descripcion = formulario[5].value

    if (image1 != '') {
        productosServices.actualizarProducto(id, image1, categoria, nombre, precio, descripcion)
            .then( () => window.location.href = "/all-products.html" )
    } else {
        convertToBase64(image2).then(response =>
            productosServices.actualizarProducto(id, response, categoria, nombre, precio, descripcion)
            .then( () => window.location.href = "/all-products.html" ));
    }
})

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