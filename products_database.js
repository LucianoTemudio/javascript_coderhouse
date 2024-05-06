// clase producto
class producto {

    constructor (id, categoria, nombre, precio, image) {
        this.id = id
        this.categoria = categoria
        this.nombre = nombre
        this.precio = parseFloat(precio)
        this.image = image

    }

}


// Productos - Indumentaria
const producto1 = new producto('1', 'Indumentaria', 'Remera', '15000', 'assets/remera.jpg')
const producto2 = new producto('2', 'Indumentaria', 'Buzo', '30000', 'assets/buzo.jpg')
const producto3 = new producto('3', 'Indumentaria', 'Pantalón', '25000', 'assets/pantalon.jpg')


// Productos - Electrodomésticos
const producto4 = new producto('4', 'Electrodomésticos', 'Heladera', '150000', 'assets/heladera.jpg')
const producto5 = new producto('5', 'Electrodomésticos', 'Lavarropas', '100000', 'assets/lavarropas.jpg')
const producto6 = new producto('6', 'Electrodomésticos', 'Secarropas', '50000', 'assets/secarropas.jpg')


// array de productos
const productos = [producto1, producto2, producto3, producto4, producto5, producto6]


