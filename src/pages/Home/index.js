import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Header from '../../components/layouts/Header';
import Footer from '../../components/layouts/Footer';
import ItemList from '../../components/lists/ItemList';

import {itemsList} from '../../screens';


class Home extends Component {
  render() {
    const {items} = this.props;

    return (
      <div className="b-page">
        <Header />

        <article>
          <ItemList items={items} />
        </article>

        <Footer />
      </div>
    );
  }
}

export default itemsList(Home);
