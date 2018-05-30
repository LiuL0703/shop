import React from 'react'
import style from './style.css'
import {Link} from 'react-router-dom'
import {Icon} from 'antd'

export const ArticleListCell = (props)=>(
    <div className={`${style.container} `} onClick={()=>{props.history.push(`/detail/${props.data._id}`,{id:props.data._id});props.getArticleDetail(props.data._id)}}>
        <div>
            <img src={props.data.coverImg} alt=""/>
        </div>
        <div className={style.bottomContainer}>
            <p className={style.title}>
                {props.data.title}
            </p>
            <p className={style.quality}>【{props.data.quality}】成新</p>
            <p className={style.summary}>
                <span className={style.price}>￥</span>{props.data.price}
            </p>
            <p className={style.address}><Icon type="environment-o" style={{ fontSize: 14, color: '#08c',marginRight:4 }} />交易地点：{props.data.address}</p>
            <div>
                <p>
                    <span>
                        <img src={require('./calendar.png')} alt="发表日期"/>
                        {props.data.time}
                    </span>
                    <span>
                        <img src={require('./views.png')} alt="被查看次数"/>
                        {props.data.viewCount}
                    </span>
                    <span>
                        <img src={require('./comments.png')} alt="评论数"/>
                        {props.data.commentCount}
                    </span>
                </p>
            </div>
        </div>
    </div>
);