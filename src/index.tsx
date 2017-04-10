import React from "react";
import ReactDOM from "react-dom";

import Button from "./components/button";

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
