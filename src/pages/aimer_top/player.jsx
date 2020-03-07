import {Player} from 'components';
import { connect } from 'react-redux';
import { deleteMusic, playAndAdd, clearMusic } from 'store/play_music/actions';




const mapStateToProps = state => {
    return {
        curSong: state.curSong,
        musicList: state.musicList

      }
}

const mapDispatchToProps = dispatch => ({
  deleteMusic: song => dispatch(deleteMusic(song)),
  playMusic: song =>dispatch(playAndAdd(song)),
  clearMusic: () => dispatch(clearMusic())
})

export default connect(mapStateToProps, mapDispatchToProps)(Player);