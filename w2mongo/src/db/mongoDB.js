/** @type {封装mongodb} */

const { MongClient } = require('mongodb')

const url = 'mongods://localhost:27127';
const dbName = 'H52110'
//创建并链接
// MongClient.connect(url,(err,client)=>{

// })

//1.创建客户端对象
const client =  new MongClient(url)

//2.连接mongDB
client.connect().then( async()=>{
    //3.匹配数据库
    const db = client.db(dbName)
    //4.选择集合
    const col = db.collection('user')

    //5.CRUD(创建:Create, 读取:Read,更新:Update,删除: Delete) 
    // col.insertMany([doc])
    // col.deleteMany(query)
    // col.updataMany(query,data)//data更新后数据
    // col.find(query)
    //cursor为一个指针
    let cursor = col.find()
    cursor = cursor.sort({age:-1})
    //toArray()杂项  $(selector).toArray()
    const res = await cursor.toArray()//可以直接将数据转换成Object[]数组

    console.log('res',res);

    //查询完成释放资源
    client.close();
} )
//命令行
// 1.mongo//链接数据库
// 2.use db //使用数据库
// 3.db.collection//使用集合
// 4.db.collection.find()//查询集合全部信息