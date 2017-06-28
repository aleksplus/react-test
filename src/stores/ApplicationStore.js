import {BaseStore} from 'fluxible/addons';

class ApplicationStore extends BaseStore {

  static storeName = 'ApplicationStore';

  pageTitle = 'test';

  getPageTitle() {
    return this.pageTitle;
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
