import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {connectToStores, provideContext} from 'fluxible-addons-react';
import {handleHistory} from 'fluxible-router';
import {compose} from 'recompose';

import NotFoundPage from './containers/NotFound';
import ErrorPage from './containers/NotFound';


class Application extends Component {
  componentDidUpdate(prevProps, prevState) {
    const newProps = this.props;
    if (newProps.pageTitle === prevProps.pageTitle) {
      return;
    }
    window.document.title = newProps.pageTitle;
  }

  render() {
    const { currentRoute, currentNavigateError, isNavigateComplete } = this.props;
    let content;

    const Handler = currentRoute && currentRoute.handler;
    if (currentNavigateError && currentNavigateError.statusCode === 404) {
      // This 'not found' error comes from a page init actions (InitActions.js)
      // e.g. when a 500px API responds 404
      content = <NotFoundPage />;
    } else if (currentNavigateError) {
      // Generic error, usually always with statusCode 500
      content = <ErrorPage err={currentNavigateError} />;
    } else if (!Handler) {
      // No handler: this is another case where a route is not found (e.g.
      // is not defined in the routes.js config)
      content = <NotFoundPage />;
    } else {
      // Here you go with the actual page content
      const params = currentRoute.params;
      content = <Handler {...params} isNavigateComplete={isNavigateComplete} />;
    }

    return (
      <div>
        {content}
      </div>
    );
  }
}

Application.contextTypes = {
  executeAction: PropTypes.func.isRequired,
  getStore: PropTypes.func.isRequired,
};

if (process.env.NODE_ENV !== 'production') {
  Application.propTypes = {
    // props coming from fluxible-router's handleHistory
    isNavigateComplete: PropTypes.bool,
    currentRoute: PropTypes.object,
    currentNavigateError: PropTypes.shape({
      statusCode: PropTypes.number.isRequired,
      message: PropTypes.string.isRequired,
    }),

    // prop coming from ApplicationStore
    pageTitle: PropTypes.string,
  };
}


const enhance = compose(
  handleHistory,
  provideContext,
  connectToStores(['ApplicationStore'], (context) => ({
    pageTitle: context.getStore('ApplicationStore').getPageTitle()
  }))
);

export default enhance(Application);
