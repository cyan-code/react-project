import axios from 'axios'

export const getDashBoardData = () => {
  return axios({
    url: '/tencent/g2/getOnsInfo?name=disease_h5',
    method: 'GET'
  }).then(res => JSON.parse(res.data.data))
}