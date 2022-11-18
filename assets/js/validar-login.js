export function validarLogin(input) {
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
    "patternMismatch",
]

const mensajesDeError = {
    email: {
        valueMissing: "El campo correo no puede estar vacío",
        typeMismatch: "El correo no es válido",
        customError: "Debe tener el formato siguiente ejemplo@texto.com",
    },
    password: {
        valueMissing: "El campo password no puede estar vacío",
        patternMismatch: "La password debe tener al menos 6 caracteres, 1 Mayúscula, 1 minúscula y 1 número",
        customError: 'El campo password no puede estar en blanco o vacío',
    },
}

const validadores = {
    email: (input) => validarEmail(input),
    password: (input) => validarPassword(input),
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

function validarEmail(input) {
    const email = input.value;
    const emailVector = email.split('');
    let position1 = false;
    let position2 = false;
    let mensaje = '';

    emailVector.forEach(element => {
        if (element == '@') {
            position1 = true;
        } else if (element == '.' && position1) {
            position2 = true;
        }
    });
    
    if (position1 && !position2) {
        mensaje = "Debe tener el formato siguiente ejemplo@texto.com";
    }
    
    input.setCustomValidity(mensaje);
}

function validarPassword(input) {
    const password = input.value.trim();
    let mensaje = '';
    if (password == '') {
        mensaje = "El campo password no puede estar en blanco o vacío";
    } else if (password.length<6) {
        mensaje = "La password debe tener entre al menos 6 caracteres";
    }
    
    input.setCustomValidity(mensaje);
};