import React, {Component, PropTypes} from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {
    Redirect
} from 'react-router-dom'
import style from './style.css'
import ArticleList from "./components/articelList/ArticleList";
import {Pagination} from 'antd';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {actions as frontActions} from '../../reducers/frontReducer'
const {get_article_list,get_article_detail} = frontActions;
import { Input,Icon } from 'antd';
const Search = Input.Search;
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data:this.props.articleList,
            sortByPrice:true,
            sortByQuality:false,
        }
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
    }
    handleChange(value){
        var reg = new RegExp(value,'gi');
        var data;
        if(value!==''){
            data = this.props.articleList.filter((item,index)=>{
                return item.title.indexOf(value)!== -1;
            });
            console.log('=========')
            console.log(this.props.articleList)
            console.log(data);
        }else{
            data = this.props.articleList
        }
        if(this.state.sortByPrice){
            data.sort((a,b)=>{
                return b.price - a.price;
            })
        }else{
            data.sort((a,b)=>{
                return a.price - b.price;
            })
        }
        if(this.state.sortByQuality){
            data.sort((a,b)=>{
                return b.quality - a.quality;
            })
        }
        this.setState({
            data:data,
        })
    }
    handlePrice(){
        this.setState({
            sortByPrice:!this.state.sortByPrice
        })
    }
    handleQuality(){
        this.setState({
            sortByQuality:!this.state.sortByQuality
        })
    }
    render() {
        const {tags} = this.props;
        console.log(this.state.data);
        return (
            tags.length > 1 && this.props.match.params.tag && (tags.indexOf(this.props.match.params.tag) === -1 || this.props.location.pathname.lastIndexOf('\/') > 0)
                ?
                <Redirect to='/404'/>
                :
                <div className={style.container}>
                    <div className={style.searchDiv}>
                        <Search 
                            className={style.searchInput} 
                            placeholder="输入想要查找的关键字" 
                            size="large" 
                            onSearch={(value)=>this.handleChange.bind(this)(value)} />
                        <div className={style.sorted}>
                            <span onClick={this.handlePrice.bind(this)}>{this.state.sortByPrice? <Icon type="arrow-up" />: <Icon type="arrow-down" />}按价格排序</span>
                            <span onClick={this.handleQuality.bind(this)}>{this.state.sortByQuality? <Icon type="arrow-up" />: <Icon type="arrow-down" />}按成色排序</span>
                        </div>
                    </div>
                    <ArticleList
                        history={this.props.history}
                        data={this.state.data}
                        getArticleDetail={this.props.get_article_detail}
                    />
                    <div className={style.paginationContainer}>
                        <Pagination
                            defaultPageSize={16}
                            onChange={(pageNum) => {
                                this.props.get_article_list(this.props.match.params.tag || '', pageNum);
                            }}
                            current={this.props.pageNum}
                            total={this.props.total}/>
                    </div>
                </div>
        )
    }
    
    componentDidMount() {
        this.props.get_article_list(this.props.match.params.tag || '')
    }
}

Home.defaultProps = {
    userInfo: {},
    pageNum: 1,
    total: 0,
    articleList: []
};

Home.propsTypes = {
    pageNum: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
    articleList: PropTypes.array.isRequired
};

function mapStateToProps(state) {
    return {
        tags: state.admin.tags,
        pageNum: state.front.pageNum,
        total: state.front.total,
        articleList: state.front.articleList
    }
}

function mapDispatchToProps(dispatch) {
    return {
        get_article_list: bindActionCreators(get_article_list, dispatch),
        get_article_detail:bindActionCreators(get_article_detail,dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);