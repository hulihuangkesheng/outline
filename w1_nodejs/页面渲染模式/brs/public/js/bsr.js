// const goodslist = document.querySelector('.goodslist ul')
// const xhr = new XMLHttpRequest()

// xhr.onload = function(){
//     console.log(xhr.response);
//     //渲染
//     const goodsdata = xhr.response;
//     goodslist.innerHTML = goodsdata.map(item=>{
//         return `
//         <li data-id=${item.id}>
//         <h2>${item.name}</h2>
//         <p>${item.price}</p>
//         <button class="del">删除</button>
//         <button class="modify">修改</button>
//         </li>
//         `
//     }).join('')

//     xhr.responseType ='json'
//     xhr.open('get','http://localhost:3136/bsr/goods/list',true)

//     xhr.send()
// }


let goodsList = document.querySelector('.goodslist ul')
//获取数据渲染
const xhr = new XMLHttpRequest()
xhr.onload = function () {
    console.log(xhr.response);
    const goodsdata = xhr.response;
    //复杂化跨域 当初post、get、head请求方法之外 1、Access-Control-Allow-Methods:
    goodsList.innerHTML = goodsdata.map((item) => {
        return `
                <li data-id=${item.id}>
                <h2>${item.name}</h2>
                <p>${item.price}</p>
                <button class="del">删除</button>
                <button class="modify">修改</button>
                </li>
                `
    }).join('')
}
xhr.responseType = 'json'
xhr.open('get', 'http://localhost:3136/bsr/goods/list', true)
xhr.send()




//通过用事件委托获取id删除数据
goodsList.onclick = function (e) {
    if (e.target.className === 'del') {
        //通过dataset-获取与data- 有关的属性值
        console.log(JSON.stringify(e.target.parentElement.dataset));
        const {
            id
        } = e.target.parentElement.dataset;
        //通过路由删除数据
        const xhr = new XMLHttpRequest();
        xhr.open('delete', 'http://localhost:3136/brs/goods/' + id, true)
        xhr.send()
    } else {
        //通过请求头修改数据
        if (e.target.className == 'modify') {
            const {
                id
            } = e.target.parentElement.dataset;
            const xhr = new XMLHttpRequest();
            xhr.open('put', 'http://localhost:3136/bsr/goods/' + id, true)
            //设置请求头
            // xhr.setRequestHeader('Content-Type','application/json')
            xhr.setRequestHeader('Content-Type', 'application/json')
            xhr.send(`{"price":998,"oldprice":1998}`);
        }
    }
}