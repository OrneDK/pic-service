const fs = require('fs')
const path = require('path')
const express = require('express')
const Picture = require('../../models/Picture')
const router = express.Router()
const multer = require('multer')
const moment = require('moment')
moment.locale('zh-cn')// 汉化
//创建文件夹
var createFolder = function (folder) {
    try {
        fs.accessSync(folder);
    } catch (e) {
        fs.mkdirSync(folder);
    }
};
//这个路径为文件上传的文件夹的路径
var uploadFolder = 'upload';

createFolder(uploadFolder);
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadFolder);    // 保存的路径，备注：需要自己创建
    },
    filename: function (req, file, cb) {
        var extname = path.extname(file.originalname);//获取文件扩展名
        // 将保存文件名设置为 字段名 + 时间戳+文件扩展名，比如 logo-1478521468943.jpg
        cb(null, file.fieldname + '-' + Date.now() + extname);
    }
});
// 通过 storage 选项来对 上传行为 进行定制化
var upload = multer({ storage: storage });
/**
 *  $route GET api/test
 *  desc  返回的请求json数据
 *  access public
 */
router.get('/test', (req, res) => {
    res.json({
        msg: 'upload success'
    })
})
/**
 *  $route POST api/upload
 *  desc  上传单张图片
 *  access 
 */
router.post('/upload', upload.single('img'), (req, res) => {
    let picture = {
        name: req.file.filename,
        type: req.file.mimetype,
        address: `http://img.ornedk.cn/img/${req.file.filename}`,
    }
    Picture.create(picture, (err, doc) => {
        if (err) {
            res.json({
                status: 400,
                data: {},
                msg: '上传失败',
            })
        } else {
            res.json({
                status: 200,
                data: {},
                msg: '上传成功',
            })
        }
    })
})
/**
 *  $route GET api/imgs
 *  desc  获取所有图片
 *  access 
 */

router.get('/imgs', async (req, res) => {
    const pageNum = Number(req.query.pageNum || req.body.pageNum); // 第几页的数据
    const pageSize = Number(req.query.pageSize || req.body.pageNum); // 一页显示几条数据    
    const total = await Picture.find({}).countDocuments();
    const list = await Picture.find({}).skip((pageNum - 1) * pageSize).limit(pageSize);
    const pages = Math.ceil(total / pageSize); // 一共显示多少页
    if (list.length > 0) {
        res.json({
            status: 200,
            data: {
                list,
                total,
                pageNum,
                pageSize,
                pages
            },
            msg: '请求成功'
        })
    } else {
        res.json({
            status: 200,
            data: {},
            msg: '暂无数据',
        })
    }
})

router.delete('/delete/:id', (req, res) => {
    Picture.findOne({ _id: req.params.id }).then(picture => {
        if (picture === null) {
            res.json({
                status: 400,
                data: {},
                msg: '删除失败,请查询图片id后再试~'
            })
        } else {
            Picture.findOneAndRemove({
                _id: req.params.id
            }).then(picture => {
                res.json({
                    status: 200,
                    data: {},
                    msg: '删除成功'
                })
            }).catch(err => {
                res.status(404).json({
                    status: 404,
                    data: {},
                    msg: err
                })
            })
        }
    })
})
module.exports = router