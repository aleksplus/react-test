import React from 'react';
import PropTypes from 'prop-types';

const NotFound = ({err}) => (
  <div>
    Error
    {err}
  </div>
);

if (process.env.NODE_ENV !== 'production') {
  NotFound.propTypes = {
    items: PropTypes.array,
  };
}


export default NotFound;
