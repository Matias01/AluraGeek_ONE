// GET 

const listaProductos = () => fetch("http://localhost:3000/productos")
                            .then(respuesta => respuesta.json());

const crearProducto = (img, category, name, price, descripcion) => {
    return fetch("http://localhost:3000/productos", {
        method: "POST", 
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({img, category, name, price, descripcion, id: uuid.v4()})
    });
}

const eliminarProducto = (id) => {
    return fetch(`http://localhost:3000/productos/${id}`, {
        method: "DELETE"
    })
}

const detalleProducto = (id) => {
    return fetch(`http://localhost:3000/productos/${id}`)
        .then( (respuesta) => respuesta.json() );
};

const actualizarProducto = (id, img, category, name, price, descripcion) => {
    return fetch(`http://localhost:3000/productos/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ id, img, category, name, price, descripcion })
    })
    .then( (respuesta) => respuesta)
    .catch( (err) => console.log(err));
}

export const productosServices ={
    listaProductos,
    crearProducto,
    eliminarProducto,
    detalleProducto,
    actualizarProducto,
} 