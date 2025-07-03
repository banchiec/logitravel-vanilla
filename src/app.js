import ListManagerView from "./views/list-manager-view/list-manager-view.js";

export function App() {
  const main = document.createElement('main');
  main.appendChild(ListManagerView());
  return main;
}
