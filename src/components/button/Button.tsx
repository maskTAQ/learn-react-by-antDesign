import  React from 'react';
import  classNames from 'classnames';
import { findDOMNode } from 'react-dom';

import   omit from 'omit.js';

//定义 props的数据类型
export type ButtonType = 'primary' | 'ghost' | 'dashed' | 'danger';
export type ButtonShape = 'circle' | 'circle-outline';
export type ButtonSize = 'small' | 'large';

export interface ButtonProps {
	type?: ButtonType;
	htmlType?: string;
	icon?: string;
	shape?: ButtonShape;
	size?: ButtonSize;
	onClick?: React.FormEventHandler<any>;
	onMouseUp?: React.FormEventHandler<any>;
	loading?: boolean;
	disabled?: boolean;
	style?: React.CSSProperties;
	prefixCls?: string;
	className?: string;
	ghost?: boolean;
}
export default class Button extends React.Component<ButtonProps, any>{
	static Group:any;
	static __ANT_BUTTON = true;
	static defaultProps = {
		prefixCls:'ant-btn',
		loading:false,
		clicked:false,
		ghost:false,
	};

	static propTypes = {
		type: React.PropTypes.string,
		shape: React.PropTypes.oneOf(['cirlce', 'circle-outline']),
		size: React.PropTypes.oneOf(['large', 'default', 'small']),
		htmlType: React.PropTypes.oneOf(['submit', 'button', 'reset']),
		onClick: React.PropTypes.func,
		loading: React.PropTypes.bool,
		className: React.PropTypes.string,
		icon: React.PropTypes.string,
	};

	timeout: number;
	delayTimeout: number;

	constructor(props){
		super(props);
		this.state = {
			loading: props.loading,
		};
	}

	componentWillReceiveProps(nextProps){
		const currentLoading = this.props.loading;
		const loading = nextProps.loading;

		if(currentLoading){
			clearTimeout(this.delayTimeout);
		}

		if(loading){
			this.delayTimeout = setTimeout(() => this.setState({ loading }), 200);
		}else{
			this.setState({ loading });
		}
	}

	componentWillUnmount(){
		if(this.timeout){
			clearTimeout(this.timeout);
		}
		if(this.delayTimeout){
			clearTimeout(this.delayTimeout);
		}
	}

//用箭头函数 是为了绑定this
	handleClick=(e)=>{
		//添加点击效果
		this.setState({ clicked: true });
		clearTimeout(this.timeout);
		this.timeout = setTimeout(() => this.setState({clicked:false}),500);

		const onClick = this.props.onClick;
		if(onClick){
			onClick(e);
		}
	}

	//在谷歌下处理点击时自动获取焦点
	handleMouseUp=(e)=>{
		//this 为 HTMLElement对象
		(findDOMNode(this) as HTMLElement).blur();

		this.props.onMouseUp && this.props.onMouseUp(e);
	}

	render(){
		const {
			type, shape, size = '', className, htmlType, children, icon, prefixCls, ghost, ...others,
		} = this.props;

		const {loading, clicked} = this.state;

		//将传进来的 size属性 赋值给 sizeCls 并缩写
		const sizeCls = ({
			large: 'lg',
			small: 'sm',
		})[size] || '';


		const classes = classNames(prefixCls, {
			//将属性和属性前缀拼成class
			[`${prefixCls}-${type}`]: type,
			[`${prefixCls}-${shape}`]: shape,
			[`${prefixCls}-${sizeCls}`]: sizeCls,
			[`${prefixCls}-icon-only`]: !children && icon,
			[`${prefixCls}-loading`]: loading,
			[`${prefixCls}-clicked`]: clicked,
			[`${prefixCls}-background-ghost`]: ghost,
		}, className);

		const iconType = loading ? 'loading' : icon;
		const iconNode = iconType ? '<Icon type={iconType} />' : null;
		//const kids = React.Children.map(children, insertSpace);

		return (
			<button
				{...omit(others, ['loading', 'clicked']) }
				type={htmlType || 'button'}
				className={classes}
				onMouseUp={this.handleMouseUp}
				onClick={this.handleClick}
				>
							{iconNode}{children}
				</button>
		);
	}
}

