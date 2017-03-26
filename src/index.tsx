import  React from "react";
import  ReactDOM from "react-dom";


import Button  from "./components/button";

ReactDOM.render(
    <Button onClick={() => alert(1) }  onMouseUp={() => alert(2) } type="danger" data-ss="ss">ss</Button>,
    document.getElementById("example")
);