//  JSX 编译为 createElement 方法执行
const TEXT = "TEXT";

/*
  三个参数 ， 返回两个属性 type 和 props 
  type：创建类型 , 原生标签 , 文本 , 函数组件 , 类组件  等
  config: 属性 ， 如函数组件： {className: "border", name: "函数组件", __source: {…}, __self: undefined}
  children： 子节点 ， 多少个就不知道了，这里暂时只考虑数组的形式 
*/
function createElement (type, config, ...children) {

  // 移除 config 暂时不用的 __source: {…}, __self: undefined 属性
  if (config) {
    delete config.__source;
    delete config.__self;
  }
  // 这里不考虑 key和 ref   
  const props = {
    ...config,
    // * 源码中会区分 props.children 的类型 ，如数组、单个对象，
    // * createTextNode 统一文本节点的数据结构，方便后续统一处理 （child 直接就是文本内容）
    children: children.map(child => {
      return typeof child === "object" ? child : createTextNode(child)
    }
    )
  };
  return {
    type,
    props
  };
}

// 转换普通文本的数据结构，通过 TEXT 来标识 
function createTextNode (text) {
  return {
    type: TEXT,
    props: {
      children: [],
      nodeValue: text
    }
  };
}

export default {
  createElement
};
