const http = require("http");
const path = require("path");
const url  = require("url");
const fs   = require("fs");
  
const superagent = require("superagent");
const cheerio  = require("cheerio");

superagent
    .get("https://www.zhipin.com/job_detail/?city=100010000&source=10&query=%E5%89%8D%E7%AB%AF")
    .end((error,response)=>{
        //获取页面文档数据
        // console.log(response.text);
        var content = response.text;
        //cheerio也就是nodejs下的jQuery  将整个文档包装成一个集合，定义一个变量$接收
        var $ = cheerio.load(content);
        //定义一个空数组，用来接收数据
        var result=[];
        //分析文档结构  先获取每个li 再遍历里面的内容(此时每个li里面就存放着我们想要获取的数据)
        $(".job-list li .job-primary").each((index,value)=>{
            //地址和类型为一行显示，需要用到字符串截取
            //地址
            let address=$(value).find(".info-primary").children().eq(1).html();
            //类型
            let type=$(value).find(".info-company p").html();
            //解码
            address=unescape(address.replace(/&#x/g,'%u').replace(/;/g,''));
            type=unescape(type.replace(/&#x/g,'%u').replace(/;/g,''))
            //字符串截取
            let addressArr=address.split('<em class="vline"></em>');
            let typeArr=type.split('<em class="vline"></em>');
            //将获取的数据以对象的形式添加到数组中
            result.push({
                title:$(value).find(".name .job-title").text(),
                money:$(value).find(".name .red").text(),
                address:addressArr,
                company:$(value).find(".info-company a").text(),
                type:typeArr,
                position:$(value).find(".info-publis .name").text(),
                txImg:$(value).find(".info-publis img").attr("src"),
                time:$(value).find(".info-publis p").text()
            });
            // console.log(typeof $(value).find(".info-primary").children().eq(1).html());
        });
        let imgSQL = []
        //爬取图片
        result.map(item=>{
            const txImg = item.txImg;
            //拼接图片地址
            superagent.get('https'+txImg).then(res=>{

                const {pathname} = new URL(txImg)
                // console.log('img',res);
                const filename = path.basename(pathname)
                // console.log('file',filename);
                //** 请求图片方式一、
                // fs.writeFile('img',filename,res.body,(err)=>{
                //     console.log(err);
                // })

            //** 请求图片 方式二、createWriteStream 文件流
            const filePath = 'img' + filename
            //写入文件流
            const writeStream =  fs.createWriteStream(filePath)
            superagent.get(txImg).pipe(writeStream)
            })
            //写入数据库
            imgSQL = (`value`).join(',')
            // let sql = 'insert into goodslist values()'
        })
        //将数组转换成字符串
        result=JSON.stringify(result);
        //将数组输出到json文件里  刷新目录 即可看到当前文件夹多出一个boss.json文件(打开boss.json文件，ctrl+A全选之后 ctrl+K，再Ctrl+F即可将json文件自动排版)
        fs.writeFile("boss.json",result,"utf-8",(error)=>{
            //监听错误，如正常输出，则打印null
            if(error==null){
                console.log("恭喜您，数据爬取成功!请打开json文件，先Ctrl+A，再Ctrl+K,最后Ctrl+F格式化后查看json文件(仅限Visual Studio Code编辑器)");
            }
        });
    });　　