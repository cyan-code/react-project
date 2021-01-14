import { Table, Button, Space, Popconfirm } from 'antd';
import moment from 'moment' // 引入时间插件

const CustomTable = props => {
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
          <Button onClick={ () => {
            record.time = moment(record.time)
            props.onUpdate(record)
          } }>修改</Button>
          <Popconfirm
            title="确认要删除该数据吗?"
            onConfirm={() => props.onDelete(record._id)}
            okText="Yes"
            cancelText="No"
            >
              <Button type="primary">删除</Button>
            </Popconfirm>
        </Space>
      ),
    },
  ];
  return (
    <Table
      bordered
      rowKey="_id"
      columns={ columns } 
      dataSource={ props.dataSource }
      pagination = { props.pagination }
      title = { () => {
        return (<div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>出入管理表</div>
          <div>
            <Space size="small">
              <Button type="primary" onClick={ props.onAdd }>新增</Button>
              <Button>导出</Button>
            </Space>
          </div>
        </div>)
      } }
    />
  )
}

export default CustomTable