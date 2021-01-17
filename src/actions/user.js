import { message } from 'antd'
import { login } from '../api/user'
import { LOGIN_FAILED, LOGIN_SUCCESS } from './action-type'
// 异步 action
// 在 action creator 函数体内部返回一个函数，
// 该返回的参数会接收dispatch作为参数，
// 返回的函数会被redux-thunk 中间件自动启动执行
export const loginAsyncAction = ({username, password}) => {
  return dispatch => {
    login({username, password})
    .then(res => {
      // 请求成功
      if (res.success) {
        // 登录成功
        dispatch({
          type: LOGIN_SUCCESS,
          payload: res
        })
      } else {
        // 登陆失败
        dispatch({
          type:LOGIN_FAILED
        })
        message.error('用户名或密码错误')
      }
    })
    .catch(err => {
      console.log('API请求异常：', err);
    })
  }
}