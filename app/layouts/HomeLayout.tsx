import React from 'react';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { Outlet } from 'react-router';
import { navs } from '../../configs/index'
import type { Route } from './+types/HomeLayout';
import type { RouteConfig } from '@react-router/dev/routes';
const { Header, Content, Footer } = Layout;

type NavEntity = {
    title: string;
    id: number;
    name: string;
}

export async function clientLoader({
    params,
  }: Route.ClientLoaderArgs) {
    const res = await fetch(`http://localhost:3001/navs`);
    let cates: NavEntity[] = await res.json();
    let rt = cates.map(({
        name,
        title
    }) => {
        return {
            key: name,
            label: title
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
  console.log(loaderData)
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
          items={loaderData}
          style={{ flex: 1, minWidth: 0 }}
        />
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