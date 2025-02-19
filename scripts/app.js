// Objeto con las banderas y su url
import banderas from "../banderas.js";

app();
function app() {
    document.addEventListener("DOMContentLoaded", consultaInicio);
}

function consultaInicio() {
    const paises = "https://www.themealdb.com/api/json/v1/1/list.php?a=list";
    const categorias = "https://www.themealdb.com/api/json/v1/1/categories.php";

    // Consultar paises
    fetch(paises)
        .then((respuesta) => respuesta.json())
        .then((datos) => {
            const cardsPaises = document.querySelector("#cardsPaises");

            datos.meals.forEach((pais) => {
                const { strArea } = pais;

                const divCardPais = document.createElement("div");
                divCardPais.classList.add("card-pais");
                divCardPais.onclick = () => {
                    aplicarFiltro(strArea, "pais");
                };
                // Crear el contenedor de la imagen
                const divImagen = document.createElement("div");
                divImagen.classList.add("card-imagen");

                const imgPais = document.createElement("img");
                imgPais.src = banderas[strArea];

                // Crear el contenedor del contenido
                const divContenido = document.createElement("div");
                divContenido.classList.add("card-contenido");

                const nombrePais = document.createElement("p");
                nombrePais.textContent = strArea;

                // Estructura correcta
                divImagen.appendChild(imgPais);
                divContenido.appendChild(nombrePais);
                divCardPais.appendChild(divImagen);
                divCardPais.appendChild(divContenido);
                cardsPaises.appendChild(divCardPais);
            });
        });

    // Consultar categorias
    fetch(categorias)
        .then((respuesta) => respuesta.json())
        .then((datos) => {
            const cardsCategorias = document.querySelector("#cardsCategorias");

            datos.categories.forEach((categoria) => {
                const { strCategory, strCategoryThumb } = categoria;

                const divCardResultado = document.createElement("div");
                divCardResultado.classList.add("card-categoria");
                divCardResultado.onclick = () => {
                    aplicarFiltro(strCategory, "categoria");
                };

                // Crear el contenedor de la imagen
                const divImagen = document.createElement("div");
                divImagen.classList.add("card-imagen");

                const imgResultado = document.createElement("img");
                imgResultado.src = strCategoryThumb;

                // Crear el contenedor del contenido
                const divContenido = document.createElement("div");
                divContenido.classList.add("card-contenido");

                const nombreCategoria = document.createElement("p");
                nombreCategoria.textContent = strCategory;

                // Estructura correcta
                divImagen.appendChild(imgResultado);
                divContenido.appendChild(nombreCategoria);
                divCardResultado.appendChild(divImagen);
                divCardResultado.appendChild(divContenido);
                cardsCategorias.appendChild(divCardResultado);
            });
        });
}

function aplicarFiltro(nombre, tipo) {
    if (tipo === "pais") {
        const filtroPais = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${nombre}`;
        fetch(filtroPais)
            .then((respuesta) => respuesta.json())
            .then((datos) => {
                generarCardsResultado(datos);
            });
        return;
    }

    if (tipo === "categoria") {
        const filtroCategoria = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${nombre}`;
        fetch(filtroCategoria)
            .then((respuesta) => respuesta.json())
            .then((datos) => {
                generarCardsResultado(datos);
            });
        return;
    }
}

function generarCardsResultado(datos) {
    const cardsResultado = document.querySelector("#cardsResultados");

    limpiarHTML(cardsResultado);

    datos.meals.forEach((resultado) => {
        const { idMeal, strMeal, strMealThumb } = resultado;

        const divCardResultado = document.createElement("div");
        divCardResultado.classList.add("card-resultado");
        divCardResultado.onclick = () => {
            generarDetalles(idMeal);
        };

        // Crear el contenedor de la imagen
        const divImagen = document.createElement("div");
        divImagen.classList.add("card-imagen");

        // Mostrar la imagen
        const imgResultado = document.createElement("img");
        imgResultado.src = strMealThumb;

        // Crear el contenedor del contenido
        const divContenido = document.createElement("div");
        divContenido.classList.add("card-contenido");

        // Mostrar el nombre de la receta
        const nombreCategoria = document.createElement("p");
        nombreCategoria.textContent = strMeal;

        divImagen.appendChild(imgResultado);
        divContenido.appendChild(nombreCategoria);
        divCardResultado.appendChild(divImagen);
        divCardResultado.appendChild(divContenido);
        cardsResultado.appendChild(divCardResultado);
    });
}

function generarDetalles(id) {
    const detalles = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;

    fetch(detalles)
        .then((respuesta) => respuesta.json())
        .then((datos) => {
            console.log(datos.meals[0].idMeal);
        });
}

// Cuando se manda a llamar, se recomienda tener en una variable el selector
function limpiarHTML(selector) {
    while (selector.firstChild) {
        selector.removeChild(selector.firstChild);
    }
}
