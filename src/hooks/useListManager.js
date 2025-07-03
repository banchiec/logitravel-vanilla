const useListManager = (initialItems = [], onChange) => {
  let items = [...initialItems];
  let lastAction = null;

  const notify = () => {
    if (typeof onChange === 'function') {
      onChange(items);
    }
  };

  const addItem = (value) => {
    items.push(value);
    lastAction = { type: 'add', item: value };
    notify();
  };

  const deleteItems = (selectedItems) => {
    const deletedWithIndex = selectedItems.map(item => ({
      value: item,
      index: items.indexOf(item),
    }));

    lastAction = { type: 'delete', items: deletedWithIndex };
    items = items.filter(item => !selectedItems.includes(item));
    notify();
  };

  const handleUndo = () => {
    if (!lastAction) return;

    switch (lastAction.type) {
      case 'add':
        items = items.filter(item => item !== lastAction.item);
        break;

      case 'delete':
        lastAction.items
          .sort((a, b) => a.index - b.index)
          .forEach(({ value, index }) => {
            if (!items.includes(value)) {
              items.splice(index, 0, value);
            }
          });
        break;
    }

    lastAction = null;
    notify();
  };

  const getItems = () => [...items];

  return {
    getItems,
    addItem,
    deleteItems,
    handleUndo,
  };
};
export default useListManager