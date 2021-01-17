import React, { useEffect, useRef } from 'react'
import { Form, Input, Button, InputNumber } from 'antd';
import E from 'wangeditor'

// 与布局有关
const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
}

const Profile = () => {

  let richTextEditor // 编辑器对象

  const onFinish = values => {
  console.log('表单数据', values);
  console.log('富文本编辑器数据：', richTextEditor.txt.html());
}

// 编辑器的ref hook
const editorRef = useRef()

// componentDidUpdate 
// 需要等到DOM挂载结束才能找到div,因此在useEffect当中使用
useEffect(() => {
  // 创建 Editor 对象
  // const richTextEditor = new E(document.getElementById('profile-editor')
  // eslint-disable-next-line
  richTextEditor = new E(editorRef.current)
  richTextEditor.create()
}, [])

  return (
    <>
    <h3>编辑个人信息</h3>
    <Form {...layout} name="nest-messages" onFinish={onFinish}>
      <Form.Item name={['user', 'name']} label="姓名" rules={[{ required: false }]}>
        <Input />
      </Form.Item>
      <Form.Item name={['user', 'email']} label="Email" rules={[{ type: 'email' }]}>
        <Input />
      </Form.Item>
      <Form.Item name={['user', 'age']} label="年龄" rules={[{ type: 'number', min: 0, max: 99 }]}>
        <InputNumber />
      </Form.Item>
      <Form.Item name={['user', 'website']} label="网址">
        <Input />
      </Form.Item>
      <Form.Item name={['user', 'introduction']} label="简介">
        {/* 富文本编辑器的容器 */}
        <div id="profile-editor" ref={editorRef}></div> 
      </Form.Item>
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
    </>
  )
}

export default Profile