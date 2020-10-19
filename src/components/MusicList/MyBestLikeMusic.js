import React,{Component} from 'react'
import './MyBestLikeMusic.css'
const musicList = require('../../assets/BestLikeMusicInfo')
class MyBestLikeMusic extends Component{
    constructor(props){
        super(props)
    }
    componentDidMount(){
    }
    render(){
        return(
            <div className="BestLikeMusicBox">
                {
                    musicList.map((item,index)=>{
                        return(
                            <div className="BestLikeMusic_item" key={index} style={{backgroundColor:
                            index%2 === 0?'#fff':'#f7f7f7'}}>
                                <span className="item_index">{index}</span>
                                <span className="item_Icon"><i className="iconfont">&#xe710;</i></span>
                                <span className="item_Name">{item.name}</span>
                                <span className="item_time">{item.time}</span>
                                <span className="item_singer">{item.singer}</span>
                                <span className="item_special">{item.specialIssue}</span>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}
export default MyBestLikeMusic;