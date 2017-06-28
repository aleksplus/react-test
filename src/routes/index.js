import HomePage from '../pages/Home';
import PageActions from '../actions/PageActions';

export default {
  home: {
    path: '/',
    method: 'get',
    title:  'Test',
    handler: HomePage,
    action: PageActions.HomePage
  },
}
