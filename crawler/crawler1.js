const superagent = require('superagent')
const cheerio = require('cheerio')

superagent.get('https://36kr.com/')
    .end((err, res) => {
        // console.log('res.text',res.text);
        var content = res.text
        var $ = cheerio.load(content);
        var result = []
        //列表
        $('.kr-home-flow-list .kr-home-flow-item').each((idx, value) => {
            // console.log($(value));
            let item = $(value)
            // console.log(idx);
            result.push = ({
                imgurl: item.find('.article-item-pic img').attr('src'),
                title: item.find('.article-item-title ').text(),
                text: item.find('.article-item-description').text(),
                sp1: item.find('.kr-flow-bar-motif').text(),
                a: item.find('.kr-flow-bar a').text(),
                author: item.find('.kr-flow-bar-author').text(),
                time: item.find('.kr-flow-bar-time').text()
            })

            // console.log('result',result);

            var result1 = []
            item.find('.specialtopic-recommend-item').each((idx, value) => {
                // console.log('value',$(value));
                // console.log('idddd', idx);
                let item1 = $(value)
                result1.push = ({
                    tetp1: item1.find(`.ellipsis-2`).text(),
                    tetp2: item1.find('.ellipsis-3').text()
                })

                // console.log('result1',result1);
                return;

            })
        })


        //轮播图
        $('.carousel-content .carousel-item-wrapper').each((idx, value) => {
            // console.log($(value))
            let item = $(value)
            let result3 = []
            result3.push({
                imgurl: item.find('.banner-left-item-pic').attr('src'),
                txt: item.find('.banner-left-title ').text()
            })
            // console.log('result3',result3);
        })

        //right
        $('.banner-right-list .banner-right-item').each((index, value) => {
            // console.log($(value));
            // console.log('hsfjdi',index);
            let item = $(value)
            let result4 = []
            result4.push({
                id: index,
                imgurl: item.find('.kr-ad-home-banner-right-main img').attr('src'),
                txt: item.find('.weight-bold ').text()
            })
            // console.log(result4);
        })


        //right2
        $('.column-newsflash-main .column-newsflash-item').each((index, value) => {
            // console.log(index);
            let item = $(value)
            let result5 = []
            result5.push({
                id: index,
                text: item.find('.column-newsflash-item-title').text(),
                time: item.find('.column-newsflash-item-time').text(),
                txtp: item.find('.column-newsflash-item-detail  p').text(),
            })
            // console.log(result5);
        })


        //banner2
        $('.carousel-content .carousel-item-wrapper').each((index, value) => {
            // console.log(index);
            let item = $(value)
            let result6 = []
            result6.push({
                id: index,
                imgurl: item.find('.early-project-item .early-project-pic img').attr('src'),
                tiltext: item.find('.early-project-content .tittle ').text(),
                text: item.find('.early-project-content .brief ').text(),
            })
            // console.log(result6);
        })


        //list
        //banner2
        $('.recom-enterprise-list .recom-enterprise-item').each((index, value) => {
            // console.log(index);
            let item = $(value)
            let result7 = []
            result7.push({
                id: index,
                imgurl: item.find('.recom-enterprise-item-banner-pic img').attr('src'),
                tiltext: item.find('.recom-enterprise-item-banner-title  ').text(),
                text: item.find('.recom-enterprise-item-banner-follow  ').text(),
                atext: item.find('.recom-enterprise-item-article ').text()
            })
            // console.log(result7);
        })



        //right list
        $('.hotlist-main .hotlist-item-toptwo').each((index, value) => {
            // console.log(index);
            let item = $(value)
            let result8 = []
            result8.push({
                id: index,
                imgurl: item.find('.hotlist-item-toptwo-pic img').attr('src'),
                tiltext: item.find('.hotlist-item-toptwo-title .weight-bold  ').text(),
            })
            // console.log(result8);
            // })
            $('.hotlist-main .hotlist-item-other').each((index, value) => {
                // console.log(index);
                let item = $(value)
                // let result8 = []
                result8.push({
                    id: index,
                    imgurl: item.find('.hotlist-item-other-pic a img').attr('src'),
                    tiltext: item.find('.hotlist-item-other-title    ').text(),
                })
                // console.log(result8);
            })

        })
        // footer1
        $('.list-wrapper li').each((index, value) => {
            console.log(index);
            let item = $(value)
            let result9 = []
            result9.push({
                id: index,
                tiltext: item.find('a').text(),
            })
            console.log(result9);
        })


        // footer2
        $('.footer-partner li').each((index, value) => {
            console.log(index);
            let item = $(value)
            let result9 = []
            result9.push({
                id: index,
                imgurl: item.find('a img').attr('src'),
            })
            console.log(result9);
        })

    })