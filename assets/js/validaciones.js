
export function validar(input){
        const tipoDeInput = input.dataset.tipo;
        if(validaciones[tipoDeInput]){
            validaciones[tipoDeInput](input)
        }
        if(input.validity.valid){
            input.parentElement.classList.remove('input-container--invalid');
            input.parentElement.querySelector('.input-message-error').innertHTML = '';
        }else{
            input.parentElement.classList.add('input-container--invalid');
            input.parentElement.querySelector('.input-message-error').innertHTML = mostrarMensajeError(tipoDeInput, input);
        }
    }

const tipoDeErrores = [
    'valueMissing',
    'typeMissmatch',
    'paternMismatch',
    'customError'
]

const mensajesDeError = {
    nombre : {
        valueMissing : 'Este campo no puede estar vacio'
    },
    email : {
        valueMissing : 'Este campo no puede estar vacio',
        typeMissmatch : 'Por favor ingresa un email válido'
    },
    password : {
        valueMissing : 'Este campo no puede estar vacio',
        paternMismatch : 'Al menos 8 caracteres y al menos 1 número'
    },
    nacimiento : {
        valueMissing : 'Este campo no puede estar vacio',
        customError : 'Lo sentimos, debes ser mayor de edad para poder llenar este formulario'
    },
    numero : {
        valueMissing : 'Este campo no puede estar vacio',
        paternMismatch : 'Por favor ingresa un número telefónico válido'
    },
    direccion : {
        valueMissing : 'Este campo no puede estar vacio',
        paternMismatch : 'Ingresa tu dirección de residencia'
    },
    ciudad : {
        valueMissing : 'Este campo no puede estar vacio',
        paternMismatch : 'Ingresa el nombre de la ciudad de residencia'
    },
    estado : {
        valueMissing : 'Este campo no puede estar vacio',
        paternMismatch : 'Ingresa el nombre del estado en el que vives'
    }
}

const validaciones = {
    nacimiento: input => validarBirth(input)
}


function mostrarMensajeError(tipoDeInput, input){
    let mensaje = ''
    tipoDeErrores.forEach( error => {
        if(input.validity[error]){
            console.log(tipoDeInput, error);
            console.log(input.validity[error]);
            console.log(mensajesDeError[tipoDeInput][error]);
            mensaje = mensajesDeError[tipoDeInput][error];
        }
    })
    return mensaje;
}

function validarBirth(input){
    const fechaUsuario = new Date(input.value);
    let mensaje = '';
    if(!mayorDeEdad(fechaUsuario)){
        mensaje = 'Lo sentimos, debes ser mayor de edad para poder llenar este formulario'
    };
    input.setCustomValidity(mensaje);
}

function mayorDeEdad (fecha){
    const fechaActual = new Date();
    const diferenciaFecha = new Date(fecha.getUTCFullYear() + 18, fecha.getUTCMonth(), fecha.getUTCDate());
    return diferenciaFecha <=  fechaActual;
}