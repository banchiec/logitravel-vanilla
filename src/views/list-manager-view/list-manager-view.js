import { ListManager } from '../../components/list-manager/list-manager.js';
import { openModal } from '../../components/modal/modal-controller.js';
import useListManager from '../../hooks/useListManager.js';

export default function ListManagerView() {
  let selectedItems = [];
  const container = document.createElement('div');

  const render = () => {
    container.innerHTML = '';

    const listContainer = document.createElement('div');
    listContainer.className = 'logitravel-options';

    const listItemManagerNode = ListManager({
      items: listManager.getItems(),
      selectedItems,
      setSelectedItems: (newSelected) => {
        selectedItems = newSelected;
        render();
      },
      onDelete: () => {
        listManager.deleteItems(selectedItems);
        selectedItems = [];
        render(); 
      },
      handleUndo: () => {
        listManager.handleUndo();
        selectedItems = [];
        render();
      },
      handleOpenModal: () => {
        openModal({
          onSubmit: (item) => {
            listManager.addItem(item);
            render(); 
          },
          onClose: () => {
            render();
          },
        });
      },
    });

    listContainer.appendChild(listItemManagerNode);
    container.appendChild(listContainer);
  };

  const listManager = useListManager([], render);

  render();

  return container;
}
