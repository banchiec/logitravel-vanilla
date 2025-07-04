export const Button = ({ id, type = "button", children, className, onClick }) => {
  const button = document.createElement("button");
  if (id) button.id = id;
  button.type = type;
  if (className) button.className = `btn ${className}`;
  else button.className = 'btn'
  if (typeof onClick === "function") button.addEventListener("click", onClick);

  if (typeof children === "string") {
    button.textContent = children;
  } else if (children instanceof Node) {
    button.appendChild(children);
  } else if (Array.isArray(children)) {
    children.forEach(child => {
      if (typeof child === "string") {
        button.appendChild(document.createTextNode(child));
      } else if (child instanceof Node) {
        button.appendChild(child);
      }
    });
  }

  return button;
};
