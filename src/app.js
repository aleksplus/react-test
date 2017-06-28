import Fluxible from 'fluxible';

import {RouteStore} from 'fluxible-router';
import routes from './routes';

import Application from './Application';

import ApplicationStore from './stores/ApplicationStore';
import ItemStore from './stores/ItemStore';

// create new fluxible instance
const app = new Fluxible({
  component: Application
});

app.registerStore(ApplicationStore);
app.registerStore(ItemStore);
app.registerStore(RouteStore.withStaticRoutes(routes));

export default app;
