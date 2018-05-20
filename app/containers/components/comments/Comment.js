import React, { Component } from 'react'
import PropTypes from 'prop-types'
import style from './index.css'
class Comment extends Component {
    static propTypes = {
        comment:PropTypes.object.isRequired,
        index:PropTypes.number,
    }

    constructor(props){
        super(props);
        this.state = {
            timeString:'',
        }
    }
    componentWillMount() {
        this._updateTimeString()
        this._timer = setInterval(this._updateTimeString.bind(this),5000)
    }

    componentWillUnmount(){
        clearInterval(this._timer)
    }
    _updateTimeString(){
        const comment = this.props.comment;
        const username = this.props.username;
        const duration = (+Date.now() - comment.createdTime) / 1000
        this.setState({
            timeString:duration>60
            ?`${Math.round(duration/60)}分钟前`
            :`${Math.round(Math.max(duration,1))}秒前`
        })
    }

    _getProcessedContent(content){
        return content
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;")
            .replace(/`([\S\s]+?)`/g, '<code>$1</code>')
    }


    render () {
        return (
        <div className={style.comment}>
            <div className={style.commentUsername}>
            <span>{localStorage.getItem('username')}</span>：
            </div>
            <p dangerouslySetInnerHTML={{
            __html: this._getProcessedContent(this.props.comment.content)
            }} />
            <span className={style.commentCreatedtime}>
                {this.state.timeString}
            </span>
            
        </div>
        )
    }
}

export default Comment