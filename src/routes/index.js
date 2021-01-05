import Login from "../views/login"
import Err404 from "../views/err404"
import Dashboard from "../views/dashboard"
import Manage from "../views/manage"
import Profile from "../views/profile"

//引入图标
import {
  DashboardOutlined,
  BarsOutlined,
  UserOutlined
} from '@ant-design/icons'

// 不需要登录即可访问
const whiteListRoutes = [{
  path: '/login',
  component: Login
},
  {
    path: '/404',
    component: Err404
  }
]

// 需要登录
const permissionRoutes = [
  {
    path: '/admin/dashboard',
    component: Dashboard,
    meta: {
      title: '仪表盘',
      icon: DashboardOutlined
    }
  },
  {
    path: '/admin/manage',
    component: Manage,
    meta: {
      title: '登记管理',
      icon: BarsOutlined
    }
  },
  {
    path: '/admin/profile',
    component: Profile,
    meta: {
      title: '个人中心',
      icon: UserOutlined
    }
  }
]

export {
  whiteListRoutes,
  permissionRoutes
}