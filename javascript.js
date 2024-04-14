// cliente
let cliente = prompt("Bienvenido, ¿cuál es su nombre?");
console.log(cliente);
document.getElementById("cliente").innerHTML = `Nos complace su que nos haya elegido ${cliente}.`;


// agregar productos al carrito

const producto_1 = []
let producto_1_count = 0

function myfunction_plus_item_1 () { 
    let myvar = document.getElementById("plus-button-item-1").value;
    producto_1.push(myvar);
    producto_1_count = producto_1.length;
    document.getElementById("count-item-1").innerHTML = producto_1_count;
    console.log(producto_1);
    console.log(producto_1_count);
}

function myfunction_minus_item_1 () { 
    let myvar = document.getElementById("minus-button-item-1").value;
    producto_1.pop(myvar);
    producto_1_count = producto_1.length;
    document.getElementById("count-item-1").innerHTML = producto_1_count;
    console.log(producto_1);
    console.log(producto_1_count);
}

console.log()

const producto_2 = []
let producto_2_count = 0

function myfunction_plus_item_2 () { 
    let myvar = document.getElementById("plus-button-item-2").value;
    producto_2.push(myvar);
    producto_2_count = producto_2.length;
    document.getElementById("count-item-2").innerHTML = producto_2_count;
    console.log(producto_2);}

function myfunction_minus_item_2 () { 
    let myvar = document.getElementById("minus-button-item-2").value;
    producto_2.pop(myvar);
    producto_2_count = producto_2.length;
    document.getElementById("count-item-2").innerHTML = producto_2_count;
    console.log(producto_2);}


const producto_3 = []
let producto_3_count = 0

function myfunction_plus_item_3 () { 
    let myvar = document.getElementById("plus-button-item-3").value;
    producto_3.push(myvar);
    producto_3_count = producto_3.length;
    document.getElementById("count-item-3").innerHTML = producto_3_count;
    console.log(producto_3);}

function myfunction_minus_item_3 () { 
    let myvar = document.getElementById("minus-button-item-3").value;
    producto_3.pop(myvar);
    producto_3_count = producto_3.length;
    document.getElementById("count-item-3").innerHTML = producto_3_count;
    console.log(producto_3);}

// carrito

function myfunction_cart() {

    let confirma = confirm("Confirma finalización de la compra?");
    console.log(confirma);
    if (confirma == true) {
        alert("Gracias por su compra, su resúmen más abajo.");
        const cart = [{Producto:"Buzo", Cantidad: producto_1_count, Precio: producto_1_count*30000},{Producto:"Remera", Cantidad: producto_2_count, Precio: producto_2_count*15000}, {Producto:"Pantalón", Cantidad: producto_3_count, Precio: producto_3_count*25000}]
        
        for (let i = 0; i < cart.length; i++){
            console.log(cart[i].Producto, cart[i].Cantidad, cart[i].Precio)
            document.getElementById(`resumen-carriro-${i}`).innerHTML = `Producto: ${cart[i].Producto}, Unidades: ${cart[i].Cantidad}, Precio total: ${cart[i].Precio}`;
        }
    }
    else {
        alert("Puede seguir comprando :)")
    } 

}