class Producto {
    constructor(id, nombre, precio, img) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.img = img;
        this.cantidad = 1;
        
    }
}

const SandwichCaliente = new Producto(1, "Sandwich Caliente", 1000, "../img/menu/compartir/promo-sandwich.jpg");
const SuperBrunch = new Producto(2, "Súper brunch con bebidas frías", 2500, "../img/menu/compartir/super-branch-bf.jpg");
const SuperBrunch2 = new Producto(3, "Super brunch con bebidas calientes", 2500, "../img/menu/compartir/super-branch.jpg");
const Americano = new Producto(4, "Promo 1 (Americano)", 1650, "../img/menu/promos-cal/promo1.jpg");
const Clásica = new Producto(5, "Promo 2 (Clásica)", 2000, "../img/menu/promos-cal/promo2.jpg");
const Fríos = new Producto(6, "Promo 1. Fríos", 1620, "../img/menu/promos-fr/promo2.jpg");
const Fríos1 = new Producto(7, "Promo 2. Fríos", 1800, "../img/menu/promos-fr/promo3.jpg");
const Fríos2 = new Producto(8, "Promo 3. Fríos", 1760, "../img/menu/promos-fr/promo4.jpg");
const cabsha = new Producto(9, "CABSHA", 1490, "../img/menu/pasteleria/cabsha.jpg");
const Cheescake = new Producto(10, "Cheescake", 3000, "../img/menu/pasteleria/cheescake.jpg");
const SelvaNegra = new Producto(12, "Selva Negra", 2900, "../img/menu/pasteleria/selva-negra.jpg");
const Tiramisu = new Producto(13, "Tiramisu", 3500, "../img/menu/pasteleria/tiramisu.jpg");
const SandwichCasero = new Producto(14, "Sandwich casero", 1000, "../img/menu/salados/sandw-casero.jpg");
const SandwichPrimavera = new Producto(15, "Sandwich Primavera", 1340, "../img/menu/salados/sandw-primavera.jpg");
const Tostado = new Producto(16, "Tostado", 900, "../img/menu/salados/tostado.jpg");
const MedialunaRellena = new Producto(17, "Medialuna rellena", 300, "../img/menu/antojos/medialuna-rellena.jpg");
const Waffle = new Producto(18, "Waffle", 700, "../img/menu/antojos/waffle.jpg");
const CafeGrande = new Producto(19, "Cafe grande", 200, "../img/menu/cafeteria/cafe.jpg");
const Capuchino = new Producto(20, "Capuchino", 300, "../img/menu/cafeteria/capuchino.jpg");
const SinTacc = new Producto(21, "Torta a elección", 900, "../img/menu/sin-tacc/tortas.jpg");




const productos = [SandwichCaliente, SuperBrunch,SuperBrunch2, Americano, Clásica, Fríos, Fríos1, Fríos2,cabsha, Cheescake, SelvaNegra, Tiramisu, SandwichCasero, SandwichCasero, Tostado, MedialunaRellena, Waffle, CafeGrande, Capuchino, SinTacc];

let carrito = [];

if(localStorage.getItem("carrito")){
    carrito = JSON.parse(localStorage.getItem("carrito"));
}

const contenedorProductos = document.getElementById("contenedorProductos");

const mostrarProductos = () => {
    productos.forEach( producto => {
        const card = document.createElement("div");
        card.classList.add("col-xl-3", "col-md-6", "col-xs-12");
        card.innerHTML = `
                <div class="card">
                <img src="${producto.img}" class="card-img-top" alt="Promo sandwich">
                <div class="card-body            card__espaciado">
                  <p class="card-title text-center">${producto.nombre}</p>
                  <p class="card-text text-center precio">${producto.precio}</p>
                  <button class="btn btn-primary card__boton" id="boton${producto.id}" > Agregar al Carrito </button>
                </div>
                        `
        contenedorProductos.appendChild(card);

        //Agregar productos al carrito: 
        const boton = document.getElementById(`boton${producto.id}`);
        boton.addEventListener("click", () => {
            agregarAlCarrito(producto.id);
        })
    })
}

mostrarProductos();

const agregarAlCarrito = (id) => {
    const productoEnCarrito = carrito.find(producto => producto.id === id);
    if(productoEnCarrito) {
        productoEnCarrito.cantidad++; 
    } else {
        const producto = productos.find(producto => producto.id === id);
        carrito.push(producto);
    }
    //Trabajamos con el localStorage: 
    localStorage.setItem("carrito", JSON.stringify(carrito));
    calcularTotal();
}

const contenedorCarrito = document.getElementById("contenedorCarrito");
const verCarrito = document.getElementById("verCarrito")

verCarrito.addEventListener("click", () => {
    mostrarCarrito();
})

const mostrarCarrito = () => {
    contenedorCarrito.innerHTML = "";

    carrito.forEach(producto => {
        const card = document.createElement("div");
        card.classList.add("col-xl-3", "col-md-6", "col-xs-12");
        card.innerHTML = `
                <div class="card">
                    <img src="${producto.img}" class="card-img-top imgProductos" alt="${producto.nombre}">
                    <div class= "card-body">
                        <h5>${producto.nombre}</h5>
                        <p> ${producto.precio} </p>
                        <p> ${producto.cantidad} </p>
                        <button class="btn colorBoton" id="eliminar${producto.id}" > Eliminar Producto </button>
                    </div>
                </div>
                        `
        contenedorCarrito.appendChild(card);

        //Eliminar productos del carrito: 
        const boton = document.getElementById(`eliminar${producto.id}`);
        boton.addEventListener("click", () => {
            eliminarDelCarrito(producto.id);
        })

    })
    calcularTotal();
}

const eliminarDelCarrito = (id) => {
    const producto = carrito.find(producto => producto.id === id);
    const indice = carrito.indexOf(producto);
    carrito.splice(indice, 1);
    mostrarCarrito();

    //Trabajamos con el localStorage: 
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

const vaciarCarrito = document.getElementById("vaciarCarrito");

vaciarCarrito.addEventListener("click", () => {
    eliminarTodoElCarrito();
})

const eliminarTodoElCarrito = () => {
    carrito = [];
    mostrarCarrito();

    //LocalStorage:
    localStorage.clear();
}

const total = document.getElementById("total");

const calcularTotal = () => {
    let totalCompra = 0;
    carrito.forEach(producto => {
        totalCompra += producto.precio * producto.cantidad;
        //+= es igual a poner totalCompra = totalCompra + producto.precio * producto.cantidad
    })
    total.innerHTML = `Total: $${totalCompra}`;
}

