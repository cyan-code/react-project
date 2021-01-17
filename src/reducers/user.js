import { LOGIN_SUCCESS, LOGIN_FAILED, TOKENEXPIRED } from "../actions/action-type"

const initialState = {
  userInfo: {},
  token: ''
}

// 实现状态更新的纯函数
const reducer = (state = initialState, { type, payload }) => {
  console.log(state, type, payload);
  switch (type) {

  case LOGIN_SUCCESS: // 登陆成功
    return {
      ...payload
    }

  case LOGIN_FAILED: // 登陆失败
  case TOKENEXPIRED: // TOKEN失效
    return {
      userInfo: {},
      token: ''
    }
  default:
    return state
  }
}

export default reducer