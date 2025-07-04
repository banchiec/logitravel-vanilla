import { createListManagerView } from '../../components/list-manager/create-list-manager-view.js';
import { openModal } from '../../components/modal/modal-controller.js';
import useListManager from '../../hooks/useListManager.js';

export default function ListManagerView() {
  let selectedItems = [];
  const container = document.createElement('div');

  let listManager;
  const render = () => {
    container.innerHTML = '';

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
  };

  listManager = useListManager([], render);
  render();

  return container;
}
