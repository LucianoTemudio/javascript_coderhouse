// mostrar productos
function DOM_update() {
    const products_container = document.querySelector('#products_container');
    for (let i = 0; i < productos.length; i++){
        const product_card = document.createElement('div')
        product_card.setAttribute('class', 'product_card_style')
        
        product_card.innerHTML = `
        
        <div class="prod_categoria">${productos[i].categoria}</div>
        <img class="image_display" src="${productos[i].image}" alt="${productos[i].nombre}">
        <div class="prod_nombre">${productos[i].nombre}</div>
        <div>${productos[i].precio}</div>
        <button id="${productos[i].id}" class="agregar_carrito btn btn-primary">Agregar</button>
        
        `
    
        products_container.appendChild(product_card);
    };
    agregar_carrito();
    filtro_app();
}


// agrega las categorías pertinentes al dropdown
function filtro_categorias() {

    let filtro = document.getElementById('filtro');

    filter_list = ['Todo'];
    for (let i = 0; i < productos.length; i++){
        let temp_categoria = productos[i].categoria
        let validacion = filter_list.some(filter_list => filter_list == temp_categoria)
        if (validacion) {''} else {filter_list.push(temp_categoria)}
    }
    
        for (let i = 0; i < filter_list.length; i++){
            const dropdown_item = document.createElement('li')
            dropdown_item.innerHTML = `
            <a class="dropdown-item filtro_producto_app">${filter_list[i]}</a>
            `
            filtro.appendChild(dropdown_item);
        }

}


// función para filtar por categoría de producto
function filtro_app() {
    filtro_producto_app = document.querySelectorAll('.filtro_producto_app')

    filtro_producto_app.forEach(element => {
        element.addEventListener('click', (element) => {
            let filtro_categoria = element.target.text;
            
            if (filtro_categoria == 'Todo') {
                while (products_container.firstChild) {
                    products_container.removeChild(products_container.firstChild)
                };
                DOM_update();
            } else {
                const filtro_prod = productos.filter(producto => producto.categoria == filtro_categoria);

                while (products_container.firstChild) {
                    products_container.removeChild(products_container.firstChild)
                };
            
                for (let i = 0; i < filtro_prod.length; i++){
                    const product_card = document.createElement('div')
                    product_card.setAttribute('class', 'product_card_style')
                    
                    product_card.innerHTML = `
                    
                    <div class="prod_categoria">${filtro_prod[i].categoria}</div>
                    <img class="image_display" src="${filtro_prod[i].image}" alt="${filtro_prod[i].nombre}">
                    <div class="prod_nombre">${filtro_prod[i].nombre}</div>
                    <div>${filtro_prod[i].precio}</div>
                    <button id="${filtro_prod[i].id}" class="agregar_carrito btn btn-primary">Agregar</button>
                    
                    `
                
                    products_container.appendChild(product_card);
                };
                agregar_carrito();
                filtro_app();

            }
            
        })
    })


}


// agregar productos al carrito
let cart = []
let product_cart = []

function agregar_carrito() {

    const cart_selector = document.querySelectorAll('.agregar_carrito')

    cart_selector.forEach(element => {
        element.addEventListener('click', (element) => {
            let myvar = element.target.id;
            cart.push(myvar);
            
            
            let temp_product = productos.filter(productos => productos.id == myvar);
    
            Swal.fire(`Producto ${temp_product[0].nombre} agregado al carrito!`);
    
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
                <button id="${element.id}" class="btn btn-outline-danger remover_carrito">Remover</button>
                
                `
                carrito_temporal.appendChild(temp_products_list);
             
            })
    
            // función para remover productos del carrito temporal
            cart_prod_removal();
    
    
    
        })
    }
    )

}



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
                    <button id="${element.id}" class="btn btn-outline-danger remover_carrito">Remover</button>
                    
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

    // confirmación
    Swal.fire({
        title: "Finalizar compra?",
        text: "Revisa bien el carrito antes de confirmar!",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Todo ok!"
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Compra confirmada!",
            text: "Nos encantó tenerte por aquí",
            icon: "success"
          });
            
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
      });
    
}

confirmar_compra.onclick = carrito_final
