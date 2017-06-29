import React from 'react';
import PropTypes from 'prop-types';

class Html extends React.Component {

  render() {
    const {lang = 'en'} = this.props;
    const {markup, state, dev, context} = this.props;

    return (
      <html lang={lang}>
      <head>
        <meta charSet="utf-8" />
        <title>{context.getStore('ApplicationStore').getPageTitle()}</title>
        <meta name="viewport" content="width=device-width, user-scalable=no" />
        <link rel="stylesheet" href={`/public/${dev ? 'main.css' : 'main.min.css'}`} />
      </head>
      <body>
        <div id="app" dangerouslySetInnerHTML={{__html: markup}} />
        <script dangerouslySetInnerHTML={{__html: state}} />
        {
          !dev && <script src="/public/vendor.min.js" />
        }
        <script src={`/public/${dev ? 'main.js' : 'main.min.js'}`} />
      </body>
      </html>
    );
  }
}

Html.propTypes = {
  lang: PropTypes.string,
  markup: PropTypes.string,
  state: PropTypes.string,
  dev: PropTypes.bool,
  context: PropTypes.object,
};

export default Html;
