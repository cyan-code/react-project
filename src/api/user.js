import service from '../utils/index'

export const login = ({username, password}) => service({
  url: '/api/v1/session',
  method: 'POST',
  data: {
    username,
    password
  }
})