export function validarConsulta(input) {
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
};

const tipoDeErrores = [
    "valueMissing",
    "customError",
]

const mensajesDeError = {
    nombre: {
        valueMissing: "El campo correo no puede estar vacío",
        customError: 'El campo nombre no puede estar en blanco o vacío',
    },
    mensaje: {
        valueMissing: "El campo correo no puede estar vacío",
        customError: 'El campo nombre no puede estar en blanco o vacío',
    },
};

const validadores = {
    nombre: (input) => validarNombre(input),
    mensaje: (input) => validarMensaje(input),
};

function mostrarMensajeDeError(tipoDeInput,input) {
    let mensaje = '';
    tipoDeErrores.forEach( error => {
        if (input.validity[error]) {
            mensaje = mensajesDeError[tipoDeInput][error];
        }
    })

    return mensaje;
};

function validarNombre(input) {
    const nombre = input.value.trim();
    let mensaje = '';
    if (nombre == '') {
        mensaje = "El campo nombre no puede estar en blanco o vacío";
    }
    
    input.setCustomValidity(mensaje);
};

function validarMensaje(input) {
    const textMensaje = input.value.trim();
    let mensaje = '';
    if (textMensaje == '') {
        mensaje = "El campo nombre no puede estar en blanco o vacío";
    }
    
    input.setCustomValidity(mensaje);
};