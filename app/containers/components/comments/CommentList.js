import React, { Component } from 'react'
import Comment from './Comment'
import {PropTypes} from 'prop-types'

// const data = JSON.parse(localStorage.getItem('comments'));
class CommentList extends Component {
    static propTypes = {
        comments:PropTypes.array,
        onDeleteComment:PropTypes.func
    }

    static defaultProps = {
        comments: []
    }

    handleDeleteComment(index){
        if(this.props.onDeleteComment){
            this.props.onDeleteComment(index)
        }
    }
    
    render() {
        console.log(this.props.comments);
        return (
        <div>
            {this.props.comments.map((comment, i) =>
            localStorage.getItem('userId')==comment.id?
            <Comment 
                index={i}
                onDeleteComment={this.handleDeleteComment.bind(this)}
                comment={comment} 
                key={i} />:null
            )}
        </div>
        )
    }
}

export default CommentList