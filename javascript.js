// mostrar productos

const products_container = document.querySelector('#products_container');

for (let i = 0; i < productos.length; i++){

    const product_card = document.createElement('div')
    product_card.setAttribute('class', 'product_card_style')
    
    product_card.innerHTML = `
    
    <div>${productos[i].categoria}</div>
    <img class="image_display" src="${productos[i].image}" alt="${productos[i].nombre}">
    <div>${productos[i].nombre}</div>
    <div>${productos[i].precio}</div>
    <button id="${productos[i].id}" class="agregar_carrito">Agregar al carrito</button>
    
    `

    products_container.appendChild(product_card);
}



// agregar productos al carrito

let cart = []
let product_cart = []

const cart_selector = document.querySelectorAll('.agregar_carrito')

cart_selector.forEach(element => {
    element.addEventListener('click', (element) => {
        let myvar = element.target.id;
        cart.push(myvar);
        
        
        let temp_product = productos.filter(productos => productos.id == myvar);
        let condition = product_cart.some(item => item.id == temp_product[0].id)

        if (condition == true) {
            // cambiar el count del campo "unidades"
            for (let i = 0; i < product_cart.length; i++) {
                if (product_cart[i].id == temp_product[0].id) {
                    product_cart[i].unidades ++;
                }
            }

        } else {
            temp_product[0].unidades ++;
            product_cart.push(temp_product[0]);
        }
        

    })
}
)


// carrito_temporal
const carrito_temporal = document.querySelector('#carrito_temporal');

cart_selector.forEach(e => {
    e.addEventListener('click', (e) => {
        
        while (carrito_temporal.firstChild) {
            carrito_temporal.removeChild(carrito_temporal.firstChild)
        };

        product_cart.forEach((element) => {

            const temp_products_list = document.createElement('div')
            temp_products_list.setAttribute('class', 'temp_carrito_style');
        
            temp_products_list.innerHTML = `
            
            <div>Categoría: ${element.categoria}</div>
            <div>Nombre: ${element.nombre}</div>
            <div>Precio: ${element.precio}</div>
            <div>Unidades: ${element.unidades}</div>
            <button id="${element.id}" class="remover_carrito">Remover del carrito</button>
            
            `
            carrito_temporal.appendChild(temp_products_list);
         
        })

        // función para remover productos del carrito temporal
        cart_prod_removal();



    })
}
)


// remover productos del carrito temporal
function cart_prod_removal() {
    const cart_removal = document.querySelectorAll('.remover_carrito');

    cart_removal.forEach(element => {
        element.addEventListener('click', (element) => {
            let myvar = element.target.id;
    
            product_cart = product_cart.filter(product_cart => product_cart.id != myvar);


            // actualizar a cero número de unidades en lista de productos original
            for (let i = 0; i < productos.length; i++) {
                if (productos[i].id == myvar) {
                    productos[i].unidades = 0;
                }
            }

                // refrescar carrito temporal
                while (carrito_temporal.firstChild) {
                    carrito_temporal.removeChild(carrito_temporal.firstChild)
                };

                product_cart.forEach((element) => {

                    const temp_products_list = document.createElement('div')
                    temp_products_list.setAttribute('class', 'temp_carrito_style');
                
                    temp_products_list.innerHTML = `
                    
                    <div>Categoría: ${element.categoria}</div>
                    <div>Nombre: ${element.nombre}</div>
                    <div>Precio: ${element.precio}</div>
                    <div>Unidades: ${element.unidades}</div>
                    <button id="${element.id}" class="remover_carrito">Remover del carrito</button>
                    
                    `
                    carrito_temporal.appendChild(temp_products_list);
                
                })
                
                cart_prod_removal();


    
        })
    }
    )

}



// finalizar compra
function carrito_final() {
    const carrito_storage = []

    // saludo cliente
    const nombre = document.getElementById('name').value
    const email = document.getElementById('email').value
    saludo.innerHTML = `
    <div class="saludo_style">Muchas gracias por su compra ${nombre}. Su factura será enviada a su email: ${email}. El detalle de su compra más abajo:</div>
    
    `
    // agrego el resúmen del carrito en el html
    const resumen_carrito = document.querySelector('#resumen_carrito');

    while (resumen_carrito.firstChild) {
        resumen_carrito.removeChild(resumen_carrito.firstChild)
    };

    product_cart.forEach((element) => {

        let temp_precio_total = element.precio*element.unidades

        const products_list = document.createElement('div');
        products_list.setAttribute('class', 'resumen_carrito_style');
    
        products_list.innerHTML = `
        
        <div>Categoría: ${element.categoria}</div>
        <div>Nombre: ${element.nombre}</div>
        <div>Unidades: ${element.unidades}</div>
        <div>Precio: ${element.precio}</div>
        <div>Precio total: ${temp_precio_total}</div>
        
        
        `
        resumen_carrito.appendChild(products_list);
  
        let temp_storage = {cliente: nombre, email: email, categoria: element.categoria, nombre: element.nombre, precio: element.precio, unidades: element.unidades, precio_total: temp_precio_total}
        carrito_storage.push(temp_storage)
        
    })
 
    // agregar carrito y datos cliente al local storage
    localStorage.setItem("carrito_storage", JSON.stringify(carrito_storage))

    // vaciar carrito_temporal
    while (carrito_temporal.firstChild) {
        carrito_temporal.removeChild(carrito_temporal.firstChild)
    };
    
}

confirmar_compra.onclick = carrito_final
