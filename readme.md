# 手写一遍ant-design源码学习react

	npm install && webpack

1. 源码中遇到了typescript和less,于是先看了一遍教程。
2. 在配置tsconfig遇到了一些问题 import 总是需要install @type/moduleName 改为ant-design一样的配置就行了 jsx一项不变。
3. 配置loader时不支持缩写了!!!

## button 组件
组件引入了omit.js看了一下源码就是删除对象的指定键。

````javascript
let omit=(obj, fields)=>{
  var copy = assign({}, obj);
  for (var i = 0; i < fields.length; i++) {
    var key = fields[i];
    delete copy[key];
  }
  return copy;
};
````
1. 开始定义了props的类型 组件初始化的时候定义了按钮的loading状态
2. 接受到props时 重新设置了loading状态 超时200ms 定时器id赋予delaytimeout
3. 组件卸载时 清空俩个定时器 loading状态的 click的
4. 点击按钮的时候 延迟500ms 取消点击状态 
5. 把用户传递参数值(除了事件) 添加class前缀 添加到class里
6. 把其他没用到的属性 剔除loading clicked(利用omit.js) 原封不动的传进原生button属性中
7. ant把子元素处理了一下 在字符串之前俩个空格(没明白是为什么)

	buttonGroup就是在button外面包裹了一层div。然后挂载在button类的静态属性下。