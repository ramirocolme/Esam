// funcion para cada vez que el usuario sale del input
export function valida (input){//recibe el input
    const tipoDeInput = input.dataset.tipo;//trae la coleccion de los data y el tipo es para obtener el data-tipo
    if(validadores[tipoDeInput]){
        validadores[tipoDeInput](input)
    }
    //para que salga un color rojo en las letras indicando algo mal
    //es para validar si validity es true si es asi quita la clase si es false la agrega
    if(input.validity.valid){
        input.parentElement.classList.remove('input-container--invalid');
        input.parentElement.querySelector('.input-message-error').innerHTML = "";
    }else{
        input.parentElement.classList.add('input-container--invalid');
        input.parentElement.querySelector('.input-message-error').innerHTML = MostrarMensajeDeError(tipoDeInput, input);
    }
}

const tipoDeErrores = [
    "valueMissing",
    "typeMisMatch",
    "patternMisMatch",
    "customError",
];



//mensajes para el usuario en caso de error
const mensajesDeError = {
    nombre:{
        valueMissing: "El campo nombre no puede estar vacío"
    },
    email:{
        valueMissing: "El campo email no puede estar vacío",
        typeMisMatch: "El correo no es valido"
    },
    password:{
        valueMissing: "El campo contraseña no puede estar vacío",
        patternMisMatch: "Al menos 6 caracteres, máximo 12, debe contener una letra minúscula, una letra mayúscula, un número y no puede contener caracteres especiales."
    },
    nacimiento:{
        valueMissing: "El campo fecha no puede estar vacío",
        customError: "Debes tener al menos 18 años de edad"
    },
    numero:{
        valueMissing: "Este campo no puede estar vacío",
        patternMisMatch: "El formato requerido es XXX XXX XXXX 10 números"
    },
    direccion:{
        valueMissing: "Este campo no puede estar vacío",
        patternMisMatch: "La dirección debe contener de 10-40 caracteres"
    },
    ciudad:{
        valueMissing: "Este campo no puede estar vacío",
        patternMisMatch: "La ciudad debe contener de 10-40 caracteres"
    },
    departamento:{
        valueMissing: "Este campo no puede estar vacío",
        patternMisMatch: "El estado debe contener de 10-40 caracteres"
    },
}


//se arma un objeto para nacimiento, nombre, correo
const validadores = {
    nacimiento: input => validarNacimiento(input),
};

//con esta funcion se accede a los mensajes de error
function MostrarMensajeDeError(tipoDeInput, input){
    let mensaje = "";
    tipoDeErrores.forEach(error =>{
        if(input.validity[error]){
            console.log(tipoDeInput, error);
            console.log(input.validity[error]);
            console.log(mensajesDeError[tipoDeInput][error]);
            mensaje = mensajesDeError[tipoDeInput][error];
        }
    });
    return mensaje;
}

function validarNacimiento(input){
    const fechaCliente = new Date (input.value);
    let mensaje = "";
    if(!mayorDeEdad(fechaCliente)){
        mensaje = ("debes tener al menos 18 años de edad");
    }
    input.setCustomValidity(mensaje);
};

function mayorDeEdad(fecha){
    const fechaActual = new Date ();
    const diferenciaFechas = new Date (
        fecha.getUTCFullYear() + 18, 
        fecha.getUTCMonth(), 
        fecha.getUTCDate()
    );
    return diferenciaFechas <= fechaActual;
}