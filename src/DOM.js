window.dom = {};
dom.create = function (string) {
    const container = document.createElement('template');
    container.innerHTML = string.trim();//trim去掉文本，firstChild拿不到空格文本了
    return container.content.firstChild;
};
//node后面插入节点node2
dom.after = function (node, node2) {
    node.parentNode.insertBefore(node2, node.nextSibling);
//有bug，当node是最后一个节点时，它就没有nextsibling
    //但是下一个节点是空白也会继续进行
    //就算不换行也能插入
    //<div><div>1</div></div>nextSibling是空也能行
    //而且脚本引入也会出错
};
//node前面插入节点node2
dom.before = function (node, node2) {
    node.parentNode.insertBefore(node2, node);
};
//新增儿子节点append
dom.append = function (parent, node) {
    parent.appendChild(node);
};
//新增一个爸爸节点
dom.wrap = function (node, parent) {
    dom.before(node, parent);
    dom.append(parent, node);
};
//删
//删除自身
dom.remove = function (node) {
    node.parentNode.removeChild(node);
    return node;
};
//删除所有儿子
dom.empty = function (parent) {
    const {childNodes} = parent;//解构赋值 const childNodes=node.childNodes
    const arr = [];
    let x = parent.firstChild;
    while (x) {
        arr.push(dom.remove(parent.firstChild))
        x = parent.firstChild;
    }
    //childNodes回车、空格也是儿子
    return arr;
}
//改
//改title
dom.attr = function (node, name, value) {
    if (arguments.length === 3) {
        node.setAttribute(name, value);
    } else if (arguments.length === 2) {
        return node.getAttribute(name);
    }//重载----------
}
//修改文本内容
dom.text=function (node,string) {
    if(arguments.length===2){
        if('innerText'in node){
            node.innerText=string;//单独修改会删掉内部的p标签-无法避免
        }  else {
            node.textContent=string;
        }//适配写法------------
    }else if(arguments.length===1){
        if('innerText'in node){
            return node.innerText;//单独修改会删掉内部的p标签-无法避免
        }  else {
            return node.textContent;
        }//适配写法------------
    }

}

//改html
dom.html=function (node,string) {
    if(arguments.length===2){
        node.innerHTML=string;
    }else if(arguments.length===1){
        return node.innerHTML;
    }

}
//改style
dom.style=function (node,name,value){
    if(arguments.length===3){
        //dom.style(div,color,'green')
        node.style[name]=value;
    }else if(arguments.length===2){
        if(typeof name==='string'){
            return node.style[name];
        }else if(name instanceof Object){
            for (let arrayKey in name) {
                //key:border /color
                //node.style.border=xxx
                node.style[arrayKey]=name[arrayKey];
            }
        }
    }

}

//给元素添加class,class也是一个对象，给对象添加一个add()
dom.class={
    add(node,className){
        node.classList.add(className);
    },
    remove(node,className){
        node.classList.remove(className);
    },
    has(node,className){
        return node.classList.contains(className);
    }

}
//事件
dom.on=function (node,eventName,fn) {
    node.addEventListener(eventName,fn);
}

dom.off=function (node,eventName,fn) {
    node.removeEventListener(eventName,fn);
}
dom.find=function (selector,scope) {
    return (scope||document).querySelectorAll(selector);
    //如果有scope，则在scope里查找
    //如果没有，则在document里查找
}
dom.parent=function (node) {
    return node.parentNode;
};
dom.children=function (node) {
    return node.children;
};
dom.siblings=function (node){
    return Array.from(node.parentNode.children).filter(n=>n!==node);
    //伪数组转数组，然后进行过滤，排除自身
}
dom.next=function (node){
    //return node.nextSibling
    //直接用nextSibling会找到文本
    let x=node.nextSibling
    while (x && x.nodeType===3){
        x=x.nextSibling//如果下一个节点是空，则直接返回x
    }
    return x;
}
dom.previous=function (node){
    //return node.previousSibling
    //直接用previousSibling会找到文本
    let x=node.previousSibling
    while (x && x.nodeType===3){
        x=x.previousSibling//如果下一个节点是空，则直接返回x
    }
    return x;
}
dom.each=function (nodeList,fn){
    for (let i = 0; i < nodeList.length; i++) {
        fn.call(null,nodeList[i])
    }
}
dom.index=function (node){
    const list=this.children(this.parent(node));
    for(let i=0;i<list.length;i++){
        if(list[i]===node){
            return i+1;
        }
    }

}
