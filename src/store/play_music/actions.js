import {API} from 'http/apis';
export const PLAY = 'PLAY';
export const DELETE = 'DELETE';
export const ADD = 'ADD';
export const PLAYANDADD = 'PLAYANDADD';
export const CLEAR = 'CLEAR';

export function playMusic(song) {
    return {
        type: PLAY,
        song
    }
}

export function addMusic(song) {
    return {
        type: ADD,
        song
    }
}

export function deleteMusic(song) {
    return {
        type: DELETE,
        song
    }
}
export function clearMusic() {
    return {
        type: CLEAR,
    }
}

export function playAndAdd(song) {
    return dispatch => dispatch(requesetData(song))
}



export function requesetData(song) {
    return async dispatch  => {
        let curSong =  await API.getSongUrl(song.id);
        curSong = {
            ...curSong,
            name: song.name,
            picUrl: song.picUrl || song.al.picUrl
        }
        dispatch(addMusic(curSong));
        dispatch(playMusic(curSong));

    }
}

export function shouledRequest(state, id) {
    const { curSong } =  state.musicList;
    if (curSong.id === id) {
        return false
    }
    return true;
}

export const requestIfNeed = id => (dispatch, getState) => {
    if (shouledRequest(getState(), id)) {
        return dispatch(requesetData(id))
    }
}


