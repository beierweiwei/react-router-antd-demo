react blog

## 功能点

- 内容管理: 增删改查
- 文章分类: 增删改查
- 标签管理:
- 评论系统:
- 权限控制:
- 用户管理:

## 数据模型

```js
type User  {
    id: string;
    name: string;
    avatar: string;
    account: string;
    passward: string;
    desc: string;
    role: RoleId;
    accountStatus: oneof([1,2]); // 1.禁用 2.可用
    createTime: date;
    updateTime: date;
}

type Post {
    id: number;
    owner: UserId;
    createTime: date;
    updateTime: date;
}


type Comment {
    next: CommnetId;
    owner: UserId;
    post: PostId;
    content: string;
    status: oneof([1,2,3]); // 1. 已删除 2.正常
    updateTime: date;
    createTime: date;
}

type permit {
    name: string;
}



type Role {
    id: number;
    type: oneof([1,2,3]);
}

type RolePermit {
    PermitId: PermitId;
    RoleId: RoleId;
}

type Nav {
    id: "",
    title: "",
    name: "",
    url: ""
}
```

## 特性
- 懒加载
- antd
- tailwindcss
- 路由守卫