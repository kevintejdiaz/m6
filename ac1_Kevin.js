// MP06_UF1_AC1_Kevin_Tejeda

// -1. let i var: comparativa dels respectius abasts (scopes).

console.log(" let vs var")

let num1 = 2
var num2 = 2
resultado = num1+num2
console.log("La suma de los numeros previos es de: " + resultado)

//Ambas maneras de declarar la variable de manera global para usar en el codigo funcionan perfectamente


function comparativa (){
    var num1 = 18;
    let num2 = 21;
    suma = num1+num2
    console.log("El resultado de la suma de ambos numeros es de: " + suma)
}
comparativa();

console.log(num1," " + num2)
//Aqui podemos observar que los valores de num1 y num2 que usamos dentro de la funcion no crean conflicto las variables num1 y num2 que estan en el ambito global ja que las variables num1 y num2 dentro de la funcion solo existen dentro de la misma.


if(true){
    let nombre1 = 'Kevin';
    var nombre2 = 'Gabriel';
    console.log(nombre1, 'es amigo de ' + nombre2)
}
 
// console.log(nombre2, "es amigo de " + nombre1)

//Aqui hemos podido ver la peculiaridad de declarar una variable var dentro de un bloque ja que esta tiene visibilidad global asi dandonos solo error referencial en la variable nombre1 que solo tienen visibilidad de bloque (let)


// -2. let i var: redeclaració de variables i hoisting de declaracions.

var nombre2 = "Sergi";

console.log("Var nos permite redeclarar una variable previamente declarada sin dar conflicto. Hola " + nombre2)

// -3. Conversió a tipus numèric des de diversos altres tipus de dada amb Numeric().


var conversion = "123"
var prueba = Number(conversion)
console.log(prueba) // resultado: conversion de tipo string a numer

var conversion = "Hola"
var prueba = Number(conversion)
console.log(prueba) // resultado: not a number

var conversion = true
var prueba = Number(conversion)
console.log(prueba) //resultado: 1

var conversion = false
var prueba = Number(conversion)
console.log(prueba) //resultado: 0


// -4. Diferència d’ús entre Numeric() vs parseInt().


// -5. Diferència entre null i undefined.

var a
console.log(a)

var b = null
console.log(b)
//undefined se puede considerar alguna variable que esta declarada pero no inicializada
// y un null se puede a llegar a comprender como algo que simplemente no tiene valor

// -6. Comparació entre igualtat estricta i no estricta.

var a = "1"
var b = 1

console.log(a==b) // true debido a que solo estamos comparando el resultado de comparar 1 vs "1"
console.log(a===b)// false debido a que estamos comparando estamos comparando resultado Y TIPO DE DATO razon por la cual da false

// -7. Ús de l’operador condicional ?. Comparació amb estructura if clàssica.

var edad = 16;
var mensaje = (edad >= 18) ? "Puedes tomar alcohol. " : "Esperate unos años más."
console.log(mensaje)

// -8. Ús de l’operador nullish coallescing.

function saludarUser(nombreUser){
    var nombreFinal = nombreUser ?? "Invitado"
    console.log(`Hola, ${nombreFinal}`);
}

saludarUser()



// -9. Break i continue en bucles for.

// -10. Funcions amb paràmetres per defecte.

function bienvenido(nombre = "Invitado") {
    console.log(`Bienvenido, ${nombre}`);
}

bienvenido("Kevin")
bienvenido()

//Tenemos por defecto que salga invitado si no se pasa el parametro

// -11. Funció passada com a paràmetre a una altra funció.


// -12. Hoisting en declaracions de funcions vs hoisting en expressions de funcions.
// -13. Traducció d’una funció en notació clàssica a la notació fletxa (funcions d’una línia de codi i funcions de més d’una línea de codi).
// -14. Depuració de codi al navegador web: posar breakpoints i inspeccionar el valor d’una variable.
