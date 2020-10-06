import React, {isValidElement} from 'react';
import { Typography, } from '@material-ui/core';

const renderTitle = (classes, title) => {
  if (title) {
    return (
      <div className={`${classes.title} eb-title`}>
        {
          (typeof title === 'string') &&
          (
            <Typography variant="h1" component="div">{title}</Typography>
          )
        }
        {
          (isValidElement(title)) &&
          (
            title
          )
        }
      </div>
    );
  }
}


export {renderTitle};
