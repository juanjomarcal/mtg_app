import React from 'react';
import Navigation from '../../components/Navigation/Navigation';

const layout = (props) => (
  <div>
    <Navigation />
    <div>{props.children}</div>
  </div>
);

export default layout;
