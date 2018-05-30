import React from 'react'
import style from './style.css'
import {Button} from 'antd'

export const Logined = (props) => (
    <div className={style.container}>
        <img src={require('./timg.jpeg')}/>
        <p className={style.center}>{props.userInfo.username}</p>
        {   
            props.userInfo.userType === 'admin' ?
            <div className={style.admin}>
            <p className={style.center}>{props.userInfo.userLevel}</p>
            <p className={style.center}>积分：{props.userInfo.points}</p>
            <Button onClick={() => props.history.push('/admin')} type="primary">发布物品</Button>
            </div> : null}
        <Button className={style.logout} type="default"><a href="/api/user/logout">退出登录</a></Button>
    </div>
);