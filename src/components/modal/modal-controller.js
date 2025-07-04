import { createModalView } from "./create-modal-view";

export function openModal({ onSubmit, onClose }) {
  const { container, dialog, input } = createModalView({
    onSubmit: (value) => {
      if (value) {
        onSubmit(value);
        close();
      }
    },
    onCancel: close
  });

  function close() {
    dialog.close?.();
    onClose?.();
    container.remove();
  }

  document.body.appendChild(container);
  dialog.showModal?.();
  container.addEventListener("click", (e) => {
    if (e.target === container) close();
  });
}
