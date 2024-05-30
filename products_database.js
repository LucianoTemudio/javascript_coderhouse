// clase producto
class producto {

    constructor (id, categoria, nombre, precio, image, unidades) {
        this.id = id
        this.categoria = categoria
        this.nombre = nombre
        this.precio = parseFloat(precio)
        this.image = image
        this.unidades = unidades

    }

}


// array de productos 
const productos = [
    new producto('1', 'Indumentaria', 'Remera', '15000', 'assets/remera.png', 0),
    new producto('2', 'Indumentaria', 'Buzo', '30000', 'assets/buzo.png', 0),
    new producto('3', 'Indumentaria', 'Pantalón', '25000', 'assets/pantalon.png', 0),
    new producto('4', 'Electrodomésticos', 'Heladera', '150000', 'assets/heladera.png', 0),
    new producto('5', 'Electrodomésticos', 'Lavarropas', '100000', 'assets/lavarropas.png', 0),
    new producto('6', 'Electrodomésticos', 'Secarropas', '50000', 'assets/secarropas.png', 0)
]

// información de productos desde el archivo json
const dir = "products_database.json"

fetch(dir)
.then(response => response.json())
.then(data => agregar_productos(data))

// consolidar los productos del archivo json con la lista original de productos
function agregar_productos(productos_json) {
    productos_json.forEach(item => {
        productos.push(new producto(item.id, item.categoria,item.nombre,item.precio,item.image, item.unidades))
    });
    filtro_categorias();
    DOM_update();
    
}
