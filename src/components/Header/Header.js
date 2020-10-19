import React, { Component } from 'react'
import './Header.css'
import topbar from '../../assets/topbar.png'
import touxiang from '../../assets/用户头像/touxiang.jpg'
import Findmusic from '../Findmusic/Findmusic'
import Mymusic from '../Mymusic/Mymusic'
import{BrowserRouter as Router,Route,Link, Switch, Redirect} from 'react-router-dom'
import routes from '../../router/router'
import { values } from '../../assets/BestLikeMusicInfo'

class Header extends Component {
    constructor(props) {
        super(props)
    }
    componentDidMount(){
        // console.log(this.props.routes)
        // this.props.routes.map((value,index)=>{
        //     console.log(value.path)
        //     console.log(value.component)
        // })
    }
    render() {
        return (
                <div className="main_box">
                    <Router>
                        <div className="header_nav">
                            <div className="nav">
                                    <div className="icon nav_child">
                                    </div>
                                    <div className="find_music nav_child">
                                        <Link to="/header/">发现音乐</Link>
                                    </div>
                                    <div className="mymusic nav_child">
                                        <Link to="/header/mymusic">我的音乐</Link>
                                    </div>
                                    <div className="friends nav_child">朋友</div>
                                    <div className="shopping nav_child">商城</div>
                                    <div className="musicer nav_child">音乐人</div>
                                    <div className="down_softwear nav_child">下载客户端</div>
                                    <div className="search nav_child">
                                        <div className="search_box">
                                            <span></span>
                                            <input type="search" name="" id="" placeholder="音乐/视频/电台/用户" />
                                        </div>
                                    </div>
                                    <div className="creation_center nav_child">创作者中心</div>
                                    <div className="user nav_child">
                                        <img src={touxiang} alt="" />
                                    </div>
                            </div>
                        </div>
                            <div className="child_component">
                                <Switch>
                                    <Route path='/header/' exact component={Findmusic} />
                                    <Route path='/header/mymusic' exact component={Mymusic} />
                                    {/* <Redirect from='/header/*' to='/' /> */}
                                    {/* <Route path='/' component={Findmusic} /> */}
                                </Switch>
                            </div>
                    </Router>
                </div>
        )
    }
}
export default Header