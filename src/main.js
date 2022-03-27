console.log('hi,这是开始');
// const div=dom.create('<div><span>1</span></div>');
// console.log(div);
//dom is not defined,没有引入
//太麻烦，实现<div><span>1</span></div>
//先写入一个container
//在div里放td会报错。
//使用template可以放置任何标签
//children拿不到template里的内容
const div=dom.create('<div>我是弟弟</div>');
console.log(div);

dom.after(test,div);
const div3=dom.create('<div id="parent">我是test爸爸</div>');
dom.wrap(test,div3);
// const node=dom.remove(window.empty)
//const nodes=dom.empty(window.empty);
//console.log(nodes);
dom.attr(test,'title','hi');
const title=dom.attr(test,'title');
//js函数可以接受不同参数
console.log(`title:${title}`);

dom.text(test,'你好，这是新的内容');
dom.text(test);
dom.style(test,{border:'1px solid red',color:'blue'});
console.log(dom.style(test,'border'));
dom.style(test,'border','1px solid green');

//添加class
dom.class.add(test,'class-red');
dom.class.add(test,'class-blue');
dom.class.remove(test,'class-blue');
console.log(dom.class.has(test,'class-blue'));
console.log(dom.class.has(test,'class-red'));

//添加事件
const fn=()=>{
    console.log('点击了');
}
dom.on(test,'click',fn);
dom.off(test,'click',fn);
//查
//find,返回的是数组
const testDiv=dom.find('#test')[0];
console.log(testDiv);
//精确在那个div里找
console.log('------------');
const testDiv2=dom.find('#test2')[0];
console.log(dom.find('.p2',testDiv2)[0]);
console.log('------------');
console.log(dom.parent(test));
console.log(dom.siblings(dom.find('#e2')[0]));
console.log('------------');
console.log(dom.next(dom.find('#e2')[0]));
console.log(dom.previous(dom.find('#e2')[0]));
console.log('------------');
const t=dom.find('#empty')[0];//父元素也得加[0]
//遍历t的子元素，并加上操作
dom.each(dom.children(t),n=>dom.style(n,'color','red'));
console.log('------------');
console.log(dom.index.call(dom,dom.find('#e3')[0]))



