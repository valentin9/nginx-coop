import React from 'react';
import { Layout, Breadcrumb, Table } from 'antd';

const { Content } = Layout;

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
    },
    {
        title: 'Site',
        dataIndex: 'site',
    },
];

export default function ConfigList(props: { configList?: Object[] }) {
    return (
        <div>
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>My configs</Breadcrumb.Item>
            </Breadcrumb>
            <Content
                className="site-layout-background"
                style={{
                    padding: 24,
                    margin: 0,
                    minHeight: 280,
                }}
            >
                <Table dataSource={props.configList} columns={columns} rowKey={'name'} />
            </Content>
        </div>
    );
}
