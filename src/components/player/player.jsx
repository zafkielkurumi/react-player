import React from 'react';
import './player.scss';
import PropTypes from 'prop-types';
import { Volume } from './components/volume/volume';
import { MusicList } from './components/musicList/music_list';
import { dragHandle } from './drag_handle';
import aimer from 'assets/images/aimer.jpg'


const progressWidth = 500;

export class Player extends React.Component {
    static propTypes = {
        curSong: PropTypes.object,
        musicList: PropTypes.array,
        deleteMusic: PropTypes.func,
        playMusic: PropTypes.func,
        clearMusic: PropTypes.func,
    }
    constructor(props) {
        super(props);
        this.state = {
            currentTime: '00:00',
            totalTime: '00:00',
            isPlay: false,
            bufferWidth: 0,
            finishWidth: 0,
            isDraging: false // 进度条是否在拖动中,就算不是用来显示在界面也必须放在state里面才能检测变化？
        }
    }
    isDraging = false // 进度条是否在拖动中

    pbar = React.createRef();  // 拖动进度条
    audio = React.createRef();
    progressItem = React.createRef();


    componentDidMount = () => {
        dragHandle(this.pbar.current, this.onMouseMove, this.onMouseEnd);
    }

    // 进度条拖动
    onMouseMove = (pos) => {
        this.isDraging = true;
        this.setState({
            finishWidth: pos.x >= 493 ? 493 : (pos.x <= 0 ? 0 : pos.x),
        })
    }

    // 进度条拖动结束
    onMouseEnd = () => {
        const audio = this.audio;
        this.isDraging = false;
        if (this.props.curSong.id) {
            const currentTime = this.audio.duration * this.state.finishWidth / progressWidth;
            audio.currentTime = currentTime;
        }
    }
    // 秒转换-分:秒的格式
    getTime = time => {
        if (time) {
            const minute = parseInt((time / 60) % 60);
            const second = parseInt(time % 60);
            let minuteText = `${minute}`;
            let secondText = `${second}`;
            if (minute < 10) {
                minuteText = `0${minute}`;
            }
            if (second < 10) {
                secondText = `0${second}`;
            }
            return `${minuteText}:${secondText}`;
        } else {
            return "00:00";
        }
    };

    // 进度条down
    onMouseDown = (event) => {
        event.stopPropagation();
        event.preventDefault();
    }

    onCanPlay = () => {
        this.setState({
            totalTime: this.getTime(this.audio.duration)
        })
    }
    onMusicEnd = () => {
        // 判断播放模式
    }

    onTimeUpdate = () => {
        const currentTime = parseInt(this.audio.currentTime);
        const buffered = this.audio.buffered;
        let bufferTime = 0;
        if (buffered.length !== 0) {
            bufferTime = buffered.end(buffered.length - 1);
        }
        if (!this.isDraging) {
            this.setState({
                finishWidth: progressWidth * (this.audio.currentTime / this.audio.duration),
            })
        }

        this.setState({
            currentTime: this.getTime(currentTime),
            bufferWidth: progressWidth * (bufferTime / this.audio.duration),
        });
    }

    // 点击设置进度条
    progressMouseDown = (event) => {
        event.preventDefault();
        event.stopPropagation();
        const distX = event.pageX - this.progressItem.getBoundingClientRect().left;
        if (this.props.curSong.id) {
            const currentTime = this.audio.duration * distX / progressWidth;
            this.audio.currentTime = currentTime;
            this.setState({
                currentTime: this.getTime(currentTime)
            })
        }
        this.setState({
            finishWidth: distX,

        })
    }

    onPlayClick = () => {
        this.state.isPlay ? this.audio.pause() : this.audio.play();
    }

    onPlay = () => {
        this.setState({
            isPlay: true
        })
    }

    onPause = () => {
        this.setState({
            isPlay: false
        })
    }

    prevMusic = () => {
        const { musicList, curSong, playMusic } = this.props;
        const index = musicList.findIndex(r => r.id === curSong.id);
        if (index > -1) {
            if (index === 0) {
                playMusic(musicList[musicList.length - 1] || musicList[0]);
            } else {
                playMusic(musicList[index - 1])
            }
            this.onSwitchMusic();
        } else {
            if (curSong.id) {
                this.onSwitchMusic();
            } else {
                this.audio.currentTime = 0
            }
        }

    }

    onSwitchMusic = () => {
        this.audio.currentTime = 0;
        if (!this.state.isPlay) {
            this.audio.play();
        }
    }


    nextMusic = () => {
        const { musicList, curSong, playMusic } = this.props;
        const index = musicList.findIndex(r => r.id === curSong.id);
        if (index > -1) {
            if (index === musicList.length) {
               
                playMusic(musicList[0]);
            } else {
                playMusic(musicList[index + 1] || musicList[0])
            }
            this.onSwitchMusic();
        } else {
            if (curSong.id) {
                this.onSwitchMusic();
            } else {
                this.audio.currentTime = 0
            }
        }
    }

    render() {
        const [props, state] = [this.props, this.state];

        let playButton = state.isPlay ? <span onClick={this.onPlayClick} className="pause"></span> : <span onClick={this.onPlayClick} className="play"></span>;
        return (
            <div className="bottom_box">


                <div className='bg'>
                    <audio
                        onPlay={this.onPlay}
                        onPause={this.onPause}
                        onEnded={this.onMusicEnd}
                        ref={ref => this.audio = ref}
                        onTimeUpdate={this.onTimeUpdate}
                        onCanPlay={this.onCanPlay}
                        autoPlay
                         src={props.curSong.url}
                    ></audio>
                    <div className="player">
                        {/* 操作播放暂停 */}
                        <div className="btns">
                            <span onClick={this.prevMusic} className="pre"></span>
                            {playButton}
                            <span onClick={this.nextMusic} className="next"></span>
                        </div>
                        <img className="avatar" src={props.curSong.picUrl || aimer} alt="" />
                        <div className="progress">
                            <div className="top">
                                <a
                                    href=""
                                    className="song_name">{props.curSong ? props.curSong.name : '暂无播放歌曲'}</a>

                            </div>
                            {/* 进度条 */}
                            <div className="bottom">
                                <div className="progressbar" ref={ref => this.progressItem = ref} onMouseDown={this.progressMouseDown}>
                                    <div style={{ width: `${state.bufferWidth}px` }} className="readeybar"></div>
                                    <div style={{ width: `${state.finishWidth}px` }} className="finishbar"></div>
                                    <div
                                        onMouseDown={this.onMouseDown}
                                        ref={this.pbar}
                                        style={{ transform: `translate3d(${state.finishWidth}px, -50%, 1px)` }}
                                        className="pbar"><i></i></div>
                                </div>
                                <div className="time">{state.currentTime} / {state.totalTime}</div>
                            </div>
                        </div>
                        <div style={{ margin: '11px 0 0 20px', display: 'flex' }}>
                            <Volume setVol={(vol) => this.audio.volume = vol}></Volume>
                            <MusicList
                                musicList={props.musicList}
                                curSong={props.curSong}
                                playMusic={props.playMusic}
                                clearMusic={props.clearMusic}
                                deleteMusic={props.deleteMusic}
                            ></MusicList>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}