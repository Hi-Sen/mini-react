
// vnode vvnode虚拟 dom对象
// node dom节点

const TEXT = "TEXT";

/*
  vnode  jsx 经过 React.createElemnt 编译后的虚拟 dom  
  container 容器  
*/
function render (vnode, container) {
  // step 1: vnode -> node 
  const node = createNode(vnode, container);

  // step2: container.appendChild(node); 
  node && container.appendChild(node);
}

/*
  虚拟 dom 渲染成真实 dom  
  vnode 虚拟 dom 
  parentNode 父节点 , 也就是将虚拟dom挂载的对应父容器   
*/
function createNode (vnode, parentNode) {
  let node = null;

  /*
    type:"类型"
    props:参数和子节点 children 
  */
  const { type, props } = vnode;

  // todo 根据节点类型，生成 dom 节点 
  if (type === TEXT) {
    // 文本节点
    node = document.createTextNode("");
  } else if (typeof type === "string") {
    // 原生标签节点，div , p , span 等
    node = document.createElement(type);
  } else if (typeof type === "function") {
    // 区分一下类组件与函数组件
    // isReactComponent 自定义区分标识 ， Component 原型上定义的 
    node = type.prototype.isReactComponent
      ? updateClassComponent(vnode, parentNode)
      : updateFunctionComponent(vnode, parentNode);
  }

  /*
    遍历 children 
    传递当前的父节点 node 和子级 虚拟 dom 来递归生成真实 dom 
  */
  reconcileChildren(node, props.children);

  // 更新 dom  
  updateNode(node, props);

  return node;
}


// 类组件
// 类组件先实例化，再执行 render   
function updateClassComponent (vnode, parentNode) {
  const { type, props } = vnode;
  const instance = new type(props);
  const vvnode = instance.render();
  const node = createNode(vvnode, parentNode);
  return node;
}

// 函数组件  
// 函数组件就是执行函数  
function updateFunctionComponent (vnode, parentNode) {
  const { type, props } = vnode;
  // console.log(vnode) // 打印出来看看 ， 创建的时候就决定了类型，原生标签，文本，函数，类，等   
  const vvnode = type(props); // 执行函数，返回子节点  
  const node = createNode(vvnode, parentNode);
  return node;
}

// 递归调用子级元素虚拟 dom => 真实 dom  挂载到对应父容器
function reconcileChildren (node, children) {
  for (let i = 0; i < children.length; i++) {
    const child = children[i];
    // child 是 vnode，vnode->dom节点，插入到父 dom节点中就可以了
    render(child, node);
  }
}


/*
  更新 dom 节点  
  nextVal => props 属性和子节点属性以及值    
  最后挂载给 node 节点  
*/
function updateNode (node, nextVal) {
  Object.keys(nextVal)
    .filter(k => k !== "children")
    .forEach(k => {
      // console.log(node[k] + "----" + nextVal[k]);
      node[k] = nextVal[k];
    });
}

export default { render };
