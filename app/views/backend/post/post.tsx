import { Table, type TableColumnProps, type TableColumnsType } from "antd"
import type { Post } from "~/views/home/home"

type Props = {
    data: Post[]
}
const columns: TableColumnProps[] = [
    {
        title: '标题',
        dataIndex: 'title',
        key: 'title',
    }
]
export const PostMange = ({ data }: Props) => {
    return <Table dataSource={data} columns={columns} />
}