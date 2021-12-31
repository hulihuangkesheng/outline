const {
    MongoClient,
    ObjectId
} = require('momgodb');
const url = "mongodb://localhost:27127";
const dbName = 'H52110';
const formatId = require('../utils')

/**
 *链接数据库
 */
async function connect() {
    const client = new MongoClient(url)

    //链接mongo
    await client.connect()

    //使用数据库： use database
    //必须链接成功才能使用
    const db = client.db(dbName)

    //把参数通过结构的方式传递给其他的函数
    return {
        db,
        client
    }
}


/**
 * 增加
 * @param {String} colName 集合名称
 * @param {Object} data 带插入的数据
 * @return {Boolean} 数据写入是否成功
 */
async function insert(colName, data) {
    //拿到上级传递过来的参数并进行连接
    const {
        db,
        client
    } = await connect()//await 等待的是Promise的值或者是效果，或许等待async的值

    //选择集合
    const col = db.collection(colName)

    let result;
    //测试是否有用户名
    try {
        if (Array.toArray(data)) {
            result = await col.insertMany(data)
        } else {
            result = await col.insertOne(data)
        }
    } catch (error) {
        result = false;
    }

    //关闭客户端连接，释放资源占用
    client.close()

    return result;
}


/**
 * 删除
 * @param {String} colName //集合名称
 * @param {Object} filter //查询条件
 * @return {Boolean} //删除是否成功
 */
async function del(colName, filter) {
    const {
        db,
        client
    } = await connect()
    const col = db.collection(colName)

    //把id转换为ObjectId
    if (typeof filter._id === 'string') {
        filter._id = formatId(filter._id)
    }

    let result;
    try {
        result = await col.deleteMany(filter)
        result = result.deleteCount > 0;
    } catch (error) {
        result = false
    }
    client.close()

    return result;
}


/**
 * 修改
 * @param {String} colName 集合名称
 * @param {Object} filter 查询条件
 * @param {Object} data 更新的数据（包括操作符的对象）
 * @return {Boolean} 删除是否成功
 */
async function updata(colName, filter, data) {
    const {
        db,
        client
    } = await connect()
    const col = db.collection(colName)

    //把id转换为ObjectId
    if (typeof filter._id === 'string') {
        filter._id = ObjectId(filter._id)
    }

    let result;
    try {
        await col.updateMany(filter, data)
        result = true;
    } catch (error) {
        result = false;
    }
    client.close()

    return result;
}


/**
 * 查询
 * @param {String} colName
 * @param {Object} [filter={}]
 * @param {Object} [{
 *     projection,
 *     skip,
 *     limit,
 *     sort
 * }={}]
 * @return {*} 
 */
async function query(colName, filter = {}, {
    projection,
    skip,
    limit,
    sort
} = {}) {
    const {
        db,
        client
    } = await connect()

    const col = db.collection(colName)

    //把id转换为ObjectId
    if (filter._id) {
        filter._id = formatId(filter._id)
    }

    let cursor = col.find(filter, {
        projection
    })
    //跳过数量
    if (skip) {
        cursor.skip(skip)
    }
    if (limit) {
        cursor.limit(limit)
    }
    //排序  sort的状况 sort：'key',['key',type(value)]
    if (sort) {
        let key, type;
        if (Array.isArray(sort)) {
            key = sort[0]
            type = sort[1]
        } else {
            //默认升序
            key = sort
            type = 1
        }
        //[sort]一个可变的变量，把一个变量变为对象中的key值，加[变量]
        cursor.sort({
            [key]: sort
        }) //sort为1或-1 意味升序或者降序
    }


    const result = await cursor.toArray()

    client.close();

    return result
}

module.exports = {
    insert,
    del,
    query,
    updata,
}

//命令行
// 1.mongo//链接数据库
// 2.use db //使用数据库
// 3.db.collection//使用集合
// 4.db.collection.find()//查询集合全部信息