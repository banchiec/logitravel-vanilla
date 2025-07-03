import { ACTIONS, MODAL } from '../../constants';
import './modal.css' 

export const Modal = ({ handleClose, addItem }) => {
  let inputValue = "";

  const container = document.createElement("div");
  container.className = "logitravel__modal-backdrop";
  container.setAttribute("role", "dialog");
  container.setAttribute("aria-modal", "true");

  container.innerHTML = `
    <div class="logitravel__modal">
      <h2 class="logitravel__title">${ACTIONS.add_items}</h2>
      <form class="logitravel__modal-form">
        <input
          type="text"
          class="logitravel__modal-input"
          placeholder="${MODAL.placeholder}"
          value=""
        />
        <div class="logitravel__buttons logitravel__modal-buttons">
          <button type="submit" class="btn solid">${ACTIONS.add}</button>
          <button type="button" class="btn outline">${ACTIONS.cancel}</button>
        </div>
      </form>
    </div>
  `;

  const form = container.querySelector("form");
  const input = container.querySelector("input");
  const cancelButton = container.querySelector("button[type='button']");

  input.addEventListener("input", e => {
    inputValue = e.target.value;
  });

  form.addEventListener("submit", e => {
    e.preventDefault();
    const trimmed = inputValue.trim();
    if (trimmed) {
      addItem(trimmed);
      input.value="";
      inputValue="";
      handleClose();
    }
  });

  cancelButton.addEventListener("click", () => {
    handleClose();
  });

  return container;
};
