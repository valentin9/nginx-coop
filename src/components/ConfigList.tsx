import React from 'react';
import { Layout, Breadcrumb, Table } from 'antd';
import { useHistory } from 'react-router-dom';
import ConfigType from '../interfaces/ConfigTypeInterface';

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

export default function ConfigList(props: { configList?: ConfigType[], setCurrentConfig?: Function }) {
    const history = useHistory();

    function navigateToDetail(record: any, rowIndex: any) {
        return {
            onClick: () => {
                if (props.setCurrentConfig) {
                    props.setCurrentConfig(record);
                }
                history.push(`/config/${ record.name }`);
            },
        };
    }

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
                <Table dataSource={props.configList} columns={columns} rowKey={'name'} onRow={navigateToDetail} />
            </Content>
        </div>
    );
}
