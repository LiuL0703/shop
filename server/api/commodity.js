import Express from 'express'

const router = Express.Router();
import Article from '../../models/commodity'
import {responseClient} from '../util'
const fs = require("fs");
const path = require('path');
const formidable = require('formidable');
const mongoose = require('mongoose');
var pic = [];
var pic_cp = [];
var url = '';

// 发布物品
router.post('/addArticle', function (req, res) {
    const {
        title,
        price,
        content,
        time,
        tags,
        isPublish,
        address,
        quality,
    } = req.body;
    const pics = pic;
    const author = req.session.userInfo.username;
    const coverImg =  pics[0];
    pic_cp = pic;
    pic = [];
    const viewCount = 0;
    const commentCount = 0;
    let tempArticle = new Article({
        title,
        price,
        content,
        isPublish,
        viewCount,
        commentCount,
        time,
        author,
        coverImg,
        tags:tags.split(','),
        address,
        pics,
        quality,   
    });
    tempArticle.save().then(data=>{
        responseClient(res,200,0,'发布成功',data)
    }).cancel(err=>{
        console.log(err);
        responseClient(res);
    });
});
// 图片上传
router.post('/upload',(req, res,next)=>{
    var form = new formidable.IncomingForm();
    var imageBuf;
    form.uploadDir = path.join(__dirname,'../../static/upload');
    form.keepExtensions = true;
    form.parse(req,function (err,fileds,files){
       if(err) next(err);
       res.send({status:200,data:'',msg:'success'});
    });
    form.on('file', function(name, file) {
        url = file.path;
    });
    form.on('end',function(){
        imageBuf = fs.readFileSync(url);
        var data = 'data:image/jpg;base64,'+ imageBuf.toString("base64");
        pic.push(data);
        fs.unlink(url);
    })
});
// 更新
router.post('/updateArticle',(req,res)=>{
    const {
        title,
        price,
        content,
        time,
        tags,
        isPublish,
        id,
        address,
        quality,
    } = req.body;
    if(pic.length == 0){
        pic = pic_cp;
        pic_cp = [];
    }
    coverImg = pic[0];
    const pics = pic;
    var coverImg ;
    pic = [];
    Article.update({_id:id},{title,price,address,quality,coverImg,content,time,tags:tags.split(','),isPublish,pics})
        .then(result=>{
            responseClient(res,200,0,'更新成功',result)
        }).cancel(err=>{
        console.log(err);
        responseClient(res);
    });
});


// 删除
router.get('/delArticle',(req,res)=>{
    let id = req.query.id;
    Article.remove({_id:id})
        .then(result=>{
            if(result.result.n === 1){
                responseClient(res,200,0,'删除成功!')
            }else{
                responseClient(res,200,1,'物品不存在');
            }
        }).cancel(err=>{
            responseClient(res);
    })
});

// 评论
router.post('/comments',(req,res)=>{
    const info = req.body;
    const id = mongoose.Types.ObjectId(info.id);
    const content = info.content;
    // const commentCount = info.commentCount;
    const createAt = info.createdTime;
    const username = req.session.userInfo.username;
    // const commentCount = info.info.commentCount+1;
    // Article.update({_id:id},{commentCount}).then(result=>{
    //     responseClient(res,200,0,'评论成功',result)
    // }).cancel(err=>{
    //     console.log(err);
    //     responseClient(res);
    // });
});

module.exports = router;