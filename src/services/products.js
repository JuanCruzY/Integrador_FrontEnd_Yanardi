import Swal from "sweetalert2";
import { productoActivo } from "../../main";
import { handleGetProductLocalStorage, setInLocalStorage } from "../persistence/localStorage";
import { closeModal, openModal } from "../views/modal";
import { handleGetProductsToStore, handleRenderList } from "../views/store";


//Guardar o modificar elementos

/* =====Product===== */

//Guardamos
const acceptButton = document.getElementById("acceptButton");
acceptButton.addEventListener("click", () => {
  handleSaveOrModifyElements();
});

//Función de Guardar
const handleSaveOrModifyElements = () => {
  const nombre = document.getElementById("nombre").value;
  const imagen = document.getElementById("img").value;
  const precio = document.getElementById("precio").value;
  const categoria = document.getElementById("categoria").value;

  let object = null;
  if(productoActivo){
    object = {
    ...productoActivo,
    nombre,
    imagen,
    precio,
    categoria,
    };
  }else {
    object = {
      id: new Date().toISOString(),
      nombre,
      imagen,
      precio,
      categoria,
    };
  };

  Swal.fire({
    title: "Correcto!",
    text: "Producto guardado correctamente!",
    icon: "success"
  });

  setInLocalStorage(object);
  handleGetProductsToStore();
  closeModal();
};

//Eliminar elemento

export const handleDeleteProduct = () => {

    Swal.fire({
        title: "¿Desea eliminar elemento?",
        text: "Si lo eliminas será permanentemente!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, eliminar!"
      }).then((result) => {
        if (result.isConfirmed) {
            const products = handleGetProductLocalStorage();
            const result = products.filter((el) => el.id !== productoActivo.id);
            //Setear el nuevo array
            localStorage.setItem("products", JSON.stringify(result));
            const newProducts = handleGetProductLocalStorage();
            handleRenderList(newProducts);
            closeModal();

          Swal.fire({
            title: "Eliminado!",
            text: "Tu elemento ha sido eliminado.",
            icon: "success"
          });
        } else{
            closeModal();
        }
      });
};