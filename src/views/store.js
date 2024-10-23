/* =====STORE===== */

import { setProductoActivo } from "../../main";
import { handleGetProductLocalStorage } from "../persistence/localStorage";
import { openModal } from "./modal";



//Función que se encarga de traer los elementos y llamr al render.
export const handleGetProductsToStore = () => {
    const products = handleGetProductLocalStorage();
    handleRenderList(products);
}

//Se encarga de filtrar y renderizar la sección con todos sus
//respectivos elementos
export const handleRenderList = (productosIn) => {

    //Filtrado de arrays por categoría.    
    const burgers = productosIn.filter((el) => el.categoria === "Hamburguesas");
    const papas = productosIn.filter((el) => el.categoria === "Papas");
    const gaseosas = productosIn.filter((el) => el.categoria === "Gaseosas");

    //Renderiza los elementos de la sección.
    const renderProductGroup = (productos, title) => {
        if (productos.length > 0){
            const productosHTML = productos.map((producto, index) => {
                return `
                    <div class="containerTargetItem" id="product-${producto.categoria}-${index}">
                        <div>
                            <img src="${producto.imagen}"/>
                        </div>
                        <div>
                            <h2>${producto.nombre}</h2>
                        </div>
                        <div class="targetProps">
                            <p>
                                <b>
                                    Precio:
                                </b>
                                $ ${producto.precio}
                            </p>
                            <p>
                                <b>
                                    Categoria:
                                </b>
                                ${producto.categoria}
                            </p>
                        </div>
                    </div>
                `;
            });

            //Retornar la sección con los elementos dentro
            return `
                <section class="sectionStore">
                    <div class="containerTitleSection">
                        <h3>${title}</h3>
                    </div>
                    <div class="containerProductStore">
                        ${productosHTML.join("")}
                    </div>
                </section>
            `;
        }else {
            return "";
        };
    };

    //Renderizar cada uno de los productos dentro de su categoria.
    const appContainer = document.getElementById("storeContainer");
    appContainer.innerHTML = `
        ${renderProductGroup(burgers, "Hamburguesas")}
        ${renderProductGroup(papas, "Papas")}
        ${renderProductGroup(gaseosas, "Gaseosas")}
    `;

    //Se añaden los eventos de manera dinámica.
    const addEvents = (productsIn) => {
        if (productsIn) {
            productsIn.forEach((element, index) => {
                const productId = `product-${element.categoria}-${index}`;
                const productContainer = document.getElementById(productId);
                productContainer.addEventListener("click", () => {
                    setProductoActivo(element);
                    openModal();
                });
            });
        }
    };
    

    addEvents(burgers);
    addEvents(papas);
    addEvents(gaseosas);
};