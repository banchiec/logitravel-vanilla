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
  // Contenedor principal
  const container = document.createElement("div");
  container.className = "logitravel-options-title";

  // Título y descripción
  const title = document.createElement("h1");
  title.className = "logitravel-options-title";
  title.textContent = LIST_ITEM.title;

  const description = document.createElement("p");
  description.textContent = LIST_ITEM.description;

  console.log(items)

  // Contenedor para la lista
  const listContainer = document.createElement("div");
  // Renderiza la lista (deberías hacer que ListItem reciba los props correctos)
  listContainer.appendChild(ListItem({ items, selectedItems, handleToggleSelected }));

  // Contenedor botones
  const buttonsDiv = document.createElement("div");
  buttonsDiv.className = "logitravel-options-buttons";

  // Botones de undo y delete en un div
  const buttonsGroup = document.createElement("div");

  // Botón Undo
  const undoButton = Button({
    id: "undoButton",
    className: "btn icon",
    children: "↺",
    onClick: () => handleUndo(),
  });

  // Botón Delete
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

  // Botón Add
  const addButton = Button({
    id: "addButton",
    className: "btn solid",
    children: ACTIONS.add,
    onClick: () => handleOpenModal(),
  });

  buttonsDiv.appendChild(buttonsGroup);
  buttonsDiv.appendChild(addButton);

  // Agregar todo al contenedor principal
  container.appendChild(title);
  container.appendChild(description);
  container.appendChild(listContainer);
  container.appendChild(buttonsDiv);

  // Función para alternar selección de items
  function handleToggleSelected(item) {
    if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter(i => i !== item));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
    // Deberías volver a renderizar la lista o actualizar el UI para reflejar la selección
  }

  return container;
};
