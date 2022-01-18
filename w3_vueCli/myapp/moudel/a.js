const username = 'xiaoxie'


//export 只能跟 function,class,var,let,const,default,{}
export {username}

//给模块对象添加default属性，值为100
// export default 100

//给模块对象添加default属性，值为一个对象
export default {
    a:10,
    b:20
}

const a = 10;
const b = 20;
//给模块对象批量添加属性
export {
    a,
    //修改属性名
    b as banana
}

//
