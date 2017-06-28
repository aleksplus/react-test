import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

// actions
import removeItem from '../../../actions/ItemsActions/removeItem';

import ListItem from '../../disordered/ListItem';


class ItemList extends PureComponent {
  onRemove = (value) => {
    this.context.executeAction(removeItem, value);
  };

  render() {
    const {items = []} = this.props;

    return (
      <ul>
        {
          items.map((item, i) => {
            return (
              <ListItem key={i} {...item} onRemove={this.onRemove} />
            );
          })
        }
      </ul>
    );
  }
}


ItemList.contextTypes = {
  executeAction: PropTypes.func.isRequired
};

ItemList.defaultProps = {
  items: [],
};

if (process.env.NODE_ENV !== 'production') {
  ItemList.propTypes = {
    items: PropTypes.array,
  };
}


export default ItemList;
