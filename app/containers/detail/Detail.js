import React,{Component} from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {bindActionCreators} from 'redux'
import remark from 'remark'
import {connect} from 'react-redux'
import {actions} from "../../reducers/frontReducer";
const {get_article_detail} = actions;
import reactRenderer from 'remark-react'
import style from './style.css'
import Comments from '../components/comments/index'

class Detail extends Component{
    constructor(props){
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    render(){
        console.log(this.props);
        const {articleContent,title,author,viewCount,commentCount,time,pics,price} = this.props;
        return(
            <div>
                <div className={style.container}>
                    <h2>{title}</h2>
                    <p className={style.price}><span>￥</span>{price}</p>
                    <div className={style.articleInfo}>
                        <span >
                            <img className={style.authorImg} src={require('./author.png')}/> {author}
                        </span>
                        <span>
                            <img src={require('./calendar.png')}/> {time}
                        </span>
                        
                        <span>
                            <img src={require('./views.png')}/> {viewCount}
                        </span>
                    </div>
                    <div id='preview' className={style.content}>
                        <p>{articleContent}</p>
                    </div>
                    <div className={style.picwall}>
                        <img src={require(`../../../static/upload/upload_8f93d262bdc6a2ecd4b11c0971e569f7.jpg`)} />
                    </div>
                </div>
                <Comments />
            </div>
        )
    }
    componentWillMount() {
        this.props.get_article_detail(this.props.location.state.id);
        
    }
    componentDidMount() {
        this.props.get_article_detail(this.props.location.state.id);
        localStorage.setItem('userId',this.props.location.state.id);
    }
}

function mapStateToProps(state) {
    const {content,title,author,viewCount,commentCount,time,pics,price} = state.front.articleDetail;
    return{
        articleContent:content,
        title,
        author,
        viewCount,
        commentCount,
        time,
        pics,
        price,
    }
}

function mapDispatchToProps(dispatch) {
    return{
        get_article_detail:bindActionCreators(get_article_detail,dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Detail);