import { ACTIONS, MODAL } from '../../constants';
import './modal.css';

export const Modal = ({ handleClose, addItem }) => {
  let inputValue = "";

  // Crear el contenedor principal, que contendrá el <dialog>
  const container = document.createElement("div");
  container.className = "logitravel__modal-backdrop";
  container.setAttribute("role", "presentation"); // porque el dialog tiene el role correcto
  // No necesitamos aria-modal aquí, lo pone el <dialog> al mostrarse

  // Insertar el <dialog> dentro del contenedor
  container.innerHTML = `
    <dialog class="logitravel__modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <h2 id="modal-title" class="logitravel__title">${ACTIONS.add_items}</h2>
      <form class="logitravel__modal-form" method="dialog">
        <input
          type="text"
          class="logitravel__modal-input"
          placeholder="${MODAL.placeholder}"
          value=""
          aria-label="${MODAL.placeholder}"
        />
        <div class="logitravel__buttons logitravel__modal-buttons">
          <button type="submit" class="btn solid">${ACTIONS.add}</button>
          <button type="button" class="btn outline">${ACTIONS.cancel}</button>
        </div>
      </form>
    </dialog>
  `;
  document.body.appendChild(container);

  const dialog = container.querySelector("dialog");
  const form = container.querySelector("form");
  const input = container.querySelector("input");
  const cancelButton = container.querySelector("button[type='button']");

  // Mostrar el dialog como modal
  if (typeof dialog.showModal === "function") {
    dialog.showModal();
  } else {
    // fallback para navegadores sin soporte dialog
    dialog.setAttribute("open", "");
  }

  // Actualizar el valor en inputValue al escribir
  input.addEventListener("input", (e) => {
    inputValue = e.target.value;
  });

  // Enviar el formulario
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const trimmed = inputValue.trim();
    if (trimmed) {
      addItem(trimmed);
      input.value = "";
      inputValue = "";
      closeModal();
    }
  });

  // Cancelar y cerrar modal
  cancelButton.addEventListener("click", () => {
    closeModal();
  });

  // Función para cerrar el modal y limpiar
  function closeModal() {
    if (typeof dialog.close === "function") {
      dialog.close();
    }
    handleClose();
  }

  // Cerrar modal si se hace click fuera del dialog
  container.addEventListener("click", (e) => {
    if (e.target === container) {
      closeModal();
    }
  });

  return container;
};
