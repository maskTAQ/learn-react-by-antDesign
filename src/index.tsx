import React from "react";
import ReactDOM from "react-dom";

import Button from "./components/button";
<<<<<<< HEAD
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
=======

import './demostyle/index.less';

const createButton = () => {
    return (
        <div>
            <Button type="danger" data-text="自定义属性">danger</Button>
            <Button type="ghost" size="small">ghost</Button>
        </div>
    )
}

const createContainer = () => {
    return (
        <div className="container">
            <h2>button</h2>
            <div className="content">
                {createButton()}
            </div>
        </div>
    )
}

ReactDOM.render(createContainer(), document.getElementById("example"));
>>>>>>> 7f2da7b495f79fce096bad350dab68cad50e542e
