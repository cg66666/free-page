/*
 * @Description: file content
 * @Author: 朱晨光
 * @Date: 2023-12-24 17:40:36
 * @LastEditors: 朱晨光
 * @LastEditTime: 2023-12-25 17:46:21
 */
import React, { useState } from 'react';
import './App.less';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import MemSider from '@/components/MenuSider';
type MenuItem = Required<MenuProps>['items'][number];
// import s from './App.module.less';
const { Header, Sider, Content } = Layout;

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  console.log('MemSider', MemSider);

  function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
  ): MenuItem {
    return {
      key,
      icon,
      children,
      label,
    } as MenuItem;
  }

  const items: MenuItem[] = [
    getItem('Option 1', '1', <PieChartOutlined />),
    getItem('Option 2', '2', <DesktopOutlined />),
    getItem('User', 'sub1', <UserOutlined />, [
      getItem('Tom', '3'),
      getItem('Bill', '4'),
      getItem('Alex', '5'),
    ]),
    getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
    getItem('Files', '9', <FileOutlined />),
  ];

  return (
    <Layout>
      <Header>Header</Header>
      <Layout style={{ height: 'calc(100vh - 64px)' }}>
        <MemSider>
          <Menu theme='dark' defaultSelectedKeys={['1']} mode='inline' items={items} />
        </MemSider>
        <Content>Content</Content>
      </Layout>
    </Layout>
  );
};

export default App;
