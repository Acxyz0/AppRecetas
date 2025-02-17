// Objeto con las banderas y su url
import banderas from "../banderas.js";

// SELECTORES
const detallesReceta =
    "https://www.themealdb.com/api/json/v1/1/lookup.php?i=52772";

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

                const divCardCategoria = document.createElement("div");
                divCardCategoria.classList.add("card-categoria");
                divCardCategoria.onclick = () => {
                    aplicarFiltro(strCategory, "categoria");
                };

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

function aplicarFiltro(nombre, tipo) {
    if (tipo === "pais") {
        const filtroPais = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${nombre}`;
        fetch(filtroPais)
            .then((respuesta) => respuesta.json())
            .then((datos) => {
                console.log(datos);
            });
        return;
    }

    if (tipo === "categoria") {
    }
    const filtroCategoria = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${nombre}`;
    fetch(filtroCategoria)
        .then((respuesta) => respuesta.json())
        .then((datos) => {
            console.log(datos);
        });
    return;
}

// Cuando se manda a llamar, se recomienda tener en una variable el selector
function limpiarHTML(selector) {
    while (selector.firstChild) {
        selector.removeChild(selector.firstChild);
    }
}
