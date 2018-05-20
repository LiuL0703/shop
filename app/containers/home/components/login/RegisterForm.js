import React,{Component} from 'react'
import {Input,Form, Icon,Button} from 'antd'
const FormItem = Form.Item;
import style from './style.css'
import {post} from "../../../../fetch/fetch";

let types = 'admin';

class RegisterFormCom extends Component{
    constructor(props){
        super(props);
        this.state = {flag: true}
    }

    handleRegister = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                values.type = types;
                this.props.register(values);
                console.log(values);
            }
        });
    };
    changeRegister(){
        this.setState({
          flag:!this.state.flag
        })
        if(this.state.flag){
          types = 'user';
        }else{
          types = 'admin';
        }
    }

    render(){
        const {getFieldDecorator} = this.props.form;
        return(
            <Form onSubmit={this.handleRegister} className={style.formStyle}>
                <FormItem>
                    {getFieldDecorator('userName', {
                        rules: [{required: true, message: '请输入用户名!'}],
                    })(
                        <Input prefix={<Icon type="user" style={{fontSize: 13}}/>} placeholder="Username"/>
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('password', {
                        rules: [{required: true, message: '请输入密码!'}],
                    })(
                        <Input prefix={<Icon type="lock" style={{fontSize: 13}}/>} type="password"
                               placeholder="Password"/>
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('passwordRe', {
                        rules: [{required: true, message: '请输入密码!'}],
                    })(
                        <Input prefix={<Icon type="lock" style={{fontSize: 13}}/>} type="password"
                               placeholder="Repeat password"/>
                    )}
                </FormItem>
                <FormItem>
                    <Button className={style.loginButton} type="primary" htmlType="submit">
                        注册
                    </Button>
                    <p onClick={this.changeRegister.bind(this)}><a>{this.state.flag?'普通用户注册':'会员注册'}</a>
                    </p>
                </FormItem>
            </Form>
        )
    }
}

const RegisterForm = Form.create()(RegisterFormCom);

export default RegisterForm