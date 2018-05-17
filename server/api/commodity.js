import Express from 'express'

const router = Express.Router();
import Article from '../../models/commodity'
import {responseClient} from '../util'
const path = require('path');
const formidable = require('formidable');
var pic = [];
var url = '';
router.post('/addArticle', function (req, res) {
    const {
        title,
        price,
        content,
        time,
        tags,
        isPublish,
        address,
    } = req.body;
    const pics = pic;
    const author = req.session.userInfo.username;
    const coverImg =  `/upload/${pic[0].split('/')[9]}`;
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
    });
    tempArticle.save().then(data=>{
        responseClient(res,200,0,'发布成功',data)
    }).cancel(err=>{
        console.log(err);
        responseClient(res);
    });
});
router.post('/upload',(req, res,next)=>{
    var form = new formidable.IncomingForm();
    form.uploadDir = path.join(__dirname,'../../static/upload');
    form.keepExtensions = true;
    form.parse(req,function (err,fileds,files){
       if(err) next(err);
       res.send({status:200,data:'',msg:'success'});
    });
    form.on('file', function(name, file) {
        url = file.path;
        pic.push(url);
    });
    form.on('end',function(){
        console.log('eeeeeeeeend')
    })
});

router.post('/comments',(req,res)=>{
    const info = req.body;
    const id = info.id;
    const comment = info.comment;
    const commentCount = info.commentCount;
    const createAt = Date.now();
    const user = req.session.userInfo.username;
    Article.update({_id:id},{$push:{
        comments:{user:user,content:content,createAt:createAt}
    }}).then(result=>{
        responseClient(res,200,0,'评论成功',result)
    }).cancel(err=>{
        console.log(err);
        responseClient(res);
    });
});


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
    } = req.body;
    const pics = pic;
    const coverImg =  `/upload/${pic[0].split('/')[9]}`;
    console.log(pic);
    pic = [];
    Article.update({_id:id},{title,price,address,coverImg,content,time,tags:tags.split(','),isPublish,pics})
        .then(result=>{
            responseClient(res,200,0,'更新成功',result)
        }).cancel(err=>{
        console.log(err);
        responseClient(res);
    });
});



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

module.exports = router;