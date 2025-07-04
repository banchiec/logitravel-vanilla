export const List = ({ items = [], selectedItems = [], handleToggleSelected }) => {
  const ul = document.createElement("ul");
  ul.id = "textList";
  ul.className = "list";

  items.forEach((item, index) => {
    const li = document.createElement("li");
    li.textContent = item;
    li.className = "logitravel__list-item";
    if (selectedItems.includes(item)) {
      li.classList.add("selected");
    }

    li.addEventListener("click", () => {
      handleToggleSelected(item);
    });

    ul.appendChild(li);
  });

  return ul;
};
