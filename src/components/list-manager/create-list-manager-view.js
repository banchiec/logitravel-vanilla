import { ACTIONS, LIST_ITEM } from "../../constants/index.js";
import { Button } from "../button.js";
import { List } from "../list.js";
import './list-manager.css';

export function createListManagerView({
  items,
  selectedItems,
  onToggleSelected,
  onDelete,
  onUndo,
  onAdd,
}) {
  const container = document.createElement("div");
  container.className = "logitravel-options";

  const title = document.createElement("h1");
  title.className = "logitravel-options-title";
  title.textContent = LIST_ITEM.title;

  const description = document.createElement("p");
  description.className = "logitravel-options-description";
  description.textContent = LIST_ITEM.description;

  const listContainer = document.createElement("div");
  listContainer.className = "logitravel-options-list";
  listContainer.appendChild(
    List({
      items,
      selectedItems,
      handleToggleSelected: onToggleSelected,
    })
  );

  const buttonsWrapper = document.createElement("div");
  buttonsWrapper.className = "logitravel-options-buttons";

  const buttonsGroup = document.createElement("div");
  buttonsGroup.className = "logitravel-options-buttons-group";

  const undoButton = Button({
    id: "undoButton",
    className: "icon",
    children: "↺",
    onClick: onUndo,
  });

  const deleteButton = Button({
    id: "deleteButton",
    className: "outline",
    children: ACTIONS.delete,
    onClick: () => {
      if (selectedItems.length > 0) {
        onDelete();
      }
    },
  });

  const addButton = Button({
    id: "addButton",
    className: "solid",
    children: ACTIONS.add,
    onClick: onAdd,
  });

  buttonsGroup.appendChild(undoButton);
  buttonsGroup.appendChild(deleteButton);

  buttonsWrapper.appendChild(buttonsGroup);
  buttonsWrapper.appendChild(addButton);

  container.appendChild(title);
  container.appendChild(description);
  container.appendChild(listContainer);
  container.appendChild(buttonsWrapper);

  return container;
}
