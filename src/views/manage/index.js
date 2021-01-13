import React, { Component } from 'react'
import CustomTable from './custom'
import { find, add } from '../../api/manage'
export default class Manage extends Component {
  state = {
    data: []
  }
  // 封装一个查询数据方法
  findByPage = async(page = 1, pageSize = 5) => {
    // 查询结果
    const result = await find(page, pageSize)
    const { list, total } = result
    this.setState({
      data: list,
      total,
      page,
      pageSize
    })
  }
  pageChangeHandler = (page, pageSize) => {
    this.findByPage(page, pageSize)
  }
  // 在这个钩子函数当中加载网络请求
  componentDidMount() {
    this.findByPage()
  }
  render() {
    return (
      <div>
        管理页面
        <CustomTable 
          dataSource={ this.state.data }
          pagination = {{
            total: this.state.total,
            pageSize: this.state.pageSize,
            onChange: this.pageChangeHandler
          }}
        />
      </div>
    )
  }
}
