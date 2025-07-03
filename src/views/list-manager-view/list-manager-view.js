import { ListItemManager } from '../../components/list-item-manager/list-item-manager.js';
import { Modal } from '../../components/modal/modal.js';
import useListManager from '../../hooks/useListManager.js';

export default function ListManagerView() {
  let isModalOpen = false;
  let selectedItems = [];

  const container = document.createElement('div');

  const render = () => {
    container.innerHTML = '';

    const listContainer = document.createElement('div');
    listContainer.className = 'logitravel-options';

    const listItemManagerNode = ListItemManager({
      items: listManager.getItems(),
      selectedItems,
      setSelectedItems: (newSelected) => {
        selectedItems = newSelected;
        render();
      },
      onDelete: () => {
        listManager.deleteItems(selectedItems);
        selectedItems = [];
      },
      handleUndo: () => {
        listManager.handleUndo();
        selectedItems = [];
      },
      handleOpenModal: () => {
        isModalOpen = true;
        render();
      },
    });

    listContainer.appendChild(listItemManagerNode);
    container.appendChild(listContainer);

    if (isModalOpen) {
      const modalNode = Modal({
        handleClose: () => {
          isModalOpen = false;
          render();
        },
        addItem: (item) => {
          listManager.addItem(item);
          isModalOpen = false;
        },
      });
      container.appendChild(modalNode);
    }
  };

  const listManager = useListManager([], render);

  render();

  return container;
}
