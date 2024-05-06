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

const cart = []

const cart_selector = document.querySelectorAll('.agregar_carrito')

cart_selector.forEach(element => {
    element.addEventListener('click', (element) => {
        let myvar = element.target.id;
        cart.push(myvar);
    })
}
)





// finalizar compra

const carrito_storage = []

function carrito_final() {

    // saludo cliente
    const nombre = document.getElementById('name').value
    const email = document.getElementById('email').value
    saludo.innerHTML = `
    <div class="saludo_style">Muchas gracias por su compra ${nombre}. Su factura será enviada a su email: ${email}. El detalle de su compra más abajo:</div>
    
    `
    // agrego el resúmen del carrito en el html
    const resumen_carrito = document.querySelector('#resumen_carrito');

    for (let i = 0; i < productos.length; i++){

        let temp_count = cart.filter(cart_filter)
        function cart_filter(item) {
            return item == i+1;
          }

        temp_count = temp_count.length

        if (temp_count > 0) {
            
            let temp_product = productos.filter(productos => productos.id == i+1)

            let temp_price = temp_count * temp_product[0].precio

            const products_list = document.createElement('div')
            products_list.setAttribute('class', 'resumen_carrito_style');
    
            products_list.innerHTML = `
            
            <div>Categoría: ${temp_product[0].categoria}</div>
            <div>Nombre: ${temp_product[0].nombre}</div>
            <div>Precio: ${temp_product[0].precio}</div>
            <div>Unidades: ${temp_count}</div>
            <div>Precio Total: ${temp_price}</div>
            
            `
            resumen_carrito.appendChild(products_list);

            let temp_storage = {cliente: nombre, email: email, categoria: temp_product[0].categoria, nombre: temp_product[0].nombre, precio: temp_product[0].precio, unidades: temp_count, precio_total: temp_price}
            carrito_storage.push(temp_storage)
        }

    }

    // agregar carrito y datos cliente al local storage
    localStorage.setItem("carrito_storage", JSON.stringify(carrito_storage))
}

confirmar_compra.onclick = carrito_final
