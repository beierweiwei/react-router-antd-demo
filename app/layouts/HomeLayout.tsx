import React from 'react';
import { Breadcrumb, Layout, Menu, Space, theme } from 'antd';
import { Outlet, useNavigate } from 'react-router';
import type { Route } from './+types/HomeLayout';
import { UserOutlined } from '@ant-design/icons';
const { Header, Content, Footer } = Layout;

type NavEntity = {
    title: string;
    id: number;
    name: string;
    url: string;
}

export async function clientLoader({
    params,
  }: Route.ClientLoaderArgs) {
    const res = await fetch('http://localhost:3001/navs');
    let cates: NavEntity[] = await res.json();
    let rt = cates.map(({
        title,
        url
    }) => {
        return {
            key: url,
            label: title,
        }
    })
    return rt;
  }

const HomeLayout: React.FC<Route.ComponentProps> = (
    {loaderData}
) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const navigate = useNavigate();
  return (
    <Layout>
      <Header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          style={{ flex: 1, minWidth: 0 }}
          items={loaderData}
          onClick={(e) => {
            navigate(e.key);
          }}
        />
        <Space>
          <a href='/backend'>
            <UserOutlined style={{ fontSize: '20px', color: '#fff' }} />
          </a>
          <a href='/login'>登录</a>
        </Space>
      </Header>
      <Content style={{ padding: '0 48px' }}>
        {/* <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb> */}
        <div
          style={{
            padding: 24,
            minHeight: 380,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet></Outlet>
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Ant Design ©{new Date().getFullYear()} Created by Ant UED
      </Footer>
    </Layout>
  );
};


export default HomeLayout;