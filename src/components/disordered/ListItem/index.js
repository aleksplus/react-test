import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';


class ListItem extends PureComponent {
  remove = () => {
    const {value, onRemove} = this.props;
    if (typeof onRemove === 'function') {
      onRemove(value);
    }
  };

  render() {
    const {title} = this.props;
    return (
      <li>
        <span>{title}</span>&nbsp;
        <a onClick={this.remove}><sup>x</sup></a>
      </li>
    );
  }
}


ListItem.defaultProps = {
  title: 'not set',
  value: undefined,
  onRemove: undefined
};

if (process.env.NODE_ENV !== 'production') {
  ListItem.propTypes = {
    title: PropTypes.string,
    value: PropTypes.string,
    onRemove: PropTypes.func,
  };
}

export default ListItem;
