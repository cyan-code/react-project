import React, { useEffect } from 'react'
import { Modal, Form, Input, Radio, DatePicker } from 'antd'
import moment from 'moment'
// editType:  create 添加； update 编辑
const CustomModal = ({ visible, onCreate, onCancel, editType, editData }) => {
  const [form] = Form.useForm()

  // 可用于模拟componentDidMount/DidUpdate/WillUnmount等生命周期钩子函数
  // 相当于模拟componentDidMount()
  // 初始化表单中的数据
  useEffect(() => {
    form.setFieldsValue({
      sex: '男',
      time: moment(Date.now()),
      type: "1"
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // 相当于模拟componentDidUpdate()
  // 在修改登记数据时，填充表单中待修改项的值
  useEffect(() => {
    form.setFieldsValue(editData)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editData])

  return (
    <Modal
      forceRender
      visible={visible}
      title="编辑信息"
      okText={editType === 'create' ? '添加' : '修改'}
      cancelText="取消"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields() // 触发表单验证 通过进入then，否则catch
          .then((values) => {
            form.resetFields() // 重置表单
            onCreate(values)
          })
          .catch((info) => {
            console.log('Validate Failed:', info)
          })
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
      // initialValues={}
      >
        <Form.Item
          name="_id"
          hidden
        >
          <Input readOnly />
        </Form.Item>

        <Form.Item
          name="name"
          label="姓名"
          rules={[
            {
              required: true,
              message: '请输入姓名!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item name="sex" label="性别">
          <Radio.Group>
            <Radio value="男">男</Radio>
            <Radio value="女">女</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item name='cid' label='身份证号'>
          <Input />
        </Form.Item>

        <Form.Item name="type" label="类型">
          <Radio.Group>
            <Radio value="1">到访</Radio>
            <Radio value="2">外出</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item name="time" label="时间">
          <DatePicker showTime />
        </Form.Item>

        <Form.Item name="temp" label="体温 ℃">
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default CustomModal