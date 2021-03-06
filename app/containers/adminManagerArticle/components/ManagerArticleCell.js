import style from '../style.css'
import React from 'react'
import {Button} from 'antd'

var pub = {
    color:'green'
}
var unPub = {
    color:'red'
}
export const ManagerArticleCell = (props)=>(
    <div className={style.cellContainer}>
        <div className={style.cellAboutArticle}>
            <p className={style.articleTitle}>{props.data.title}</p>
            <p className={style.articleInfo}>
                <span>发布者:{props.data.author}</span>
                <span>被查看:{props.data.viewCount}</span>
                {/* <span>评论数:{props.data.commentCount}</span> */}
                <span>发布时间:{props.data.time}</span>
            </p>
        </div>
        <div className={style.cellState}>
            
                {props.data.isPublish
                    ? <span style={pub}>已发布</span>
                    :<span style={unPub}>未发布</span>}
            
        </div>
        <div className={style.cellOperation}>
            <Button type='primary' icon="gift" onClick={()=>{props.edit_article(props.data._id);props.history.push('/admin/newArticle')}}>编辑</Button>
            <Button type='danger' icon="delete" onClick={()=>{
                        if(confirm('是否已出售')){
                            props.delete(props.data._id);
                        } 
                        props.delete(props.data._id)
                    }
                }>撤销</Button>
            <Button type='' icon="eye-o" onClick={()=>{props.history.push(`/detail/${props.data._id}`,{id:props.data._id});props.getArticleDetail(props.data._id)}}>查看</Button>
        </div>
    </div>
);