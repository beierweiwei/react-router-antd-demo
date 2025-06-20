import React, { useMemo } from "react";
import { Breadcrumb, Layout, Menu, Space, theme } from "antd";
import { href, Outlet, useNavigate } from "react-router";
import type { Route } from "./+types/HomeLayout";
const { Header, Content, Footer } = Layout;
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { title } from "process";
import type path from "path";
const { Sider } = Layout;
type NavEntity = {
  title: string;
  id: number;
  name: string;
  url: string;
  icon: React.ReactNode;
};

const iconsMap = {
  home: <PieChartOutlined />,
  cate: <DesktopOutlined />,
  archives: <FileOutlined />,
  about: <UserOutlined />,
};

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const res = await fetch("http://localhost:3001/backend_navs");
  let navs: Record<string, string>[] = await res.json();

  return navs.map(({ title, url, name }) => {
    return {
      key: url,
      label: title,
      icon: iconsMap[name as keyof typeof iconsMap],
    };
  });
}

const HomeLayout: React.FC<Route.ComponentProps> = ({
  loaderData,
  matches,
}) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const navigate = useNavigate();
  const siderStyle: React.CSSProperties = {
    overflow: "auto",
    height: "100vh",
    position: "sticky",
    insetInlineStart: 0,
    top: 0,
    bottom: 0,
    scrollbarWidth: "thin",
    scrollbarGutter: "stable",
  };

  const breadcrumbData = useMemo(() => {
    return matches
      .filter((item) => item && item.pathname !== "/backend")
      .map((item) => {
        if (!item) return null;
        return {
          href: item.pathname,
          title: loaderData.find((ld) => ld.key === item.pathname)?.label,
        };
      })
      .filter(Boolean);
  }, [matches, loaderData]);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider style={siderStyle} collapsible>
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["2"]}
          items={loaderData}
          onClick={(e) => {
            navigate(e.key);
          }}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            position: "sticky",
            top: 0,
            zIndex: 1,
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "end",
          }}
        >
          <Space>
            <a href="/backend">
              <UserOutlined style={{ fontSize: "20px", color: "#fff" }} />
            </a>
            <a href="/login">登录</a>
          </Space>
        </Header>
        <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
          <Breadcrumb style={{ margin: "16px 0" }} items={breadcrumbData} />
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
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default HomeLayout;
