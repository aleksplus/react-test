import {connectToStores} from 'fluxible-addons-react';

function itemsList(Component) {
  return connectToStores(Component, ['ItemStore'], (context) => {
    return {
      items: context.getStore('ItemStore').getItems(),
    };
  });
}


export default {
  itemsList,
}
