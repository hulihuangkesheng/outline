//格式化数据
/**
 * @param {Object} [{
 *         code = 200,
 *         msg = 'success',
 *         data = []
 *     }={}] 判断
 * @return {Boolean} 
 */
function formatData({
    code = 200,
    msg = 'success',
    data = []
} = {}) {
    //当code==400时 msg == 'fail'
    if (code == 400 && msg === 'success') {
        msg = 'fail';
    }
    return {
        code,
        msg,
        data
    }
}

// formatData({code:200,msg:'success',data:[]})
formatData.success = function (data) {
    return formatData(data)
}
formatData.fail = function () {
    return formatData({
        code: 400
    })
}


/**
 *格式化前端数据
 * @param {Object} data
 * @param {Array} params
 * @return {} 
 */
function formatParams(data, params) {
    const newData = {}
    params.forEach(key => {
        let type;
        let value;
        if (typeof key === 'object') {
            type = key.type
            key = key.key
        }
        if (data[key] !== undefined) {
            value = data[key]
            //分析数据类型
            switch (type) {
                case 'number':
                    value = Number(value)
                    break;
                case 'boolean':
                    value = Boolean(value)
                    break;
            }
            newData[key] = value
        }
    })
    return newData
}
const { ObjectId } = require('mongoDB')

function formatId(){
    //Array ->{$in:[ObjectId,ObjectId]}
    if(Array.isArray(id)){
        return { $in:id.map(item=>formatId(item))}
    }
    //String -> ObjectId
    else if(typeof id === 'string'){
        return ObjectId(id)
    }
}

//秘钥（令牌）  插件 jsonwebtoken

const jwt = require('jsonwebtoken')
//私钥
// const privateKey = ''
const Token = {
    //生成token  expiresln保存的时间
    create(data, expiresln = '') {
        // sign指示牌  sign(a,b)
        const token = jwt.sign(
            //加密的数据
            data,
            //秘钥
            privateKey, {
                //有效期
                expiresln
            }
        );
        return token
    },
    //校验token
    verify(token) {
        let result;
        var data ;
        try {
            // 校验其实就是解密，校验成功则得到加密前的数据，否则报错
            data = jwt.verify(token,privateKey)
            result = ture;
        } catch (error) {
            result = false
        }
        return result;
    }
}



module.exports = {
    formatData,
    formatParams,
    Token,
    formatId
}