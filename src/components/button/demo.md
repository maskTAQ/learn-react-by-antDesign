# 使用示例
	样式是通过props 属性控制。

```javascript
import { Button } from './inedx';
const ButtonGroup = Button.Group;

//渲染button
ReactDOM.render(
  <div>
    <Button type="primary">Primary</Button>
    <Button>Default</Button>
    <Button type="dashed">Dashed</Button>
    <Button type="danger">Danger</Button>
  </div>
, mountNode);

//渲染button-group
ReactDOM.render(
 <ButtonGroup>
      <Button>Cancel</Button>
      <Button type="primary">OK</Button>
 </ButtonGroup>
, mountNode);
``` 
