import { combineReducers, createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { curSong, musicList} from './play_music/reducers'

export const store = createStore(
    combineReducers({ curSong, musicList,}),
    applyMiddleware(thunkMiddleware)
)