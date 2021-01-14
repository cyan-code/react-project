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
export const update = ({ _id, name, sex, cid, type, time, temp }) => service({
  url: API.MANAGEMENT_API,
  method: 'PUT',
  data: {
    _id, name, sex, cid, type, time, temp
  }
})

// 删除
export const remove = _id => {
  return service({
    url: API.MANAGEMENT_API + '/' + _id,
    method: "DELETE",
  })
}