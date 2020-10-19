import React,{Component} from 'react'
import '../Mymusic/Mymusic.css'
import MyBestLikeMusic from '../MusicList/MyBestLikeMusic'
import musictouxiang from '../../assets/收藏歌单图片/image0.jpg'
import axios from 'axios'
// import mp3 from '../../assets/mp3/Here With You.mp3'
const mymusicListimg = {
    image0:'',
    image1:'',
    image2:'',
    image3:'',
    image4:'',
}
const collectimg = {
    image0:''
}
const musicListimg = {
    image0:'',
    image1:''
}
const musicName = {
    '风的季节':'',
    '安娜的橱窗':'',
    '李悦君':'',
    '其实都没有':'',
    '如果有来生':'',
    '傻女':'',
    '上海滩':'',
    '世间始终你好':'',
    '斯德哥尔摩情人':'',
    '铁血丹心':'',
    '温柔的慈悲':'',
    '雪落下的声音':'',
    'Here With You':'',
}
const mymusicName = ['我喜欢的音乐','年度歌单','岁月静好','红玫瑰','纯音乐']
const mymusicText = ['213首','10首','10首','237首','104首']
const collectName = ['云音乐飙升榜']
const collectText = ['100首']

const mymusicListImg = Object.keys(mymusicListimg).map(item=>require('../../assets/我的歌单图片/'+item+'.jpg')) 
const collectImg = Object.keys(collectimg).map(item=>require('../../assets/收藏歌单图片/'+item+'.jpg'))
const musicListImg = Object.keys(musicListimg).map(item=>require('../../assets/歌单头像/'+item+'.jpg'))
const musicList = require('../../assets/BestLikeMusicInfo');
const music = Object.keys(musicName).map(item=>require('../../assets/mp3/'+item+'.mp3'))
class Mymusic extends Component{
    constructor(props){
        super(props)
        this.state = {
            count:0,
            flag:0,
            musicFlag:0,
            littleMusicList:0,
            index:0,
            lyric:[]
        }
    }
    componentDidMount(){
        this.settingHeight();
        window.addEventListener('resize',this.settingHeight.bind(this));
        // this.getLyric()
    }
    componentWillUnmount(){
        window.removeEventListener('resize',this.settingHeight.bind(this));
    }
    settingHeight(){
        const height = window.screen.height;
        var mymusic_left = document.getElementsByClassName('mymusic_left')[0];
        if(mymusic_left){
            mymusic_left.style.height = parseInt(height) - 75 - 144 + 'px'
        }
    }
    musicListStatus(){
        if(this.state.count == 0){
            this.setState({
                count:1
            })
        }else{
            this.setState({
                count:0
            })
        }
    }
    collectListStatus(){
        if(this.state.flag == 0){
            this.setState({
                flag:1
            })
        }else{
            this.setState({
                flag:0
            })
        }
    }
    //显示底部播放器
    showPlayer(){
        // let showPlayer = document.getElementsByClassName('show_player')[0]
        let player = document.getElementsByClassName('player')[0];
        player.style.display = 'block'
    }
    //隐藏底部播放器
    hidePlayer(){
        let player = document.getElementsByClassName('player')[0];
        let musicList = document.getElementById('music_list');
        musicList.style.display = 'none'
        player.style.display = 'none'
    }
    showPlayerAndList(){
        let player = document.getElementsByClassName('player')[0];
        player.style.display = 'block'
        let musicList = document.getElementById('music_list');
        musicList.style.display = 'block'
    }
    // 播放音乐
    playMusic(){
        var music = document.getElementsByClassName('play1')[this.state.index];
        let musicname = document.getElementsByClassName('item_name');
        // var music = document.getElementById('play1');
        this.getLyric(musicname[this.state.index].innerText)
        let showTime = document.getElementById('show_time');
        if(this.state.musicFlag == 0){
            music.play();
            this.setState({
                musicFlag:1
            },()=>{
                console.log(this.state.musicFlag)
                this.playBtnStatus();
                this.timer = setInterval(()=>{
                    this.controlMusictime(music,showTime)
                },1000);
                // console.log(musicname[this.state.index].innerText)
            })
        }else{
            music.pause()
            this.setState({
                musicFlag:0
            },()=>{
                console.log(this.state.musicFlag)
                this.playBtnStatus();
                clearInterval(this.timer);
            })
        }
    }
    //停止播放所有音乐，清除所有定时器，将所有音乐进度归零
    stopEveryMusic(){
        let length = document.getElementsByClassName('play1').length;
        let play = document.getElementsByClassName('play1');
        let music_inner_bar = document.getElementsByClassName('music_inner_bar')[0];
        for(var i = 0; i < length; i++){
            play[i].pause();
            play[i].currentTime = 0;
            music_inner_bar.style.width = 0 + 'px';
        }
    }
    //下一曲
    nextmusic(){
        let length = document.getElementsByClassName('play1').length;
        this.stopEveryMusic()
        clearInterval(this.timer)
        this.setState({
            musicFlag:0,
            index:(this.state.index == length-1)?0:(this.state.index + 1)
        },()=>{
            this.playMusic();
        })
    }
    //上一曲
    lastmusic(){
        let length = document.getElementsByClassName('play1').length;
        this.stopEveryMusic()
        clearInterval(this.timer)
        this.setState({
            musicFlag:0,
            index:(this.state.index == 0)?(length-1):(this.state.index-1)
        },()=>{
            this.playMusic();
        })
    }
    // 播放按钮状态
    playBtnStatus(){
        var play_btn = document.getElementsByClassName('play-music');
        console.log(play_btn);
        if(this.state.musicFlag == 0){
            play_btn[1].style.display = 'none'
            play_btn[0].style.display = 'inline'
            console.log('000')
            return;
        }
        if(this.state.musicFlag == 1){
            play_btn[1].style.display = 'inline'
            console.log(play_btn[1])
            play_btn[0].style.display = 'none'
            console.log('111')
            return;
        }
    }
    handleWheel(e){
        var musicListBox = document.getElementsByClassName('mymusic_right')[0];
        var mymusic_left_height = document.getElementsByClassName('mymusic_left')[0];
        console.log(mymusic_left_height.style.height)
        var height = musicListBox.offsetHeight;
        var stop = parseInt(mymusic_left_height.style.height) -parseInt(height)
        console.log('stop'+stop)
        console.log('height'+height)
        if(e.deltaY < 0){
            if(musicListBox.offsetTop >= 0){
                musicListBox.style.top = '0px'
                return;
            }
            // console.log(e.deltaY)
            console.log('top'+musicListBox.offsetTop)
            musicListBox.style.top = parseInt(musicListBox.offsetTop) + 50 + 'px'
        }else{
            if(musicListBox.offsetTop <= stop){
                musicListBox.style.top = stop + 'px'
                return
            }
            musicListBox.style.top = parseInt(musicListBox.offsetTop) - 50 + 'px'
            // console.log(musicListBox.offsetTop)
        }
    }
    littleHandleWheel(e){
        let musicListBox = document.getElementsByClassName('shwo_music_list_item')[0];
        let mymusic_left_height = document.getElementById('music_list_left');
        console.log('aa'+mymusic_left_height.style.height)
        let height = musicListBox.offsetHeight;
        let top = parseInt(mymusic_left_height.offsetHeight) -parseInt(height)
        console.log('top'+top)
        console.log('height'+height)
        if(e.deltaY < 0){
            if(musicListBox.offsetTop >= 0){
                musicListBox.style.top = '40px'
                return;
            }
            // console.log(e.deltaY)
            console.log('top'+musicListBox.offsetTop)
            musicListBox.style.top = parseInt(musicListBox.offsetTop) + 20 + 'px'
        }else{
            if(musicListBox.offsetTop < (top-10)){
                musicListBox.style.top = top + 'px'
                return
            }
            musicListBox.style.top = parseInt(musicListBox.offsetTop) - 20 + 'px'
            // console.log(musicListBox.offsetTop)
        }
    }
    //控制小歌单的显示与隐藏
    contrloLittleList(){
        let littleList = document.getElementById('music_list');
        if(this.state.littleMusicList == 0){
            littleList.style.display = 'block'
            this.setState({
                littleMusicList:1
            })
        }else{
            littleList.style.display = 'none'
            this.setState({
                littleMusicList:0
            })
        }

    }
    //控制歌曲进度条
    controlMusictime(music,showTime){
        // var music = document.getElementById('play1');
        // let showTime = document.getElementById('show_time');
        // console.log('歌曲长度'+music.duration)
        // console.log('当前歌曲进度'+music.currentTime)
        // console.log('是否结束'+music.ended)
        let musictime = parseInt(music.duration)
        let presentmusictime = parseInt(music.currentTime)
        let minute = parseInt(musictime / 60);//歌曲分钟数
        let second = parseInt(musictime % 60);//歌曲秒数
        let preminute = parseInt(presentmusictime/60);//目前歌曲分钟数
        let presecond = parseInt(presentmusictime%60);//目前歌曲秒数
        // console.log('目前歌曲分钟'+preminute);
        // console.log('目前歌曲秒'+presecond);
        this.dealLyricByTime(presentmusictime,musictime);//处理歌词函数
        if(minute < 10){
            // console.log('走这里')
            if(second < 10){
                // showTime.innerText = '0'+minute+':'+'0'+second;
                if(presecond<10){
                    showTime.innerText = '0'+preminute+':'+'0'+presecond+'/'+'0'+minute+':'+'0'+second;
                }else{
                    showTime.innerText = '0'+preminute+':'+presecond+'/'+'0'+minute+':'+'0'+second;
                }
            }else{
                if(presecond<10){
                    showTime.innerText = '0'+preminute+':'+'0'+presecond+'/'+'0'+minute+':'+second;
                }else{
                    showTime.innerText = '0'+preminute+':'+presecond+'/'+'0'+minute+':'+second;
                }
            }
        }else{
            if(second < 10){
                if(preminute < 0){
                    if(presecond < 0){
                        showTime.innerText = '0'+preminute+':'+'0'+presecond+'/'+minute+':'+'0'+second;
                    }else{
                        showTime.innerText = '0'+preminute+':'+presecond+'/'+minute+':'+'0'+second;
                    }
                }else{
                    if(presecond < 0){
                        showTime.innerText = preminute+':'+'0'+presecond+'/'+minute+':'+'0'+second;
                    }else{
                        showTime.innerText = preminute+':'+presecond+'/'+minute+':'+'0'+second;
                    }
                }
            }else{
                if(preminute < 0){
                    if(presecond < 0){
                        showTime.innerText = '0'+preminute+':'+'0'+presecond+'/'+minute+':'+second;
                    }else{
                        showTime.innerText = '0'+preminute+':'+presecond+'/'+minute+':'+second;
                    }
                }else{
                    if(presecond < 0){
                        showTime.innerText = preminute+':'+'0'+presecond+'/'+minute+':'+second;
                    }else{
                        showTime.innerText = preminute+':'+presecond+'/'+minute+':'+second;
                    }
                }
            }
        }
        let music_outer_bar = document.getElementsByClassName('music_bar')[0];
        let music_inner_bar = document.getElementsByClassName('music_inner_bar')[0];
        let outerWidth = music_outer_bar.offsetWidth;
        music_inner_bar.style.width = presentmusictime*parseInt(outerWidth)/musictime + 'px'
        if(presentmusictime === musictime){
            this.nextmusic();
        }
        // console.log('分钟'+minute);
        // console.log('秒'+second);
    }
    //控制歌曲进度条
    controlMusicBar(){
        let music_outer_bar = document.getElementsByClassName('music_bar')[0];
        // let music_inner_bar = document.getElementsByClassName('music_inner_bar')[0];
        let outerWidth = music_outer_bar.offsetWidth;
        console.log('长度'+outerWidth)
    }
    //获取歌词
    getLyric(name){
        axios.get('/api/readLyric',{
            params:{
                name:name
            }
        })
        .then(res=>{
            // console.log(res.data.split('\n'));
            // console.log(res.data)
            this.setState({
                lyric:this.dealLyric(res.data)
            },()=>{
                this.returnLyricColor();
            })
            // this.state.lyric = this.dealLyric(res.data)
            console.log(this.dealLyric(res.data))
        }).catch(err=>{
            console.log(err)
        })
    }
    //处理歌词
    dealLyric(str){
        var arr = str.split('\n');
        var newarr = []
        for(var i = 0; i < arr.length; i++){
            var temp = arr[i].split(':')[0].replace('[','');
            var trueLyric = arr[i];
            if(!isNaN(temp)){
                var lyricTime = trueLyric.split(']')[0].replace('[','');//歌词时间
                var lyricminute = lyricTime.split(':')[0];
                var lyricsecond = lyricTime.split(':')[1];
                var time = lyricminute*60 + parseFloat(lyricsecond);//毫秒数歌曲时间
                var lyricText = trueLyric.split(']')[1];
                newarr.push({
                    lyrictime:time,
                    content:lyricText
                })
            }
        }
        return newarr;
    }
    //将所有歌词颜色和歌词盒子归位
    returnLyricColor(){
        let lyric_box = document.getElementsByClassName('lyric_box')[0];
        lyric_box.style.top = '0px';
        let lyric = document.getElementsByClassName('little_lyric');
        for(var i = 0; i < lyric.length; i++){
            lyric[i].style.color = '#fff'
        }
    }
    //根据时间调整歌词
    dealLyricByTime(scond,endtime){
        let lyric = document.getElementsByClassName('little_lyric');
        let lyricBox = document.getElementsByClassName('lyric_box')[0];
        for(var i = 0; i < this.state.lyric.length; i++){
            let time = this.state.lyric[i].lyrictime;//每句歌词时间
            // let text = this.state.lyric[i].content;//每句歌词内容
            let nexttime = i < this.state.lyric.length - 1?this.state.lyric[i+1].lyrictime:endtime//下一句歌词时间
            if(scond >= time && scond < nexttime){
                if(i>=1){
                    lyric[i-1].style.color = '#fff'
                }
                lyric[i].style.color = 'red';
                // console.log('top:'+lyric[i].offsetTop)
                // (parseInt(lyric[i].offsetTop)-115)
                if(parseInt(lyric[i].offsetTop) > 115 && this.text !== lyric[i].innerText){
                    // let height = parseInt(window.getComputedStyle(lyric[i-1]).height);
                    // console.log('height:'+height)
                    // lyricBox.style.top =parseInt(lyricBox.style.top) - height + 'px';
                    lyricBox.style.top = 0-(parseInt(lyric[i].offsetTop)-115) + 'px'
                    this.text = lyric[i].innerText;
                }
                break;
            }
        }
    }
    render(){
        return(
            <div className="outerBox">
                <div className="liner"></div>
                <div className="mymusic_main_box">
                    <div className="mymusic_left">
                        <div className="mymusic_myvideo">我的视频(8)</div>
                        <div className="mymusic_createdMusicList">
                            <i className="iconfont open" onClick={()=>this.musicListStatus()} style={{display:'line'}} >&#xe639;</i>
                            <i className="iconfont close" onClick={()=>this.musicListStatus()} style={{display:'none'}} >&#xe669;</i>
                            <span onClick={()=>this.musicListStatus()}>创建的歌单</span>
                            <ul className="mymusic_img_box" style={{display:this.state.count === 0?'block':'none'}}>
                                {
                                    mymusicListImg.map((item,index)=>{
                                        return(
                                            <li key={index} className="mymusic_img">
                                                <img src={item} alt=""/>
                                                <span className="mymusic_name">{mymusicName[index]}</span>
                                                <span className="mymusic_text">{mymusicText[index]}</span>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                        <div className="mymusic_createdMusicList" style={{top:this.state.count === 0?'260px':'10px'}}>
                            <i className="iconfont open" onClick={()=>this.collectListStatus()} style={{display:this.state.flag === 0?'block':'none'}}>&#xe639;</i>
                            <i className="iconfont close" onClick={()=>this.collectListStatus()} style={{display:this.state.flag === 1?'block':'none'}}>&#xe669;</i>
                            <span onClick={()=>this.collectListStatus()}>收藏的歌单</span>
                            <ul className="mymusic_img_box" style={{display:this.state.flag === 0?'block':'none'}}>
                                {
                                    collectImg.map((item,index)=>{
                                        return(
                                            <li key={index} className="mymusic_img">
                                                <img src={item} alt=""/>
                                                <span className="mymusic_name">{collectName[index]}</span>
                                                <span className="mymusic_text">{collectText[index]}</span>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                    <div className="mymusic_right" onWheel={(e)=>this.handleWheel(e)}>
                        <div className="mymusic_right_userInfo_box">
                            <div className="mymusic_right_userInfo_content">
                                <img src={musicListImg[0]} alt=""/>
                                <div className="userInfo_content_header">
                                    <div style={{overflow:'hidden'}}>
                                        <span className="musicIcon"></span>
                                        <span className="musicListName">PLEASE--STAY的2019年度歌单</span>
                                    </div>
                                    <div style={{marginTop:'10px',overflow:'hidden'}}>
                                        <span className="user_music_icon"></span>
                                        <span className="user_music_Name">KISS-IN-THE-FUTURE</span>
                                        <span className="musicList_CreateDate">2019-12-30 创建</span>
                                    </div>
                                    <div style={{overflow:'hidden',marginTop:'20px'}}>
                                        <span className="play_music_button">播放</span>
                                        <span className="add_music_button"></span>
                                        <span className="collect_music_button">收藏</span>
                                        <span className="collect_music_button_end"></span>
                                        <span className="share_music_button">分享</span>
                                        <span className="share_music_button_end"></span>
                                        <span className="download_music_button">下载</span>
                                        <span className="download_music_button_end"></span>
                                        <span className="discuss_music_button">评论</span>
                                        <span className="discuss_music_button_end"></span>
                                    </div> 
                                </div>
                            </div>
                            <div className="music_List">
                                <span>歌曲列表</span>
                            </div>
                        </div>
                        <div className="music_List_header">
                            <span className="music_List_header_item1"></span>
                            <span className="music_List_header_item2">歌曲标题</span>
                            <span className="music_List_header_item3">时长</span>
                            <span className="music_List_header_item4">歌手</span>
                            <span className="music_List_header_item5">专辑</span>
                        </div>
                        <MyBestLikeMusic></MyBestLikeMusic>
                    </div>
                </div>
                <div id="music_list" onMouseEnter={()=>this.showPlayerAndList()} onMouseLeave={()=>this.hidePlayer()}>
                    <div id="music_list_left">
                        <div className="show_music_list_header">
                            <span style={{paddingLeft:'30px'}}>播放列表</span>
                        </div>
                        <div className="shwo_music_list_item" onWheel={(e)=>{this.littleHandleWheel(e)}}>
                            {
                                musicList.map((item,index)=>{
                                    return(
                                        <div key={index}>
                                            <span className="item_name">{item.name}</span>
                                            <span className="item_singer">{item.singer}</span>
                                            <span id="item_time">{item.time}</span>
                                            <span className="from_musicList_bg"></span>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div id="music_list_right">
                        <div className="show_music_list_header"></div>
                        <div className="show_music_lyric">
                            <ul className="lyric_box" style={{top:'0px'}}>
                                {
                                    this.state.lyric.map((value,index)=>{
                                        return(
                                            <li key={index} className="little_lyric">{value.content}</li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="show_player" onMouseEnter={()=>this.showPlayer()}></div>
                <div className="player" onMouseLeave={()=>this.hidePlayer()}>
                    <div className="player_oneImg">
                        <div className="play_content">
                            <div className="control_play">
                            <i className="iconfont" onClick={()=>this.lastmusic()}>&#xe60b;</i>
                            <span onClick={()=>this.playMusic()}>
                                <i className="iconfont play-music" style={{display:'inline'}} >&#xe628;</i>
                                <i className="iconfont play-music" style={{display:'none'}} >&#xe625;</i>
                            </span>
                            <i className="iconfont" onClick={()=>this.nextmusic()}>&#xe6a1;</i>
                            </div>
                            <div className="play_bar">
                                <img src={musictouxiang} alt=""/>
                                <div style={{width:'75%'}}>
                                    <div className="musicAndsinger">
                                    <span>{musicList[this.state.index].name}</span>
                                        <span>----{musicList[this.state.index].singer}</span>
                                    </div>
                                    <div className="music_bar">
                                        <div className="music_inner_bar"></div>
                                    </div>
                                </div>
                                <div className="play_time">
                                    <span id="show_time"></span>
                                </div>
                            </div>
                            <div className="play_other">
                                <i className="iconfont">&#xe632;</i>
                                <i className="iconfont">&#xe7c5;</i>
                                <i className="iconfont">&#xe662;</i>
                                <i className="iconfont">&#xe60d;</i>
                                <i className="iconfont show_music_list" onClick={()=>this.contrloLittleList()}>&#xe724;</i>
                            </div>
                        </div>
                    </div>
                    <div className="player_twoImg"></div>
                </div>
                {
                    music.map((item,index)=>{
                        return(
                            <audio className="play1" key={index}>
                                <source src={item}></source>
                            </audio>
                        )
                    })
                }
            </div>
        )
    }
}
export default Mymusic