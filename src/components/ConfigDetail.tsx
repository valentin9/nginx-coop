import React from 'react';
import { Layout, Breadcrumb } from 'antd';
import ConfigType from '../interfaces/ConfigTypeInterface';

const { Content } = Layout;

export default function ConfigDetail({ config }: { config?: ConfigType }) {
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
                { config && (
                    <pre>
                        {JSON.stringify(config.json, undefined, 4)}
                    </pre>
                ) }
            </Content>
        </div>
    );
}
