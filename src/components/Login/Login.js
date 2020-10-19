import React,{Component} from 'react'
import {Redirect} from 'react-router-dom'
import './Login.css'
import axios from 'axios'
class Login extends Component{
    constructor(props){
        super(props)
        this.state = {
            isLogin:0,
            interfaceFlag:0
        }
    }
    showLogin(){
        this.setState({
            interfaceFlag:0
        })
    }
    showRegister(){
        this.setState({
            interfaceFlag:1
        })
    }
    login(){
        let username = document.getElementById('username').value;
        let password = document.getElementById('password').value;
        axios.get('/api/getValues',{
            params:{
                username:username,
                password:password
              }
        }).then(res=>{
            window.sessionStorage.setItem(JSON.stringify(res.data[0].name),JSON.stringify(res.data[0].password))
            console.log('login成功'+JSON.stringify(res.data[0].name))
            console.log('login成功'+JSON.stringify(res.data[0].password))
            this.setState({
                isLogin:1
            })
        }).catch(err=>{
            console.log('login失败'+err)
            alert('账号或密码错误')
        })
        console.log('登录')
        // return false;
    }
    register(){
        let username = document.getElementById('register_username').value;
        let password = document.getElementById('register_password').value;
        let shure_password = document.getElementById('shure_password').value;
        console.log('username'+username)
        console.log('password'+password)
        console.log('确认密码'+shure_password)
        console.log('注册')
        if(password == shure_password){
            axios.post('/api/addValues',{
                username:username,
                password:password
            }).then(res=>{
                console.log('注册成功'+res)
                alert('注册成功')
            }).catch(err=>{
                console.log('注册失败'+err)
                alert('注册失败')
            })
        }else{
            console.log('两次输入密码不一致');
        }
        console.log('注册')
        // return false;
    }
    render(){
        if(this.state.isLogin){
            return <Redirect to={{pathname:'/'}}></Redirect>
        }
        return(
            <div className="login_register">
                <div className="login_register_box">
                    <div className="login_left"></div>
                    <div className="login_right">
                        <span className="login_interface" onClick={()=>this.showLogin()}>login</span>
                        <span className="register_interface"onClick={()=>this.showRegister()}>register</span>
                        <form style={{display:this.state.interfaceFlag === 0?'block':'none'}}>
                            <input type="text" name="username" id="username" className="username" placeholder="username" autocomplete="new-password"/><br/>
                            <input type="password" name="password" id="password" className="password" placeholder="password" autocomplete="new-password"/><br/>
                            <input type="button"  value="login" className="dologin" onClick={()=>this.login()} />
                        </form>
                        <form style={{display:this.state.interfaceFlag === 1?'block':'none'}}>
                            <input type="text" name="username" id="register_username" className="username" placeholder="username" autocomplete="new-password" />
                            <input type="password" name="password" id="register_password" className="password" placeholder="password" autocomplete="new-password"/>
                            <input type="password" name="shure_password" id="shure_password" className="shure_password" placeholder="current password" autocomplete="new-password"/>
                            <input type="button" value="register" className="dorigster" onClick={()=>this.register()} />
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
export default Login