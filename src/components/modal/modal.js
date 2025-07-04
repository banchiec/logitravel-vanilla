import { ACTIONS, MODAL } from '../../constants';
import './modal.css';
import '../../style.css'
import { Button } from '../button';

export const Modal = ({ handleClose, addItem }) => {
  let inputValue = "";

  const container = document.createElement("div");
  container.className = "logitravel__modal-backdrop";
  container.setAttribute("role", "presentation");

  const dialog = document.createElement("dialog");
  dialog.className = "logitravel__modal";
  dialog.setAttribute("role", "dialog");
  dialog.setAttribute("aria-modal", "true");
  dialog.setAttribute("aria-labelledby", "modal-title");

  const title = document.createElement("h2");
  title.id = "modal-title";
  title.className = "logitravel__title";
  title.textContent = ACTIONS.add_items;

  const form = document.createElement("form");
  form.className = "logitravel__modal-form";
  form.setAttribute("method", "dialog");

  const input = document.createElement("input");
  input.type = "text";
  input.className = "logitravel__modal-input";
  input.placeholder = MODAL.placeholder;
  input.setAttribute("aria-label", MODAL.placeholder);

  const buttonsWrapper = document.createElement("div");
  buttonsWrapper.className = "logitravel__buttons logitravel__modal-buttons";

  const addButton = Button({
    type: "submit",
    className: "solid",
    children: ACTIONS.add
  });

  const cancelButton = Button({
    type:  "button",
    className: "outline",
    children: ACTIONS.cancel,
  });

  buttonsWrapper.appendChild(addButton);
  buttonsWrapper.appendChild(cancelButton);
  form.appendChild(input);
  form.appendChild(buttonsWrapper);
  dialog.appendChild(title);
  dialog.appendChild(form);
  container.appendChild(dialog);
  document.body.appendChild(container);

  if (typeof dialog.showModal === "function") {
    dialog.showModal();
  } else {
    dialog.setAttribute("open", "");
  }

  input.addEventListener("input", (e) => {
    inputValue = e.target.value;
  });

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

  cancelButton.addEventListener("click", () => {
    closeModal();
  });

  container.addEventListener("click", (e) => {
    if (e.target === container) {
      closeModal();
    }
  });

  function closeModal() {
    if (typeof dialog.close === "function") {
      dialog.close();
    }
    handleClose();
  }

  return container;
};
