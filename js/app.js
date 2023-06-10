import { valida } from "./validaciones.js";

//llamo los inputs regresa el arreglo
const inputs = document.querySelectorAll('input');

inputs.forEach(input => {
    input.addEventListener('blur', (input) =>{
        valida(input.target);
    });
});

