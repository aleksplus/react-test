import {loadItems} from '../ItemsActions'


export default {
  HomePage(context, route, done) {
    context.executeAction(loadItems, {}, done)
  },
}