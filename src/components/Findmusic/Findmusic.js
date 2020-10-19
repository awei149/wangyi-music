import React, {Component} from 'react'
import './Findmusic.css'
import download from '../../assets/download.png'
import touxiang from '../../assets/用户头像/touxiang.jpg'
const maths = {
    image0:'',
    image1:'',
    image2:'',
    image3:'',
    image4:'',
    image5:'',
    image6:'',
    image7:'',
    image8:''
}
const popularimg = {
    image0:'',
    image1:'',
    image2:'',
    image3:'',
    image4:'',
    image5:'',
    image6:'',
    image7:''
}
const personality = {
    image0:'',
    image1:'',
    image2:'',
    image3:''
}

const newcd = {
    image0:'',
    image1:'',
    image2:'',
    image3:'',
    image4:'',
    image5:'',
    image6:'',
    image7:'',
    image8:'',
    image9:''
}
const topimg = {
    image0:'',
    image1:'',
    image2:''
}
const singerimg = {
    image0:'',
    image1:'',
    image2:'',
    image3:'',
    image4:''
}
const anchorimg = {
    image0:'',
    image1:'',
    image2:'',
    image3:'',
    image4:''
}
const backgroundimg = {
    img0:'',
    img1:'',
    img2:'',
    img3:'',
    img4:'',
    img5:'',
    img6:'',
    img7:'',
    img8:'',
}

const populartext = ['[华语速爆新歌]最新华语音乐推荐','今天的不开心就止于此明天依旧光芒万丈','私人雷达|根据听歌记录为你打造','一起听月亮',
'[BGM]一定听过的神级背景音乐','短视频界的格斗大师们【话里有话vol-222】','纯音乐|前奏秒杀一见倾心的喜欢','人生遇到的每个人，出场顺序真的很重要']

const personapilyText = ['每日歌曲推荐','私人雷达|根据听歌记录为你打造','[BGM]一定听过的神级背景音乐','纯音乐|前奏秒杀一见倾心的喜欢']
const newCDText = ['Wonder Shawn Mendes','Savage Love(La Jawsh 685)','三嫁惹君心 影视群星','Pretty Please 王嘉尔/Galantis',
'Bad Boy 金请夏','我的祖国 佟丽娅/王丽达','《半是蜜糖半是伤》','无人知晓 田馥甄','Wild Life OneRepublic','《半是蜜糖半是伤》']
const topOne = ['Candlelight(feat.OHHYUK)','会不会（吉他版）','不怪她','突然发生的爱情故事','无人区玫瑰','夏夜最后的烟火','帝女花(Remix)',
'天天','游京','你我']
const topTow = ['会不会（吉他版）','Savage Love(Laxed-Siren Beat)','一个人想着一个人','突然发生的爱情故事','Candlelight(feat.OHHYUK)',
'虞兮叹','是你想成为的大人吗','烈火战马+空城计+重庆魂(Live)','我走后','帝女花(Remix)']
const topThree = ['街区故事','失控','小说家','会不会(吉他版)','烛','淡','等雨来','怎么保温','关于你的梦','灼喜鹊']
const singertextOne = ['张惠妹aMEI','Fine乐团','萬暁利','音乐人赵雷','王三溥']
const singertextTow = ['台湾歌手张惠妹','独立音乐人','民谣歌手,中国现代民谣的代表人物之一','民谣歌手','音乐人']
const anchorName = ['陈立','DJ艳秋','国家大剧院古典音乐频道','谢谢收听','DJ晓苏']
const anchorInfo = ['心理学家,美食家陈立教授','著名音乐节目主持人','国家大剧院古典音乐官方','南京电台主持人王馨','独立DJ,CRI环球旅游广播特邀DJ']


const personalityImg = Object.keys(personality).map(item=>require('../../assets/personality/'+item+'.png'))
const ticks = Object.keys(maths).map(item=>require('../../assets/轮播图/'+item+'.jpg'))
const popularImg = Object.keys(popularimg).map(item=>require('../../assets/popularImg/'+item+'.jpg'))
const newCD = Object.keys(newcd).map(item=>require('../../assets/newCD/'+item+'.jpg'))
const topImg = Object.keys(topimg).map(item=>require('../../assets/榜单/'+item+'.jpg'));
const singerImg = Object.keys(singerimg).map(item=>require('../../assets/singerImg/'+item+'.jpg'))
const anchorImg = Object.keys(anchorimg).map(item=>require('../../assets/anchorImg/'+item+'.jpg'))
const backgroundImg = Object.keys(backgroundimg).map(item=>require('../../assets/轮播背景图/'+item+'.jpg'))

