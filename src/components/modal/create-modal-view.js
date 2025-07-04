import { ACTIONS, MODAL } from "../../constants";
import { Button } from "../button";
import './modal.css'

export function createModalView({ onSubmit, onCancel }) {
  const container = document.createElement("div");
  container.className = "logitravel__modal-backdrop";

  const dialog = document.createElement("dialog");
  dialog.className = "logitravel__modal";

  const title = document.createElement("h2");
  title.className = "logitravel__title";
  title.textContent = MODAL.add_items;

  const form = document.createElement("form");
  form.className = "logitravel__modal-form";
  form.method = "dialog";

  const input = document.createElement("input");
  input.className = "logitravel__modal-input";
  input.placeholder = MODAL.placeholder;

  const buttonsWrapper = document.createElement("div");
  buttonsWrapper.className = "logitravel__buttons logitravel__modal-buttons";

  const addBtn = Button({
    type: "submit",
    className: "solid",
    children: ACTIONS.add
  });

  const cancelBtn = Button({
    type: "button",
    className: "outline",
    children: ACTIONS.cancel,
    onClick: onCancel
  });

  buttonsWrapper.appendChild(addBtn);
  buttonsWrapper.appendChild(cancelBtn);

  form.appendChild(input);
  form.appendChild(buttonsWrapper);

  dialog.appendChild(title);
  dialog.appendChild(form);

  container.appendChild(dialog);

  let inputValue = "";

  input.addEventListener("input", e => inputValue = e.target.value);
  form.addEventListener("submit", e => {
    e.preventDefault();
    onSubmit?.(inputValue.trim());
  });

  return { container, dialog, input };
}
