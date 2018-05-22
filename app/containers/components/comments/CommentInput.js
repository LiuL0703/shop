import React, { Component } from 'react'
import {PropTypes} from 'prop-types'
import style from './index.css'
import {post} from '../../../fetch/fetch';
class CommentInput extends Component {
    static propTypes = {
        onSubmit: PropTypes.func
    }
    constructor () {
        super()
        this.state = {
            username:'',
            content: ''
        }
    }
    componentWillMount() {
        this._loadUsername();
    }
    _loadUsername(){
        const username = localStorage.getItem('username');
        if(username){
            this.setState({
                username
            })
        }
    }

    componentDidMount() {
        this.textarea.focus()
    }
    handleContentChange (event) {
        this.setState({
        content: event.target.value
        })
    }

    handleSubmit () {
        const id = localStorage.getItem('userId');
        if(localStorage.getItem('username')=='undefined'){
            alert('未注册，不能评论，请注册');
            return false;
        }
        var data = {
            id:id,
            username:this.state.username,
            content:this.state.content,
            createdTime:+new Date()
        }
        if (this.props.onSubmit) {
            this.props.onSubmit({
                userInfo:this.state.username,
                content: this.state.content,
                createdTime:+new Date(),
                id:id,
            })
        }
        this.setState({ content: '' });
        post('/admin/article/comments',data);
    }

    render () {
        return (
        <div className={style.commentInput}>
            <div className={style.commentField}>
            <div className={style.commentFieldInput}>
                <textarea
                ref={(textarea)=>this.textarea = textarea}
                value={this.state.content}
                onChange={this.handleContentChange.bind(this)} />
            </div>
            </div>
            <div className={style.commentFieldButton}>
            <button
                onClick={this.handleSubmit.bind(this)}>
                评论
            </button>
            </div>
        </div>
        )
    }
}

export default CommentInput