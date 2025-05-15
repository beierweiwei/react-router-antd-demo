import type { Route } from "../../routes/+types/home";
import React from 'react';
import { LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons';
import { Avatar, List, Space } from 'antd';

type Post = {
    id: number;
    content: string;
    createAt: string;
    updateAt: string;
    author: string;
    title: string;
    avatar: string;
    href: string;
  }
  
const IconText = ({ icon, text }: { icon: React.FC; text: string }) => (
<Space>
    {React.createElement(icon)}
    {text}
</Space>
);
export const Home: React.FC<{data: Post[]}> = ({data}) => (
    <List
      itemLayout="vertical"
      size="large"
      pagination={{
        onChange: (page) => {
          console.log(page);
        },
        pageSize: 3,
      }}
      dataSource={data}
      renderItem={(item) => (
        <List.Item
          key={item.id}
          actions={[
            <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
            <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
            <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
          ]}
        //   extra={
        //     <img
        //       width={272}
        //       alt="logo"
        //       src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
        //     />
        //   }
        >
          <List.Item.Meta
            avatar={<Avatar src={item.avatar} />}
            title={<a href={item.href}>{item.title}</a>}
            description={item.content}
          />
          {item.content}
        </List.Item>
      )}
    />
  );
