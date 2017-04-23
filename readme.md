# 手写一遍ant-design源码学习react

	npm install && webpack

1. 源码中遇到了typescript和less,于是先看了一遍教程。
2. 在配置tsconfig遇到了一些问题 import 总是需要install @type/moduleName 改为ant-design一样的配置就行了 jsx一项不变。
3. 配置loader时不支持缩写了!!!
4. ?组件再传参的时候利用typescrip声明了类型，在组件内部也用 propTypes重复声明了类型，感觉是不是有点多余。

component/style中定义了样式的基类包括色调和生成色调的算法(具体实现看不懂)。
## button 组件
组件引入了omit.js看了一下源码就是删除对象的指定键。

```javascript
let omit=(obj, fields)=>{
  var copy = assign({}, obj);
  for (var i = 0; i < fields.length; i++) {
    var key = fields[i];
    delete copy[key];
  }
  return copy;
};
```
1. 开始定义了props的类型 组件初始化的时候定义了按钮的loading状态
2. 接受到props时 重新设置了loading状态 超时200ms 定时器id赋予delaytimeout
3. 组件卸载时 清空俩个定时器 loading状态的 click的
4. 点击按钮的时候 延迟500ms 取消点击状态
5. 把用户传递参数值(除了事件) 添加class前缀 添加到class里
6. 把其他没用到的属性 剔除loading clicked(利用omit.js) 原封不动的传进原生button属性中
7. ant把子元素处理了一下 在字符串之前俩个空格(没明白是为什么)

	按钮的幽灵的样式实现是通过点击的时候添加clicked的class。class中定义了定位位置
	从-1px到-6px的过度。

### buttonGroup

	buttonGroup就是在button外面包裹了一层div。然后挂载在button类的静态属性下。



## icon组件
	定义了返回标签的方法

## grid组件
	row组件只允许子级是元素。rol组件中将PropTypes赋予其他指针，少写了很多代码。
	也没有用其他组件的omit而是通过遍历大小属性值时就删除了[我给他改成omit删除了感觉思路更清晰]。
