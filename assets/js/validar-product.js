export function validarProduct(input) {
    const tipoDeInput = input.dataset.tipo;

    if (validadores[tipoDeInput]) {
        validadores[tipoDeInput](input);
    }

    if (input.validity.valid) {
        input.parentElement.classList.remove("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = '';
    } else {
        input.parentElement.classList.add("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = mostrarMensajeDeError(tipoDeInput,input);
    }
    
}

const tipoDeErrores = [
    "valueMissing",
    "typeMismatch",
    "customError",
]

const mensajesDeError = {
    image1: {
        valueMissing: "El campo imagen no puede estar vacío",
        typeMismatch: "La imagen no es válida",
        customError: 'El campo imagen no puede estar en blanco o vacío',
    },
    image2: {
        valueMissing: "El campo imagen no puede estar vacío",
        typeMismatch: "La imagen no es válida",
        customError: 'El campo imagen no puede estar en blanco o vacío',
    },
    category: {
        customError: 'Seleccione una categoría',
    },
    product: {
        valueMissing: "El nombre del producto no puede estar vacío",
        customError: 'El nombre del producto no puede estar en blanco o vacío',
    },
    price: {
        valueMissing: "El precio no puede estar vacío",
        customError: 'El precio no puede ser menor a cero o nulo',
    },
    description: {
        valueMissing: "La descripción no puede estar vacía",
        customError: 'La descripción no puede estar en blanco o vacía',
    },
}

const validadores = {
    image1: (input) => validarImage(input),
    image2: (input) => validarImage(input),
    category: (input) => validarCategory(input),
    product: (input) => validarName(input),
    price: (input) => validarPrice(input),
    description: (input) => validarDescription(input),
};

function mostrarMensajeDeError(tipoDeInput,input) {
    let mensaje = '';
    tipoDeErrores.forEach( error => {
        if (input.validity[error]) {
            mensaje = mensajesDeError[tipoDeInput][error]
        }
    })

    return mensaje
}

function validarImage(input) {
    const image = input.value.trim();
    const ElementImage_1 = document.getElementById("image1");
    const ElementImage_2 = document.getElementById("image2");
    const image_1 = ElementImage_1.value.trim();
    const image_2 = ElementImage_2.value.trim();
    let mensaje = '';

    if (image_1 == '' && image_2.length == 0) {
        mensaje = "Los campos de imagen no pueden estar en blanco o vacíos";
        ElementImage_1.removeAttribute('disabled', '');
        ElementImage_2.removeAttribute('disabled', '');
    } else if (image_1 != '' && image_2.length == 0) {
        ElementImage_2.setAttribute('disabled', '');
    } else if (image_1 == '' && image_2.length != 0) {
        ElementImage_1.setAttribute('disabled', '');
    }  else {
        mensaje = "No puede llenar ambos campos a la vez";
    }
    
    input.setCustomValidity(mensaje);
};

function validarCategory(input) {
    const categoria = input.value;
    let mensaje = '';
    if (categoria == 'Seleccionar') {
        mensaje = "Seleccione una categoría";
    }
    
    input.setCustomValidity(mensaje);
}

function validarName(input) {
    const nombre = input.value.trim();
    let mensaje = '';
    if (nombre == '') {
        mensaje = "El nombre no puede estar en blanco o vacío";
    }
    
    input.setCustomValidity(mensaje);
};

function validarPrice(input) {
    const precio = input.value.trim();
    let mensaje = '';
    if (precio <= 0 || isNaN(precio)) {
        mensaje = "El precio no puede ser menor a 0 o nulo";
    }
    
    input.setCustomValidity(mensaje);
};

function validarDescription(input) {
    const descripcion = input.value.trim();
    let mensaje = '';
    if (descripcion == '') {
        mensaje = "La descripción no puede estar en blanco o vacía";
    }
    
    input.setCustomValidity(mensaje);
};
