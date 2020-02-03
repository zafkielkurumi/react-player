import React from 'react';
import PropTypes from 'prop-types'
import { API } from 'http/apis';
import { playAndAdd, addMusic, clearMusic, deleteMusic } from 'store/play_music/actions';
import './aimer_top.scss';
import { connect } from 'react-redux';
import aimer from 'assets/images/aimer.jpg'


export default class AimerTop extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            songs: []
        }
    }

    componentWillMount() {
        API.getTopSong('16152').then(songs => {
            this.setState({
                songs
            })
        });
    }



    render() {
        return (
            <div className="aimer_top">
                <div className="artist_name">Aimer <span style={{ fontSize: '17px' }}>エメ</span></div>
                <img src={aimer} alt="" />
                {/* <a className="play_button">播放</a>
                <a className="add_button">添加</a> */}
                <ul>
                    <SongListBox songs={this.state.songs}></SongListBox>
                </ul>
            </div>

        )
    }
}

const SongList = ({ songs, onDoubleClick, onPlay, onAdd }) => {

    const songTitle = songs.map((song, index) => <li
        className="song_title"
        style={index % 2 === 0 ? { backgroundColor: '#f7f7f7' } : {}}
        onDoubleClick={onDoubleClick.bind(this, song)}
        key={song.id}>
        <span >{index + 1}</span> <span style={{ marginRight: '20px' }}>{song.name}</span>
        <a onClick={() => onAdd(song)}>添加</a>
        <a onClick={() => onPlay(song)}>播放</a>
          
    </li>)
    return songTitle
}
SongList.prototype = {
    songs: PropTypes.bool.isRequired,
    onPlay: PropTypes.func.isRequired,
    onAdd: PropTypes.func.isRequired,
}

const mapStateToProps = (state, ownProps) => ({
    songs: ownProps.songs,
})


const mapDispatchToProps = dispatch => {
    return {
        onDoubleClick: song => dispatch(playAndAdd(song)),
        onPlay: song => dispatch(playAndAdd(song)),
        onAdd: song => dispatch(addMusic(song))
    }
}

const SongListBox = connect(mapStateToProps, mapDispatchToProps)(SongList)