class Findmusic extends Component{
    constructor(props){
        super(props)
        this.state = {
            count:0
        }
    }
    newCD_left(){
        var cdItem = document.getElementsByClassName('newCDitem');
        for(var i = 0; i < cdItem.length; i++){
            if(parseInt(cdItem[i].style.left) >524){
                cdItem[i].style.opacity = 0;
            }else{
                cdItem[i].style.opacity = 1;
            }
            cdItem[i].style.left = parseInt(cdItem[i].style.left)+655 + 'px';
        }
        for(var j = 0; j < cdItem.length; j++){
            if(parseInt(cdItem[j].style.left) >= 1310){
                cdItem[j].style.left = parseInt(cdItem[j].style.left) - 2620 + 'px';
            }
        }
    }
    newCD_right(){
        var cdItem = document.getElementsByClassName('newCDitem');
        for(var i = 0; i < cdItem.length; i++){
            if(parseInt(cdItem[i].style.left) < 0){
                cdItem[i].style.opacity = 0;
            }else{
                cdItem[i].style.opacity = 1;
            }
            cdItem[i].style.left = parseInt(cdItem[i].style.left)-655 + 'px';
        }
        for(var j = 0; j < cdItem.length; j++){
            if(parseInt(cdItem[j].style.left) < (-1310)){
                cdItem[j].style.left = parseInt(cdItem[j].style.left) + 2620 + 'px';
            }
        }
    }
    componentDidMount(){
        var img = document.getElementsByClassName('img');
        this.interval = setInterval(()=>{
            if(this.state.count === img.length-1){
                this.setState({
                    count: 0
                })
            }else{
                this.setState((prevState)=>({
                    count: prevState.count + 1
                }))
            }
            // console.log(this.state.count)
        },8000)
    }
    componentDidUpdate(){
        // clearInterval(this.interval)
    }
    componentWillUnmount(){
        clearInterval(this.interval)
    }
    render(){
        return(
            <div className="bigBox">
                <div className="red_nav">
                    <div className="nav_box">
                        <span>推荐</span>
                        <span>排行榜</span>
                        <span>歌单</span>
                        <span>主播电台</span>
                        <span>歌手</span>
                        <span>新碟上架</span>
                    </div>
                </div>
                <div className="rotation_box" style={{backgroundImage:'url('+backgroundImg[this.state.count]+')',
                backgroundSize:'6000px',backgroundPosition:'center center'}}>
                    <div className="rotation">
                        <div className="left_img">
                            {
                                ticks.map((item,index)=>{
                                    return(
                                        <img src={item} key={index} alt="" className="img" style={{
                                            opacity:this.state.count === index?"1":"0",
                                            transition:'all 1.5s ease-out'
                                        }} />
                                    )
                                })
                            }
                            <ul>
                                {
                                    ticks.map((item,index)=>{
                                        return(
                                            <li key={index} style={{
                                                backgroundColor:this.state.count === index?"rgb(194,12,12)":"rgb(238,238,238)",
                                                transition:'all 1.5s ease-out'
                                            }}></li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                        <div className="right_download">
                            <div className="computer"></div>
                            <div className="link_download"></div>
                            <span>PC 安卓 iPhone WP iPad Mac 六大客户端</span>
                        </div>
                    </div>
                </div>
                <div className="list_img">
                    <div className="left_list">
                        <div className="popular">
                            <div className="popular_header">
                                <div className="popular_title">
                                    <div className="popular_cricle"></div>
                                    <div className="popular_title_text">热门推荐</div>
                                </div>
                                <div className="popular_nav"><span>华语</span>|<span>流行</span><span>摇滚
                                    </span>|<span>民谣</span>|<span>电子</span></div>
                                <div className="popular_more"></div>
                            </div>
                            <div className="popular_music">
                                {
                                    popularImg.map((item,index)=>{
                                        return(
                                            <div className="popular_music_item" key={index}>
                                                <img src={item} alt=""/>
                                                {populartext[index]}
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        <div className="popular">
                            <div className="popular_header">
                                <div className="popular_title">
                                    <div className="popular_cricle"></div>
                                    <div className="popular_title_text">个性推荐</div>
                                </div>
                                <div className="popular_nav"></div>
                                <div className="popular_more"></div>
                            </div>
                            <div className="popular_music">
                                {
                                    personalityImg.map((item,index)=>{
                                        return(
                                            <div className="popular_music_item" key={index}>
                                                <img src={item} alt=""/>
                                                {personapilyText[index]}
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        <div className="popular">
                            <div className="popular_header">
                                <div className="popular_title">
                                    <div className="popular_cricle"></div>
                                    <div className="popular_title_text">新碟上架</div>
                                </div>
                                <div className="popular_nav"></div>
                                <div className="popular_more"></div>
                            </div>
                            <div className="newCD">
                                <div className="newCDBox">
                                    {
                                        newCD.map((item,index)=>{
                                            return(
                                                <div className="newCDitem" style={{left:(10-index) * (-131) + 'px'}} key={index}>
                                                    <img src={item} alt=""/>
                                                    <p className="newCDText">{newCDText[index]}</p>
                                                </div>
                                            )
                                        })
                                    }
                                    {
                                        newCD.map((item,index)=>{
                                            return(
                                                <div className="newCDitem" style={{left:index * 131 + 'px'}} key={index}>
                                                    <img src={item} alt=""/>
                                                    <p className="newCDText">{newCDText[index]}</p>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                <span className="cd_left" onClick={()=>this.newCD_left()}>←</span>
                                <span className="cd_right" onClick={()=>this.newCD_right()}>→</span>
                            </div>
                        </div>
                        <div className="popular">
                            <div className="popular_header">
                                <div className="popular_title">
                                    <div className="popular_cricle"></div>
                                    <div className="popular_title_text">最新榜单</div>
                                </div>
                                <div className="popular_nav"></div>
                                <div className="popular_more"></div>
                            </div>
                            <div className="newTop">
                                <div className="riseTop">
                                    <div className="newTop_box">
                                        <div className="riseTop_img_box">
                                            <div className="riseTop_img">
                                                <img src={topImg[0]} alt=""/>
                                            </div>
                                            <div className="riseTop_text">
                                                <h5>云音乐飙升榜</h5>
                                                <span className="play"></span>
                                                <span className="collect"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <ul className="topList">
                                            {
                                                topOne.map((item,index)=>{
                                                    return(
                                                        <li key={index} style={{backgroundColor:(index%2 === 0)?'rgb(232,232,232)':'rgb(244,244,244)'}}>
                                                            <span style={{color:index<3?'#c10d0c':'#333'}}>{index+1}</span>
                                                            <span className="topList_text">{item}</span>
                                                        </li>
                                                    )
                                                })
                                            }
                                    </ul>
                                </div>
                                <div className="newmusicTop">
                                    <div className="newTop_box">
                                            <div className="riseTop_img_box">
                                                <div className="riseTop_img">
                                                    <img src={topImg[1]} alt=""/>
                                                </div>
                                                <div className="riseTop_text">
                                                    <h5>云音乐新歌榜</h5>
                                                    <span className="play"></span>
                                                    <span className="collect"></span>
                                                </div>
                                            </div>
                                        </div>
                                        <ul className="topList">
                                                {
                                                    topTow.map((item,index)=>{
                                                        return(
                                                            <li key={index} style={{backgroundColor:(index%2 === 0)?'rgb(232,232,232)':'rgb(244,244,244)'}}>
                                                                <span style={{color:index<3?'#c10d0c':'#333'}}>{index+1}</span>
                                                                <span className="topList_text">{item}</span>
                                                            </li>
                                                        )
                                                    })
                                                }
                                        </ul>
                                </div>
                                <div className="originalTop">
                                    <div className="newTop_box">
                                            <div className="riseTop_img_box">
                                                <div className="riseTop_img">
                                                    <img src={topImg[2]} alt=""/>
                                                </div>
                                                <div className="riseTop_text">
                                                    <h5>网易原创榜</h5>
                                                    <span className="play"></span>
                                                    <span className="collect"></span>
                                                </div>
                                            </div>
                                        </div>
                                        <ul className="topList">
                                                {
                                                    topThree.map((item,index)=>{
                                                        return(
                                                            <li key={index} style={{backgroundColor:(index%2 === 0)?'rgb(232,232,232)':'rgb(244,244,244)'}}>
                                                                <span style={{color:index<3?'#c10d0c':'#333'}}>{index+1}</span>
                                                                <span className="topList_text">{item}</span>
                                                            </li>
                                                        )
                                                    })
                                                }
                                        </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="right_info">
                        <div className="userinfo">
                            <div className="user_img">
                                <img src={touxiang} alt="" width='80px' height='80px' />
                                <div className="user_text_box">
                                    <h5>KISS_IN_THE_FUTURE</h5>
                                    <span><em>LV8</em></span>
                                    <button className="signOn">签到</button>
                                </div>
                            </div>
                            <div className="user_status">
                                <div className="trends">
                                    <span>20</span>
                                    <span style={{fontSize:'11px'}}>动态</span>
                                </div>
                                <div className="follow_with">
                                    <span>8</span>
                                    <span style={{fontSize:'11px'}}>关注</span>
                                </div>
                                <div className="fans">
                                    <span>1000</span>
                                    <span style={{fontSize:'11px'}}>粉丝</span>
                                </div>
                            </div>
                        </div>
                        <div className="singer_box">
                            <header className="header">入驻歌手</header>
                            {
                                singerImg.map((item,index)=>{
                                    return(
                                        <div key={index} className="singer">
                                            <img src={item} alt=""/>
                                            <div>
                                                <h6>{singertextOne[index]}</h6>
                                                <span>{singertextTow[index]}</span>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                            <button className="apply_for_singer">申请成为网易音乐人</button>
                        </div>
                        <div className="anchor">
                            <header className="header">热门主播</header>
                            {
                                anchorImg.map((item,index)=>{
                                    return(
                                        <div key={index} className="anchor_item">
                                            <img src={item} alt=""/>
                                            <div>
                                                <header>{anchorName[index]}</header>
                                                <span>{anchorInfo[index]}</span>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Findmusic