const fs = require('fs')

// fs.stat('./html',(err,data)=>{
//     if(err){
//         console.log(err);
//         return;
//     }
//     console.log(`是文件:${data.isFile()}`);
//     console.log(`是目录:${data.isDirectory()}`);
// })
// fs.stat('./package.json', (err, data) => {
//     if (err) {
//         console.log(err);
//         return;
//     }
//     console.log(`是文件:${data.isFile()}`);
//     console.log(`是目录:${data.isDirectory()}`);
// })


//2,fs.mkdir
// fs.mkdir('./js',(err)=>{
//     if(err){
//         console.log(err);
//         return;
//     }
//     console.log(`创建成功`);
// })

// 3、fs.writeFile()
// fs.writeFile('./html/index.html','你好nodejs  符合日',(err)=>{
//     if(err){
//         console.log(err);
//         return;
//     }
//     console.log("创建写入成功");
// })


// 4、fs.appendFile()
// fs.appendFile('./css.base.css','body{color:red}',(err)=>{
//    if(err){
//     console.log(err);
//     return;
//    }
//    console.log('追加写入成功');
// })

// fs.appendFile('./css/base.css','h5{color:red}\n',(err)=>{
//     if(err){
//      console.log(err);
//      return;
//     }
//     console.log('追加写入成功');
//  })


// 5、fs.readFile()
// fs.readFile('./html/index.html',(err,data)=>{
//     if(err){
//         console.log(err);
//         return;
//     }
//     console.log(data);
//     //返回一个十六进制的东西 Buffer
//     console.log(data.toString());
// })


//6
// 、fs.readdir()
// fs.readdir('./html',(err,data)=>{
//     if(err){
//         console.log(err);
//         return;
//     }
//     console.log(data);
// })

//fs.rename()
// fs.rename('./css/base.css','./css/index.css',(err)=>{
//     if(err){
//         console.log(err);
//         return;
//     }
//     console.log('重命名成功');
// })

// fs.rename('./css/index.css','./html/index.css',(err)=>{
//     if(err){
//         console.log(err);
//         return;
//     }
//     console.log('移动文件成功');
// })

// 8、fs.rmdir()
fs.rmdir('./aaaa',(err)=>{
    if(err){
        console.log(err);
        return;
    }
    console.log('删除目录成功');
})

// 9、fs.unlink()
// fs.unlink('./aaaa/index.html',(err)=>{
//     if(err){
//         console.log(err);
//         return;
//     }
//     console.log('删除文件成功');
// })