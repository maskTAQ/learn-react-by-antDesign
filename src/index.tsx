import React from "react";
import ReactDOM from "react-dom";

import Button from "./components/button";
import Alert from './components/alert';

const renderDemo = () => {
    return (
        <div className="demo">
            <Button type="danger" data-ss="ss">button</Button>
						<Alert message="主题内容" description="描述信息"/>
				</div>
    );
};
ReactDOM.render(renderDemo(), document.getElementById("example"));
