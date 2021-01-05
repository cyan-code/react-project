import React from 'react'
import { Layout, Menu } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons';

import './layout.less'
import { permissionRoutes } from '../routes';
import { withRouter } from 'react-router-dom';

const { Header, Sider, Content } = Layout;

// 用户登录后界面的框架结构
class FrameLayout extends React.Component {
  
  // 组件内部私有的状态数据
  state = {
    collapsed: false,
  };
  // 切换侧边菜单显示还是折叠
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };
  
  // 处理点击左侧菜单时的行为，根据返回的key的路径，通过编程式导航跳转到响应的页面
  menuClickHandler = ({key}) => {
    this.props.history.push(key)
  }
  // 渲染结构
  render() {
    return (
      <Layout className="app-layout">
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
          <div className="logo" />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['/admin/dashboard']}
            onClick={this.menuClickHandler}
          >

            {/* 从路由列表当中循环输出item */}
            {permissionRoutes.map( item => {
              return <Menu.Item key={item.path} icon={< item.meta.icon />}>
              { item.meta.title }
              </Menu.Item>
            })}

          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
            {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: this.toggle,
            })}
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: '12px',
              padding: 12,
              minHeight: 280,
            }}
          >
            { this.props.children}
          </Content>
        </Layout>
      </Layout>
    );
  }
}
// 添加withRouter高阶组件，把history放到其属性当中，这样可以通过history.push方法
// 完成编程式导航
export default withRouter(FrameLayout)
