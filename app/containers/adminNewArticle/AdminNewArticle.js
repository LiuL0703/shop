import React, {Component, PropTypes} from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import style from './style.css'
import {Input, Select, Button, Modal,InputNumber} from 'antd';
import {actions} from "../../reducers/adminManagerNewArticle";
import {actions as tagActions} from "../../reducers/adminManagerTags";
import dateFormat from 'dateformat'
import PicturesWall from "../components/picwall/index"

const {get_all_tags} = tagActions;
const {update_content, update_tags, update_title,update_price,update_address,update_pics ,save_article,update_quality} = actions;
const Option = Select.Option;

class AdminNewArticle extends Component {
    constructor(props) {
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            options: [],
            modalVisible: false
        };
    }

    //详情内容
    onChanges(e) {
        this.props.update_content(e.target.value);
    }

    //物品名称输入框
    titleOnChange(e) {
        this.props.update_title(e.target.value)
    };

    // 价格输入框
    priceOnChange(e){
        this.props.update_price(e.target.value)
    };
    // 成色
    qualityOnChange(e){
        this.props.update_quality(e.target.value)
    }
    // 地址
    addressOnChange(e){
        this.props.update_address(e.target.value)
    };

    // 图片
    picsOnChange(e){
        this.props.update_pics(value)
    }; 

    //选择标签
    selectTags(value) {
        this.props.update_tags(value)
    };

   

    //发表
    publishArticle() {
        let articleData = {};
        articleData.title = this.props.title;
        articleData.price = this.props.price;
        articleData.content = this.props.content;
        articleData.tags = this.props.tags;
        articleData.time = dateFormat(new Date(), 'yyyy-mm-dd');
        articleData.isPublish = true;
        articleData.address = this.props.address;
        articleData.pics = this.props.pics;
        articleData.quality = this.props.quality;
        this.props.save_article(articleData);
    };

    //保存
    saveArticle() {
        let articleData = {};
        articleData.title = this.props.title;
        articleData.price = this.props.price;
        articleData.content = this.props.content;
        articleData.tags = this.props.tags;
        articleData.address = this.props.address;
        articleData.pics = this.props.pics;
        articleData.time = dateFormat(new Date(), 'yyyy-mm-dd');
        articleData.isPublish = false;
        articleData.quality = this.props.quality;
        this.props.save_article(articleData);
    };

    //handleOk
    handleOk() {
        this.setState({
            modalVisible: false
        })
    };

    render() {
        return (
            <div>
                <h2>发布物品</h2>
                <div className={style.container}>
                    <span className={style.subTitle}>物品名称</span>
                    <Input
                        className={style.titleInput}
                        placeholder={'请输入物品名称'}
                        type='text'
                        value={this.props.title}
                        onChange={this.titleOnChange.bind(this)}/>
                        <span className={style.subTitle}>请选择分类</span>
                    <Select
                        mode="multiple"
                        className={style.titleInput}
                        placeholder="请选择物品分类"
                        onChange={this.selectTags.bind(this)}
                        value={this.props.tags}
                    >
                        {
                            this.props.tagsBase.map((item) => (
                                <Option key={item}>{item}</Option>
                            ))
                        }
                    </Select>
                    <span className={style.subTitle}>物品定价</span>
                    <Input
                        className={style.titleInput}
                        placeholder={'请输入物品价格'}
                        type='text'
                        value={this.props.price}
                        onChange={this.priceOnChange.bind(this)}/>
                    <span className={style.subTitle}>物品成色</span>
                    <Input
                        className={style.titleInput}
                        placeholder={'物品成色'}
                        type='number'
                        max={10}
                        min={5}
                        value={this.props.quality}
                        onChange={this.qualityOnChange.bind(this)}/>
                    <span className={style.subTitle}>交易地点</span>
                    <Input
                        className={style.titleInput}
                        placeholder={'请输入交易地点'}
                        type='text'
                        value={this.props.address}
                        onChange={this.addressOnChange.bind(this)}
                        />
                    <span className={style.subTitle}>详细描述</span>
                    <textarea
                        className={style.textArea}
                        value={this.props.content}
                        onChange={this.onChanges.bind(this)}/>
                    
                    <span className={style.subTitle}>图片上传</span>
                    <PicturesWall /> 
                    <div className={style.bottomContainer}>
                        <Button type="primary" onClick={this.publishArticle.bind(this)}
                                className={style.buttonStyle}>发布</Button>
                        <Button type="primary" onClick={this.saveArticle.bind(this)}
                                className={style.buttonStyle}>保存</Button>
                    </div>
                </div>
                
            </div>

        )
    }

    componentDidMount() {
        this.props.get_all_tags();
    }
}

AdminNewArticle.propsTypes = {
    title: PropTypes.string,
    price: PropTypes.number,
    content: PropTypes.string,
    tags: PropTypes.array,
    tagsBase: PropTypes.array,
    address:PropTypes.string,
    quality:PropTypes.number,
};

AdminNewArticle.defaultProps = {
    title: '',
    price: '',
    content: '',
    tags: [],
    tagsBase: [],
    address:'',
    pics:[],
    quality:'',
};

function mapStateToProps(state) {
    const {title,price,address,pics,content, tags,quality} = state.admin.newArticle;
    let tempArr = state.admin.tags;
    for (let i = 0; i < tempArr.length; i++) {
        if (tempArr[i] === '首页') {
            tempArr.splice(i, 1);
        }
    }
    return {
        title,
        price,
        content,
        tags,
        address,
        pics,
        tagsBase: tempArr,
        quality,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        update_tags: bindActionCreators(update_tags, dispatch),
        update_title: bindActionCreators(update_title, dispatch),
        update_price: bindActionCreators(update_price, dispatch),
        update_content: bindActionCreators(update_content, dispatch),
        get_all_tags: bindActionCreators(get_all_tags, dispatch),
        save_article: bindActionCreators(save_article, dispatch),
        update_address: bindActionCreators(update_address, dispatch),
        update_pics: bindActionCreators(update_pics, dispatch),
        update_quality:bindActionCreators(update_quality, dispatch),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AdminNewArticle)