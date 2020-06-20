import React from 'react';
import { Layout, Breadcrumb } from 'antd';
const { Content } = Layout;

export default function ConfigDetail({ config }: { config?: Object }) {
    return (
        <div>
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>List</Breadcrumb.Item>
                <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb>
            <Content
                className="site-layout-background"
                style={{
                    padding: 24,
                    margin: 0,
                    minHeight: 280,
                }}
            >
                {JSON.stringify(config, undefined, 4)}
            </Content>
        </div>
    );
}
