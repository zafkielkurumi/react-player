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


export function curSong(state = {}, action) {
    switch (action.type) {
        case PLAY:
            return action.song;
        default:
            return state;
    }
}

