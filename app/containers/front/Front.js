import React,{Component,PropTypes} from 'react'
import {connect} from 'react-redux'
import {Detail} from '../detail'
import {Home} from '../home'
import style from './style.css'
import {
    Switch,
    Route
} from 'react-router-dom'
import Banner from "../components/banner/Banner";
import Menus from "../components/menu/Menus";
import NotFound from "../../components/notFound/NotFound";
import {bindActionCreators} from 'redux'
import {actions} from '../../reducers/adminManagerTags'
import {actions as FrontActinos} from '../../reducers/frontReducer'
import Login from "../home/components/login/Login";
import {Logined} from "../home/components/logined/Logined";
import {actions as IndexActions} from '../../reducers/index';
import { Input } from 'antd';
const Search = Input.Search;
const {get_all_tags} = actions;
const {get_article_list} = FrontActinos;

class Front extends Component{
    constructor(props){
        super(props);
        this.state = {
            isPrice:false,
            isQuality:false,
        }
        this.handleChangePrice = this.handleChangePrice.bind(this);
        this.handleChangeQuality = this.handleChangeQuality.bind(this);
    }
    handleChange(value){
        localStorage.setItem('searchValue',value);
    }

    handleChangePrice(event){
        var value = event.target.checked;
        console.log(value); 
        localStorage.setItem('isPrice',value);
        this.setSatae({
            isPrice:!value
        })
    }

    handleChangeQuality(event){
        var value = event.target.checked;
        console.log(value); 
        localStorage.setItem('isQuality',value);
        this.setSatae({
            isQuality:!value
        })
    }
    render(){
        console.log(this.props);
        const {url} = this.props.match;
        const {login, register} = this.props;
        localStorage.setItem('username',this.props.userInfo.username);
        localStorage.setItem('userId',this.props.userInfo.userId);
        return(
            <div>
                <div>
                    <Banner/>
                    {/* <div>
                        <Search className={style.searchInput} placeholder="输入想要查找的关键字" size="large" onSearch={(value)=>this.handleChange.bind(this)(value)} />
                        <p>
                            <span className={style.price}>按价格：从高到低
                                <input 
                                    type='checkbox'
                                    name="isPrice"
                                    checked = {this.state.isPrice}
                                    onChange={this.handleChangePrice}/>
                            </span>
                            <span className={style.quality}>按成色：由新到旧
                                <input 
                                    type="checkbox"
                                    name="isQuality" 
                                    checked = {this.state.isQuality}
                                    onChange={this.handleChangeQuality}/>
                            </span>
                        </p>
                    </div> */}
                    <Menus getArticleList={(tag)=>this.props.get_article_list(tag,1)} categories={this.props.categories} history={this.props.history}/>
                </div>
                <div className={style.container}>
                    <div className={style.contentContainer}>
                        <div className={style.content}>
                            <Switch>
                                <Route exact path={url} component={Home}/>
                                <Route path={`/detail/:id`} component={Detail}/>
                                <Route path={`/:tag`} component={Home}/>
                                <Route component={NotFound}/>
                            </Switch>
                        </div>
                        <div className={`${style.loginContainer}`}>
                            {this.props.userInfo.userId ?
                                <Logined history={this.props.history} userInfo={this.props.userInfo}/> :
                                <Login login={login} register={register}/>}
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    componentDidMount() {
        this.props.get_all_tags();
    }
}

Front.defaultProps = {
    categories:[]
};

Front.propTypes = {
    categories:PropTypes.array.isRequired
};

function mapStateToProps(state) {
    return{
        categories:state.admin.tags,
        userInfo: state.globalState.userInfo
    }
}
function mapDispatchToProps(dispatch) {
    return{
        get_all_tags:bindActionCreators(get_all_tags,dispatch),
        get_article_list:bindActionCreators(get_article_list,dispatch),
        login: bindActionCreators(IndexActions.get_login, dispatch),
        register: bindActionCreators(IndexActions.get_register, dispatch)
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Front)