// 原本 react 
// import React, { Component } from 'react';
// import ReactDOM from 'react-dom';

/*
  mini-react 
  React.createElement：创建虚拟DOM 
  React.Component：实现⾃定义组件 
  ReactDOM.render：渲染真实DOM  
*/

import React from "./hisen-react/";
import Component from "./hisen-react/Component";
import ReactDOM from "./hisen-react/react-dom";

import './index.css';

// 函数组件
function FunctionComponent (props) {
  return <div className="border">FunctionComponent-{props.name}</div>;
}

// 类组件  
class ClassComponent extends Component {
  render () {
    return (
      <div className="border">
        ClassComponent - {this.props.name}
      </div>
    );
  }
}

const jsx = (
  <div className="border">
    <h1> h1 标签 </h1>
    <p>
      p 标签 <span>嵌套的 span 标签</span>
    </p>
    <FunctionComponent className="fun" name="函数组件" />
    <ClassComponent className="comp" name="类组件" />
  </div>
);

/*
  经过babel-loader编译，jsx就是 React.createElement(...)函数执行  
  所以 ，我们首先要实现一个 React.createElement() 函数   
*/
ReactDOM.render(jsx, document.getElementById("root"));

