import React from 'react';
import { Link } from 'react-router-dom';

import PageNotFound from 'assets/images/404.jpg';

const styles = {
  notFoundImage: {
    width: 400,
    height: 400,
    display: 'block',
    margin: 'auto',
    position: 'relative'
  }
}
export default () => {
  return (
    <div>
      <img src={PageNotFound} style={styles.notFoundImage} alt={'Not Found'}/>
      <Link to="/">Home</Link>
    </div>
  )
}
