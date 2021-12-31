//轮播图
const cheerio = require('cheerio')
const superagent = require('superagent')

superagent.get('https://36kr.com/p/1549832860337543').end((err,res)=>{
    // console.log(res.text);
    let $ = cheerio.load(res.text)
    // $('.article-wrapper .common-width').each((index,value)=>{
    //     // console.log('fguefeufgf',index,$(value));
    //     const item = $(value)
    //     const h1 = item.find('.article-title').text()
    //     const text = item.find('.item-a').text()
    //     console.log('gsofhs',h1,text);
    // })
    // console.log('hsiiiiii',$('h1').filter('.article-title.margin-bottom-20.common-width').text());
    console.log('hssdfh',$('.articleDetailContent').text());
})

// common-width margin-bottom-20
// "common-width content articleDetailContent kr-rich-text-wrapper"
// article-title margin-bottom-20 common-width