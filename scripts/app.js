// Objeto con las banderas y su url
import banderas from "../banderas.js";

const seccionInicio = document.querySelector("#inicio");
const seccionResultado = document.querySelector("#resultados");
const seccionDetalle = document.querySelector("#detalles");

app();
function app() {
    document.addEventListener("DOMContentLoaded", inicio);
}

function inicio() {
    const paises = "https://www.themealdb.com/api/json/v1/1/list.php?a=list";
    const categorias = "https://www.themealdb.com/api/json/v1/1/categories.php";

    // Consultar paises
    fetch(paises)
        .then((respuesta) => respuesta.json())
        .then((datos) => {
            const cardsPaises = document.querySelector("#cardsPaises");

            datos.meals.forEach((pais) => {
                const { strArea } = pais;

                const card = document.createElement("div");
                card.classList.add("card");
                card.onclick = () => {
                    aplicarFiltro(strArea, "pais");
                };
                // Crear el contenedor de la imagen
                const divImagen = document.createElement("div");
                divImagen.classList.add("card-imagen");

                const imagen = document.createElement("img");
                imagen.src = banderas[strArea];

                // Crear el contenedor del contenido
                const contenido = document.createElement("div");
                contenido.classList.add("card-contenido");

                const nombre = document.createElement("p");
                nombre.textContent = strArea;

                // Estructura correcta
                divImagen.appendChild(imagen);
                contenido.appendChild(nombre);
                card.appendChild(divImagen);
                card.appendChild(contenido);
                cardsPaises.appendChild(card);
            });
        });

    // Consultar categorias
    fetch(categorias)
        .then((respuesta) => respuesta.json())
        .then((datos) => {
            const cardsCategorias = document.querySelector("#cardsCategorias");

            datos.categories.forEach((categoria) => {
                const { strCategory, strCategoryThumb } = categoria;

                const card = document.createElement("div");
                card.classList.add("card");
                card.onclick = () => {
                    aplicarFiltro(strCategory, "categoria");
                };

                // Crear el contenedor de la imagen
                const divImagen = document.createElement("div");
                divImagen.classList.add("card-imagen");

                const imagen = document.createElement("img");
                imagen.src = strCategoryThumb;

                // Crear el contenedor del contenido
                const contenido = document.createElement("div");
                contenido.classList.add("card-contenido");

                const nombre = document.createElement("p");
                nombre.textContent = strCategory;

                // Estructura correcta
                divImagen.appendChild(imagen);
                contenido.appendChild(nombre);
                card.appendChild(divImagen);
                card.appendChild(contenido);
                cardsCategorias.appendChild(card);
            });
        });

    ocultarSecciones("inicio");
}

function aplicarFiltro(nombre, tipo) {
    if (tipo === "pais") {
        const filtroPais = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${nombre}`;
        fetch(filtroPais)
            .then((respuesta) => respuesta.json())
            .then((datos) => {
                generarResultados(datos);
            });
        return;
    }

    if (tipo === "categoria") {
        const filtroCategoria = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${nombre}`;
        fetch(filtroCategoria)
            .then((respuesta) => respuesta.json())
            .then((datos) => {
                generarResultados(datos);
            });
        return;
    }
}

function generarResultados(datos) {
    const cardsResultados = document.querySelector("#cardsResultados");
    limpiarHTML(cardsResultados);

    datos.meals.forEach((resultado) => {
        const { idMeal, strMeal, strMealThumb } = resultado;

        const card = document.createElement("div");
        card.classList.add("card");
        card.onclick = () => {
            generarDetalles(idMeal);
        };

        // Contenido de la tarjeta
        const divImagen = document.createElement("div");
        divImagen.classList.add("card-imagen");

        const imagen = document.createElement("img");
        imagen.src = strMealThumb;

        const contenido = document.createElement("div");
        contenido.classList.add("card-contenido");

        const nombre = document.createElement("p");
        nombre.textContent = strMeal;

        divImagen.appendChild(imagen);
        contenido.appendChild(nombre);
        card.appendChild(divImagen);
        card.appendChild(contenido);
        cardsResultados.appendChild(card);
    });

    let botonContainer = document.querySelector("#botonVolverContainer");
    if (!botonContainer) {
        botonContainer = document.createElement("div");
        botonContainer.id = "botonVolverContainer";
        botonContainer.classList.add("boton-container");

        const botonVolver = document.createElement("button");
        botonVolver.textContent = "Volver al inicio";
        botonVolver.className = "boton-volver";
        botonVolver.onclick = () => {
            ocultarSecciones("inicio");
        };

        botonContainer.appendChild(botonVolver);
        cardsResultados.parentNode.appendChild(botonContainer);
    }

    ocultarSecciones("resultado");
}

function generarDetalles(id) {
    const detalles = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;

    fetch(detalles)
        .then((respuesta) => respuesta.json())
        .then((datos) => {
            mostarDetalle(datos.meals[0]);
        });
}

function mostarDetalle(receta) {
    const cardDetalles = document.querySelector("#cardDetalles");
    limpiarHTML(cardDetalles);
    const { idMeal, strInstructions, strMeal, strMealThumb } = receta;

    // Crear contenedor principal con clases
    const card = document.createElement("div");
    card.className = "detalle-card";

    // Crear y estilizar título
    const titulo = document.createElement("h3");
    titulo.textContent = strMeal;
    titulo.className = "detalle-titulo";

    // Crear contenedor para el contenido
    const contenido = document.createElement("div");

    // Crear estructura HTML con clases
    contenido.innerHTML = `
                <div class="detalle-imagen-container">
                    <img class="detalle-imagen" src="${strMealThumb}" alt="receta ${strMeal}">
                </div>
                <h3 class="detalle-subtitulo">Instrucciones</h3>
                <p class="detalle-instrucciones">${strInstructions}</p>
                <h3 class="detalle-subtitulo">Ingredientes y Cantidades</h3>
            `;

    // Crear y estilizar lista de ingredientes
    const listaIngredientes = document.createElement("ul");
    listaIngredientes.className = "ingredientes-lista";

    for (let i = 1; i <= 20; i++) {
        if (receta[`strIngredient${i}`]) {
            const ingrediente = receta[`strIngredient${i}`];
            const cantidad = receta[`strMeasure${i}`];

            const ingredienteLi = document.createElement("li");
            ingredienteLi.className = "ingrediente-item";

            ingredienteLi.innerHTML = `
                        <span class="ingrediente-nombre">${ingrediente}</span> 
                        <span class="ingrediente-cantidad">- ${cantidad}</span>
                    `;

            listaIngredientes.appendChild(ingredienteLi);
        }
    }

    // Añadir botón de volver (opcional)
    const botonVolver = document.createElement("button");
    botonVolver.textContent = "Volver a recetas";
    botonVolver.className = "boton-volver";
    botonVolver.onclick = () => {
        ocultarSecciones("resultado");
    };

    // Agregar elementos al DOM
    card.appendChild(titulo);
    card.appendChild(contenido);
    card.appendChild(listaIngredientes);
    card.appendChild(botonVolver);
    cardDetalles.appendChild(card);

    ocultarSecciones("detalle");
}

function ocultarSecciones(seccion) {
    seccionInicio.style.display = seccion === "inicio" ? "block" : "none";
    seccionResultado.style.display = seccion === "resultado" ? "block" : "none";
    seccionDetalle.style.display = seccion === "detalle" ? "block" : "none";
}

// Cuando se manda a llamar, se recomienda tener en una variable el selector
function limpiarHTML(selector) {
    while (selector.firstChild) {
        selector.removeChild(selector.firstChild);
    }
}
