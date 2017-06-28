import {BaseStore} from 'fluxible/addons';

class ItemsStore extends BaseStore {

  static storeName = 'ItemStore';
  static handlers = {
    'LOAD_ITEMS': 'setItems',
    'REMOVE_ITEM': 'removeItem',
  };

  constructor(dispatcher) {
    super(dispatcher);
    this.items = [];
  }

  getItems() {
    return this.items;
  }

  setItems(list) {
    this.items = list;
    this.emitChange();
  }

  removeItem(value) {
    this.items = Array.from(this.items).filter((item) => {
      if (!item || !item.value) return false;
      return value !== item.value
    });
    this.emitChange();
  }

  dehydrate() {
    return {
      items: this.items,
    };
  }

  rehydrate(state) {
    this.items = state.items;
  }
}

export default ItemsStore;
