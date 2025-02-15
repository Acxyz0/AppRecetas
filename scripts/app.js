// Objeto con las banderas y su url
import banderas from "../banderas.js";

// SELECTORES

const filtrarCategorias =
    "https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood";
const filtrarPaises =
    "https://www.themealdb.com/api/json/v1/1/filter.php?a=Canadian";

const detallesReceta =
    "https://www.themealdb.com/api/json/v1/1/lookup.php?i=52772";

app();

function app() {
    document.addEventListener("DOMContentLoaded", consultaInicio);
}

function consultaInicio() {
    const apiPaises = "https://www.themealdb.com/api/json/v1/1/list.php?a=list";
    const apiCategorias =
        "https://www.themealdb.com/api/json/v1/1/categories.php";

    // Consultar paises
    fetch(apiPaises)
        .then((respuesta) => respuesta.json())
        .then((datos) => {
            const cardsPaises = document.querySelector("#cardsPaises");

            datos.meals.forEach((pais) => {
                const { strArea } = pais;

                const divCardPais = document.createElement("div");
                divCardPais.classList.add("card-pais");

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
    fetch(apiCategorias)
        .then((respuesta) => respuesta.json())
        .then((datos) => {
            const cardsCategorias = document.querySelector("#cardsCategorias");

            datos.categories.forEach((categoria) => {
                const { strCategory, strCategoryThumb } = categoria;

                const divCardCategoria = document.createElement("div");
                divCardCategoria.classList.add("card-categoria");

                // Crear el contenedor de la imagen
                const divImagen = document.createElement("div");
                divImagen.classList.add("card-imagen");

                const imgCategoria = document.createElement("img");
                imgCategoria.src = strCategoryThumb;

                // Crear el contenedor del contenido
                const divContenido = document.createElement("div");
                divContenido.classList.add("card-contenido");

                const nombreCategoria = document.createElement("p");
                nombreCategoria.textContent = strCategory;

                // Estructura correcta
                divImagen.appendChild(imgCategoria);
                divContenido.appendChild(nombreCategoria);
                divCardCategoria.appendChild(divImagen);
                divCardCategoria.appendChild(divContenido);
                cardsCategorias.appendChild(divCardCategoria);
            });
        });
}
