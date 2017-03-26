import React, { PropTypes } from 'react';
import classNames from 'classnames';

import omit from 'omit.js';

const stringOrNumber = PropTypes.oneOfType([PropTypes.string, PropTypes.number]);
const objectOrNumber = PropTypes.oneOfType([PropTypes.object, PropTypes.number]);

export interface ColSize {
  span?: number;
  order?: number;
  offset?: number;
  push?: number;
  pull?: number;
}

export interface ColProps {
  className?: string;
  span?: number;
  order?: number;
  offset?: number;
  push?: number;
  pull?: number;
  xs?: number | ColSize;
  sm?: number | ColSize;
  md?: number | ColSize;
  lg?: number | ColSize;
  xl?: number | ColSize;
  prefixCls?: string;
  style?: React.CSSProperties;
}

export default class Col extends React.Component<ColProps, any> {
  static propTypes = {
   
  };

  render() {
    const props = this.props;
    const { span, order, offset, push, pull, className, children, prefixCls = 'ant-col', ...others } = props;
    let sizeClassObj = {};
    ['xs', 'sm', 'md', 'lg', 'xl'].forEach(size => {
      let sizeProps: ColSize = {};
      if (typeof props[size] === 'number') {
        sizeProps.span = props[size];
      } else if (typeof props[size] === 'object') {
        sizeProps = props[size] || {};
      }

     
      sizeClassObj = Object.assign({}, sizeClassObj, {
        [`${prefixCls}-${size}-${sizeProps.span}`]: sizeProps.span !== undefined,
        [`${prefixCls}-${size}-order-${sizeProps.order}`]: sizeProps.order || sizeProps.order === 0,
        [`${prefixCls}-${size}-offset-${sizeProps.offset}`]: sizeProps.offset || sizeProps.offset === 0,
        [`${prefixCls}-${size}-push-${sizeProps.push}`]: sizeProps.push || sizeProps.push === 0,
        [`${prefixCls}-${size}-pull-${sizeProps.pull}`]: sizeProps.pull || sizeProps.pull === 0,
      });
    });
    const classes = classNames({
      [`${prefixCls}-${span}`]: span !== undefined,
      [`${prefixCls}-order-${order}`]: !!order,
      [`${prefixCls}-offset-${offset}`]: !!offset,
      [`${prefixCls}-push-${push}`]: !!push,
      [`${prefixCls}-pull-${pull}`]: !!pull,
    }, className, sizeClassObj);

    return <div {...omit(others, ['xs', 'sm', 'md', 'lg', 'xl']) } className={classes}>{children}</div>;
  }
}