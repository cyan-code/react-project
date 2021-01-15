import React, { Component } from 'react'
import XLSX from 'xlsx'
import CustomTable from './custom'
import { find, add, update, remove } from '../../api/manage'
// 引入modal框
import CustomModal from './modal'

export default class Manage extends Component {
  state = {
    data: [],
    visible: false, // 对话框的可见性
    modalEditType: '', // create添加 update 修改
    editData: null, // modal当中等待修改的数据
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
  setVisible = visible => {
    this.setState({
      visible
    })
  }

  exportFileHandler = () => {
    // 创建一个二维数组，以符合这个插件转换成excel的数据源结构要求
    // 要求就是二维数组，每个子数组代表一行 e.g.[[行1],[行2],...[行n]]
    const exportData = [
      ['primary key', 'name', 'sex', 'cid', 'type', 'time', 'temp', 'version'],
      ...this.state.data.map(item => Object.values(item))
    ]
    // 把state转换为工作簿
    const ws = XLSX.utils.aoa_to_sheet(exportData)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'SheetJS')
    // 生成XLSX文件并发送到客户端
    XLSX.writeFile(wb, "sheetjs.xlsx")
  }

  exportFileAllHandler = async () => {
    // 打印全部
    let temp = []
    const totalPage = Math.ceil(this.state.total / this.state.pageSize)
    for (let i = 1; i <= totalPage; i++) {
      const res = await find(i, this.state.pageSize)
      temp.push(...res.list)
    }
    temp = temp.map(item => Object.values(item))
    let exportData = [
      ['primary key', 'name', 'sex', 'cid', 'type', 'time', 'temp', 'version'],
      ...temp
    ]

    // 把state转换为工作簿
    const ws = XLSX.utils.aoa_to_sheet(exportData)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'SheetJS')
    // 生成XLSX文件并发送到客户端
    XLSX.writeFile(wb, "sheetjs.xlsx")
  }

  render() {
    return (
      <div>
        {/* 表格 */}
        <CustomTable 
          dataSource={ this.state.data }
          pagination = {{
            total: this.state.total,
            pageSize: this.state.pageSize,
            onChange: this.pageChangeHandler
          }}
          onAdd = {() => {
            this.setState({
              visible: true,
              modalEditType: 'create',
              editData: null
            })
          }}
          onUpdate = { record => {
            this.setState({
              visible: true,
              modalEditType: 'update',
              editData: record
            })
          }}
          onDelete ={ _id => {
            remove(_id) 
            this.findByPage(this.state.page, this.state.pageSize)
          }}
          onExport = { // 导出excel文件
            () => { this.exportFileHandler() }
          }
          onExportAll = {
            () => { this.exportFileAllHandler() }
          }
        />
        {/* 对话框 */}
        <CustomModal 
          visible={ this.state.visible }
          onCreate = { async values => {
            values.time = +values.time // 把moment对象转换为时间戳
          if (this.state.modalEditType === 'create') {
            add(values) // 发送新增项目ajax请求，添加登记信息
            // 刷新渲染表格
            const page = Math.ceil((this.state.total + 1) / this.state.pageSize)
            this.findByPage(page, this.state.pageSize)
          } else {
            // 发送修改ajax请求
            update(values)
            // 更改数据源中修改的数据项
            this.setState({
              data: this.state.data.map(item => {
                if (item._id === values._id) {
                  return values
                }
                return item
              })
            })

          }
            this.setVisible(false)
          }}
          onCancel = {() => {
            // todo
            this.setVisible(false)
          }}
          editType = { this.state.modalEditType }
          editData = { this.state.editData }
        />
      </div>
    )
  }
}
