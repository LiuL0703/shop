import React, { Component } from 'react'
import CommentInput from './CommentInput'
import CommentList from './CommentList'
import style from './index.css'
class Comments extends Component {
	constructor () {
		super();
		this.state = {
			comments: []
		}
	}
	componentWillMount() {
		this._loadComments();
	}
	_loadComments(){
		let comments = localStorage.getItem('comments');
		let username = localStorage.getItem('username');
		if(comments){
			comments = JSON.parse(comments)
			this.setState({
				username,
				comments
			})
		}
	}
	_saveComments(comments){
		localStorage.setItem('comments',JSON.stringify(comments))
	}
	handleSubmitComment (comment) {
		if (!comment) return
		if (!comment.content) return alert('请输入评论内容')
		const comments = this.state.comments;
		comments.push(comment)
		this.setState({comments})
		this._saveComments(comments)
	}
	handleDeleteComment(index){
		const comments = this.state.comments;
		comments.splice(index,1)
		this.setState({comments})
		this._saveComments(comments)
	}
	render() {
		return (
		<div className={style.wrapper}>
			<CommentList 
				onDeleteComment={this.handleDeleteComment.bind(this)}
				comments={this.state.comments}
				username={this.state.username}
			/>
			<CommentInput onSubmit={this.handleSubmitComment.bind(this)} />
			
		</div>
		)
	}
}

export default Comments