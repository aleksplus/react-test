import {BaseStore} from 'fluxible/addons';

class ItemsStore extends BaseStore {

  static storeName = 'ItemsStore';
  static handlers = {
    'LOAD_ITEMS': 'setItems',
  };

  setItems(list) {
    this.items = list;
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
