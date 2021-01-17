import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk' 
import rootReducer from '../reducers/index'


// 创建Store，应用redux·thunk中间件处理异步action, 并导出
export default createStore(rootReducer, applyMiddleware(thunk))