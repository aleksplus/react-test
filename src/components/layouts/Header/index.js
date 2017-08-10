import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';

class Header extends PureComponent {
  render() {
    const {title} = this.props;
    return (
      <header className={styles.Header}>
        <h1>{title}</h1>
      </header>
    )
  }
}

Header.defaultProps = {
  title: 'DEFAULT TITLE',
};

/*
Header.contextTypes = {
  insertCss: PropTypes.func.isRequired
};
*/

if (process.env.NODE_ENV !== 'production') {
  Header.propTypes = {
    title: PropTypes.string,
  };
}


export default Header;
