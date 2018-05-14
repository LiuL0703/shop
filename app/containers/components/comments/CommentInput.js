import React, { Component } from 'react'
import {PropTypes} from 'prop-types'
import style from './index.css'

class CommentInput extends Component {
    static propTypes = {
        onSubmit: PropTypes.func
    }
    constructor () {
        super()
        this.state = {
        content: ''
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
        if (this.props.onSubmit) {
        this.props.onSubmit({
            content: this.state.content,
            createdTime:+new Date()
        })
        }
        this.setState({ content: '' })
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