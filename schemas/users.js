/**
 * 用户的表结构
 */
import mongoose from 'mongoose'

module.exports = new mongoose.Schema({
    username:String,
    password:String,
    type:String, //会员、普通用户
    level:{
        type:String,
        default:'普通会员'
    },  // 会员等级
    points:{
        type:Number,
        default:1000
    },  // 积分
});