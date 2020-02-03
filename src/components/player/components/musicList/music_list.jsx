import React from 'react';
import './music_list.scss';
import PropTypes from 'prop-types';

export class MusicList extends React.Component {
    static propTypes = {
        musicList: PropTypes.array,
        deleteMusic: PropTypes.func,
        playMusic: PropTypes.func,
        clearMusic: PropTypes.func,
        curSong: PropTypes.object
    }
    constructor(props) {
        super(props);
        this.state = {
            isShow: false
        }
    }

    onDelete = (e, song) => {
        e.stopPropagation();
        this.props.deleteMusic(song);
    }
    render() {
        const [props, state] = [this.props, this.state];
        return (
            <div>
                <span className="icon-list" onClick={() => this.setState({ isShow: !state.isShow })}>{props.musicList.length}</span>
                {state.isShow && <div className="musicList">
                    <span onClick={() => this.setState({ isShow: !state.isShow })} className="musicList-close">关闭</span>
                    <div className="musicList-head">
                        <div className="musicList-head-left">
                            <h4>播放列表({props.musicList.length})</h4>
                            <span onClick={props.clearMusic} className="musicList-clear">清除</span>
                        </div>
                        <div className="musicList-head-right">
                            {props.curSong.name}
                        </div>
                    </div>
                    
                    {/* // onClick={props.playMusic.bind(this, song)} */}
                    <div className="musicList-body">
                        <div className="musicList-body-content">
                            <ul>
                                {props.musicList.map(song => {
                                    return <li key={song.id} onClick={props.playMusic.bind(this, song)}  className={['musicList-li', props.curSong.id === song.id ? 'musicList-li-current' : ''].join(' ')}>
                                        <span>{song.name}</span>
                                        <span onClick={(event) => this.onDelete(event, song)} className="musicList-li-delete">删除</span>
                                    </li>
                                })}
                            </ul>
                        </div>
                        <div className="lyric">todo</div>
                    </div>
                </div>
              }
            </div>

        )
    }
}
