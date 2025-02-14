// SELECTORES
const cardsCategoria = document.querySelector("#cardsCategorias");

const filtrarCategorias =
    "https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood";
const filtrarPaises =
    "https://www.themealdb.com/api/json/v1/1/filter.php?a=Canadian";

const detallesReceta =
    "https://www.themealdb.com/api/json/v1/1/lookup.php?i=52772";

app();

function app() {
    document.addEventListener("DOMContentLoaded", consultasInicio);
}

function consultasInicio() {
    const apiPaises = "https://www.themealdb.com/api/json/v1/1/list.php?a=list";
    const apiCategorias =
        "https://www.themealdb.com/api/json/v1/1/categories.php";

    // Consultar paises
    fetch(apiPaises)
        .then((respuesta) => respuesta.json())
        .then((datos) => {
            // console.log(datos.meals);
        });

    // Consultar categorias
    fetch(apiCategorias)
        .then((respuesta) => respuesta.json())
        .then((datos) => {
            datos.categories.forEach((categoria) => {
                // Destructuring
                const { strCategory, strCategoryThumb } = categoria;

                console.log(strCategory);
                console.log(strCategoryThumb);

                // Scripting
                // const divCard = document.createElement("div");
                // divCard.textContent = datos.categories[0].strCategory;

                // cardsCategoria.appendChild(divCard);
            });
        });
}
