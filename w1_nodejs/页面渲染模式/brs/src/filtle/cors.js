/*
 * CORS跨域问题
   whilelist 允许跨域的域名

*/
const whilelist = ["http://localhost:8080","http://localhost:3136"]
module.exports = function(req,res,next){
    // //当有多个端口不一样的时候
    // const Origin = req.get(Origin)
    //判断是否在白名单中
    if(whilelist.includes(req.get('Origin'))){
        res.set({
            'Access-Control-Allow-Origin':req.get('Origin')
        })
    }
         // res.set({
    //     'Access-Control-Allow-Origin':'*'
    // })
    if(req.method == 'OPTIONS'){
        res.header("Access-Control-Allow-Headers","Content-type,Content-length,Accept,Authorization,X-Requested-With")
        res.header("Access-Control-Allow-Methods","PUT,DELETE,POST,GET,PATCH,OPTIONS");
        res.sendStatus (200)
    }else{
        next()
      }
    
}