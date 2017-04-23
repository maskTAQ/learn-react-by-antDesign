/*
去掉了animat 后期采用react中的动画组件替换
*/

import React,{Component}from 'react';
import ReactDOM from 'react-dom';
import Icon from '../icon';
import classNames from 'classnames';

export interface AlertProps {
  type?: 'success' | 'info' | 'warning' | 'error';
  //alert组件是否能被关闭
  closable?: boolean;
  //替代关闭按钮的文本
  closeText?: React.ReactNode;
  //alert 主体信息
  message: React.ReactNode;
  description?: React.ReactNode;
  //杯关闭时的回调函数
  onClose?: React.MouseEventHandler<any>;
  showIcon?: boolean;
  style?: React.CSSProperties;
  prefixCls?: string;
  className?: string;
  banner?: boolean;
}

export default class Alert extends Component<AlertProps, any> {
  static defaultProps = {
    type: 'info',
  };
  constructor(props) {
    super(props);
    this.state = {
      closing: true,
      closed: false,
    };
  }
  handleClose = (e) => {
    e.preventDefault();
    let dom = ReactDOM.findDOMNode(this) as HTMLElement;
    dom.style.height = `${dom.offsetHeight}px`;
    // Magic code
    // 重复一次后才能正确设置 height
    dom.style.height = `${dom.offsetHeight}px`;

    this.setState({
      closing: false,
    });


    this.props.onClose && this.props.onClose();
  }
  animationEnd = () => {
    this.setState({
      closed: true,
      closing: true,
    });
  }
  render() {
    let {
      closable, description, type, prefixCls = 'ant-alert', message, closeText, showIcon, banner,
      className = '', style,
    } = this.props;

    // banner模式默认有 Icon
    showIcon = showIcon || banner;
    // banner模式默认为警告
    type = banner ? 'warning' : type;

    let iconType = '';
    switch (type) {
      case 'success':
        iconType = 'check-circle';
        break;
      case 'info':
        iconType = 'info-circle';
        break;
      case 'error':
        iconType = 'cross-circle';
        break;
      case 'warning':
        iconType = 'exclamation-circle';
        break;
      default:
        iconType = 'default';
    }

    // use outline icon in alert with description
    if (!!description) {
      iconType += '-o';
    }

    let alertCls = classNames(prefixCls, {
      [`${prefixCls}-${type}`]: true,
      [`${prefixCls}-close`]: !this.state.closing,
      [`${prefixCls}-with-description`]: !!description,
      [`${prefixCls}-no-icon`]: !showIcon,
      [`${prefixCls}-banner`]: !!banner,
    }, className);

    // closeable when closeText is assigned
    if (closeText) {
      closable = true;
    }

    const closeIcon = closable ? (
      <a onClick={this.handleClose} className={`${prefixCls}-close-icon`}>
        {closeText || <Icon type="cross" />}
      </a>
    ) : null;

    return this.state.closed ? null : (
        <div data-show={this.state.closing} className={alertCls} style={style}>
          {showIcon ? <Icon className={`${prefixCls}-icon`} type={iconType} /> : null}
          <span className={`${prefixCls}-message`}>{message}</span>
          <span className={`${prefixCls}-description`}>{description}</span>
          {closeIcon}
        </div>

    );
  }
}
