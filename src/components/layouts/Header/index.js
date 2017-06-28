import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';


class Header extends PureComponent {
  render() {
    const {title} = this.props;
    return (
      <header>
        <h1>{title}</h1>
      </header>
    )
  }
}

Header.defaultProps = {
  title: 'DEFAULT TITLE',
};

if (process.env.NODE_ENV !== 'production') {
  Header.propTypes = {
    title: PropTypes.string,
  };
}


export default Header;
