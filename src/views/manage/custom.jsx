import { Table, Button, Space } from 'antd';
import moment from 'moment' // 引入时间插件
const columns = [
  {
    title: '编号',
    key: 'id',
    align: 'center',
    render(text, record, index){
      return <span>{ index + 1 }</span>
    }
  },
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: '性别',
    dataIndex: 'sex',
  },
  {
    title: '身份证号',
    dataIndex: 'cid',
  },
  {
    title: '类型',
    dataIndex: 'type',
    render(text) {
      return <span>{ text === '1' ? '到访' : '外出' }</span>
    }
  },
  {
    title: '时间',
    dataIndex: 'time',
    render(text) {
      return <span>{moment(text).format('YYYY-MM-DD HH:mm:ss')}</span>
    }
  },
  {
    title: '体温',
    dataIndex: 'temp',
    render(text) {
      return <span>{text + '℃'}</span>
    }
  },
  {
    title: '操作',
    key: 'action',
    render: (text, record) => (
      <Space size="middle">
        <Button>修改</Button>
        <Button type="primary">删除</Button>
      </Space>
    ),
  },
];

const CustomTable = props => {
  return (
    <Table
      bordered
      rowKey="_id"
      columns={ columns } 
      dataSource={ props.dataSource }
      pagination = { props.pagination }
    />
  )
}

export default CustomTable