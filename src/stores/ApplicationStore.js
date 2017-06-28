import {BaseStore} from 'fluxible/addons';

class ApplicationStore extends BaseStore {

  static storeName = 'ApplicationStore';
  static handlers = {
    'SET_TITLE': 'setPageTitle',
  };
  pageTitle = 'test';

  getPageTitle() {
    return this.pageTitle;
  }

  setPageTitle(title) {
    this.pageTitle = title;
  }

  dehydrate() {
    return {
      pageTitle: this.pageTitle,
    };
  }

  rehydrate(state) {
    this.pageTitle = state.pageTitle;
  }
}


export default ApplicationStore;
