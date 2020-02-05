import {  PLAY, DELETE, ADD, CLEAR } from './actions';
import { List } from 'utils/list';

let list = new List();

export function musicList(state = [], action) {
    switch (action.type) {
        case ADD: {
            if (state.find(r => r.id === action.song.id)) {
                return state;
            }
            return [...state, action.song]
        }
        case DELETE:
            return state.filter(r => r.id != action.song.id)
        case CLEAR: return []
            
    
        default:
            return state;
    }
}


export function curSong(state = { url: 'http://m7.music.126.net/20200202223347/d594f13cac6a398670e050cc5d8689c5/ymusic/465b/da1f/7e9a/7c3f24036d2ee7c12a01e6579b78f4dd.mp3'}, action) {
    switch (action.type) {
        case PLAY:
            return action.song;
        default:
            return state;
    }
}

