import { combineReducers } from 'redux'
import userReducer from './user'


// 多个recuder合并为一个
export default combineReducers({
  user: userReducer
})