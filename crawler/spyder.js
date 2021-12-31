const http = require("http");
const path = require("path");
const url = require("url");
const fs = require("fs");

const superagent = require("superagent");
const cheerio = require("cheerio");

const request = require('request')


request('https://movie.douban.com/review/best/', function (err, response, body) {
    // console.log('body',body);

    //提取需要的数据
    const $ = cheerio.load(body)
    var listdata = []
    $('.review-list .main').each((idx, item) => {
        //  console.log($(item));
        const $item = $(item)
        //方法一、
        const id = $item.attr('data-cid')
        //方法二、
        // const id = $item.data('cid')
        const name = $item.find('.main-hd .name').text()
        // const img1 = $(item).find('.main-hb .allstar50')
        //代码优化，性能好 这里的$(item)只被调用一次
        const img1 = $item.find('.main .subject-img img').attr('src')
        const imgurl = $item.find('.main .main-hd .avator').children('img').attr('src')
        const time = $item.find('.main .mian-hd .main-meta').text()
        const title = $item.find('.main .main-bd h2 a').text()
        const title2 = $item.find('.main .main-bd .review-short .short-content').children('.spoiler-tip').text()
        const neiyong = $item.find('.main .main-bd .review-short .short-content').text()

        const list = {
            id,
            name,
            img1,
            imgurl,
            time,
            title,
            title2,
            neiyong,
        }

        listdata.push(list)
    })
    //爬取图片地址
    // $('img', '')
    console.log('listdata', listdata);


    let imgSQL = []
    //爬取图片
    listdata.map(item => {
        const imgurl = item.imgurl;
        //拼接图片地址
        superagent.get(imgurl).then(res => {
            const {
                pathname
            } = new URL(imgurl)
            // console.log('img',res);
            const filename = path.basename(pathname)
            // console.log('file',filename);
            //** 请求图片方式一、
            // fs.writeFile('img',filename,res.body,(err)=>{
            //     console.log(err);
            // })

            //** 请求图片 方式二、createWriteStream 文件流
            const filePath = '/img' + filename
            //写入文件流
            const writeStream = fs.createWriteStream(filePath)
            superagent.get(imgurl).pipe(writeStream)
        })
        //写入数据库
        // imgSQL = (`value`).join(',')
        // let sql = 'insert into goodslist values()'
    })
})



// request(src).pipe(fs.createWriteStreaam(filename))