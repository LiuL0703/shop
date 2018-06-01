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
import { Input } from 'antd';
const Search = Input.Search;
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data:this.props.articleList
        }
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
    }
    handleChange(value){
        var reg = new RegExp(value,'gi');
        var data;
        if(value!==''){
            data = this.props.articleList.filter((item,index)=>{
                return reg.test(item.title);
            })
        }else{
            data = this.props.articleList
        }
        this.setState({
            data:data,
        })
    }
    render() {
        const {tags} = this.props;
        // localStorage.setItem('userInfo', JSON.stringify(this.props.userInfo));
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