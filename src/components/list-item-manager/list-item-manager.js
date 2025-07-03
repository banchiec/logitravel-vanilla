import { ACTIONS, LIST_ITEM } from "../../constants/index.js";
import { Button } from "../button.js";
import { ListItem } from "../listItem.js";
import './list-item-manager.css'

export const ListItemManager = ({
  handleOpenModal,
  items,
  onDelete,
  handleUndo,
  setSelectedItems,
  selectedItems,
}) => {
  const container = document.createElement("div");
  container.className = "logitravel-options-title";

  const title = document.createElement("h1");
  title.className = "logitravel-options-title";
  title.textContent = LIST_ITEM.title;

  const description = document.createElement("p");
  description.textContent = LIST_ITEM.description;

  console.log(items)

  const listContainer = document.createElement("div");
  listContainer.appendChild(ListItem({ items, selectedItems, handleToggleSelected }));

  const buttonsDiv = document.createElement("div");
  buttonsDiv.className = "logitravel-options-buttons";

  const buttonsGroup = document.createElement("div");

  const undoButton = Button({
    id: "undoButton",
    className: "btn icon",
    children: "↺",
    onClick: () => handleUndo(),
  });

  const deleteButton = Button({
    id: "deleteButton",
    className: "btn outline",
    children: ACTIONS.delete,
    onClick: () => {
      if (selectedItems.length > 0) {
        onDelete();
        setSelectedItems([]);
      }
    },
  });

  buttonsGroup.appendChild(undoButton);
  buttonsGroup.appendChild(deleteButton);

  const addButton = Button({
    id: "addButton",
    className: "btn solid",
    children: ACTIONS.add,
    onClick: () => handleOpenModal(),
  });

  buttonsDiv.appendChild(buttonsGroup);
  buttonsDiv.appendChild(addButton);

  container.appendChild(title);
  container.appendChild(description);
  container.appendChild(listContainer);
  container.appendChild(buttonsDiv);

  function handleToggleSelected(item) {
    if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter(i => i !== item));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  }

  return container;
};
