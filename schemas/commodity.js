/**
 * commodity 表结构
 **/

import mongoose from 'mongoose'

module.exports = new mongoose.Schema({
    title:String,//标题
    content:String,//描述
    viewCount:Number,//浏览次数
    commentCount:Number,//评论次数
    time:String,//发表时间
    coverImg:String,//封面图片
    author:String,//作者
    tags:Array,//标签
    isPublish:Boolean,//是否发布
    address:String, // 地址
    price:Number, // 价格
    pics:Array, // 上传图片    
});