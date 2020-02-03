import { combineReducers, createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { todos, visibilityFilter} from './todo/reducer';
import {  postsBySubreddit,  selectedSubreddit} from './reddit/reducers';
import { curSong, musicList} from './play_music/reducers'

export const store = createStore(
    combineReducers({ curSong, musicList, todos, visibilityFilter, postsBySubreddit,  selectedSubreddit}),
    applyMiddleware(thunkMiddleware)
)