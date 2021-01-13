import API from './constant'
import service from '../utils'

// 分页查询
export const find = (page = 1, pageSize = 5) => {
  return service({
    url: API.MANAGEMENT_API,
    method: 'GET',
    params: {
      page,
      pageSize
    }
  })
}

// 新增数据
export const add  = ({ name, sex, cid, type, time, temp }) => {
  return service({
    url: API.MANAGEMENT_API,
    method: 'POST',
    data: { name, sex, cid, type, time, temp }
  })
}

// 修改

// 删除