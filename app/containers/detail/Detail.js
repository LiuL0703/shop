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
        const {articleContent,title,author,quality,viewCount,commentCount,time,pics,price} = this.props;
        return(
            pics!=undefined ?
            <div>
                <div className={style.container}>
                    <h2>{title}</h2>
                    <p className={style.quality}>【{quality}成新】</p>
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
                        <img src={pics[0]} key='1' />
                       {
                           pics[1] !==undefined ?<img src={pics[1]} key='2'/>:null
                       } 
                       {
                           pics[2] !==undefined ?<img src={pics[2]} key='3' />:null
                       } 
                       {
                           pics[3] !==undefined ?<img src={pics[2]} key='4' />:null
                       } 
                       {
                           pics[4] !==undefined ?<img src={pics[2]} key='5' />:null
                       } 
                    </div>
                </div>
                <Comments />
            </div>:null
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
    const {content,title,author,viewCount,commentCount,time,pics,price,quality} = state.front.articleDetail;
    return{
        articleContent:content,
        title,
        author,
        viewCount,
        commentCount,
        time,
        pics,
        price,
        quality,
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