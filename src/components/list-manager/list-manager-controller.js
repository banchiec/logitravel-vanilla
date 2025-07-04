import { createListManagerView } from "./create-list-manager-view.js";
import { openModal } from "../modal/modal-controller.js";
import useListManager from "../../hooks/useListManager.js";

export function ListManagerController() {
  let selectedItems = [];
  const container = document.createElement("div");

  const listManager = useListManager([], render);

  function render() {
    container.innerHTML = "";

    const listView = createListManagerView({
      items: listManager.getItems(),
      selectedItems,
      onToggleSelected: (item) => {
        selectedItems = selectedItems.includes(item)
          ? selectedItems.filter((i) => i !== item)
          : [...selectedItems, item];
        render();
      },
      onDelete: () => {
        listManager.deleteItems(selectedItems);
        selectedItems = [];
        render();
      },
      onUndo: () => {
        listManager.handleUndo();
        selectedItems = [];
        render();
      },
      onAdd: () => {
        openModal({
          onSubmit: (item) => {
            listManager.addItem(item);
            render();
          },
          onClose: () => render(),
        });
      },
    });

    container.appendChild(listView);
  }

  render();

  return container;
}
