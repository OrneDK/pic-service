const fs = require('fs');
const path = require('path')
const express = require('express');
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
// const session = require('express-session')
// const MongoStore = require('connect-mongo')(session)
const key = require('./config/key')
// 引入路由
const picture = require('./routers/api/picture')

// 初始化express
const app = express();
const port = process.env.PORT || 3000
app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.json())
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", req.headers.origin);
    // res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("X-Powered-By", ' 3.2.1')
    if (req.method === "OPTIONS") res.send(200);/*让options请求快速返回*/
    else next();
});

app.get('/', (req, res) => {
    res.send('express Success');
})

app.use('/api/picture', picture)


app.listen(port, (err) => {
    if (err) {
        console.log('端口被占用');
    } else {
        console.log(`node服务:${port}端口启动成功,正在启动数据库....`);
        // 连接mongoose
        mongoose.connect(key.dbUrl, { useNewUrlParser: true, useUnifiedTopology: true }).then(function () {
            console.log("数据库连接成功!");
        }).catch(err => {throw new Error(err)})
    }
})













// const createFolder = function (folder) {
//     try {
//         fs.accessSync(folder);
//     } catch (e) {
//         fs.mkdirSync(folder);
//     }
// };
// createFolder(key.uploadFolder);

// // 通过 filename 属性定制
// var storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, uploadFolder);    // 保存的路径，备注：需要自己创建
//     },
//     filename: function (req, file, cb) {
//         var fileFormat = (file.originalname).split(".");
//         // 将保存文件名设置为 字段名 + 时间戳，比如 logo-1478521468943
//         cb(null, file.fieldname + '-' + Date.now() + "." + fileFormat[fileFormat.length - 1]);
//     }
// });

// // 通过 storage 选项来对 上传行为 进行定制化
// var upload = multer({ storage: storage })

// // 单图上传
// app.post('/upload', upload.single('logo'), function (req, res, next) {
//     var file = req.file;
//     res.send({ ret_code: '0' });
// });

// app.get('/', function (req, res, next) {
//     var form = fs.readFileSync('./client/index.html', { encoding: 'utf8' });
//     res.send(form);
// });

// app.listen(port);