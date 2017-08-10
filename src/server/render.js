import React from 'react';
import ReactDOMServer from 'react-dom/server';
import serialize from 'serialize-javascript';

import {navigateAction} from 'fluxible-router'
import {createElementWithContext} from 'fluxible-addons-react';

import HtmlDocument from './../containers/Html';
import app from './../app';

const env = process.env.NODE_ENV;


function renderApp(req, res, context, next) {
  try {
    const markup = ReactDOMServer.renderToString(
      createElementWithContext(context)
    );
    const state = `window.App=${serialize(app.dehydrate(context))};`;

    const html = ReactDOMServer.renderToStaticMarkup(
      <HtmlDocument
        dev={env !== 'production'}
        lang={req.locale}
        state={state}
        markup={markup}
        context={context.getComponentContext()}
      />
    );
    res.type('html');
    res.write('<!DOCTYPE html>' + html);
    res.end();
  } catch (e) {
    next(e);
  }
}

export default function renderServer(req, res, next) {
  const context = app.createContext({
    res: res,
    req: req,
  });

  context.getActionContext().executeAction(navigateAction, {
    url: req.url
  }, (err) => {
    if (err) {
      next(err);
      return;
    }
    // try {
      renderApp(req, res, context, next)
    // } catch(err) {
    //   if (err.statusCode || err.status) {
    //     renderApp(req, res, context, next);
    //     return;
    //   }
    //   next(err);
    // }
  });
}