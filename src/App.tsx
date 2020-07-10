import 'antd/dist/antd.css'
import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
} from 'react-router-dom';

import { Layout, Menu } from 'antd';
import ConfigList from './components/ConfigList';
import ConfigDetail from './components/ConfigDetail';
import ConfigType from './interfaces/ConfigTypeInterface';

const { Header, Sider } = Layout;

const API_CONFIG_LIST = 'http://localhost:3100/nginx-configs';

function App(props: any) {
  const [configList, setConfigList] = useState<undefined | ConfigType[]>(undefined);
  const [currentConfig, setCurrentConfig] = useState<undefined | ConfigType>(undefined);

  useEffect(() => {
    getList((data: ConfigType[]) => {
      setConfigList(data);
    });
  }, []);

  return (
    <Layout>
      <Header className="header">
        <h3 style={{color: 'white'}}>
          Nginx Config Manager with co-op
        </h3>
      </Header>
      <Router>
        <Layout>
          <Sider width={200} className="site-layout-background">
            <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              style={{ height: '100%', borderRight: 0 }}
            >
              <Menu.Item key="1">
                <Link to={'/'}>Home</Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Link to={'/configs'}>My configs</Link>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout style={{ padding: '0 24px 24px' }}>
            <Switch>
              <Route path="/configs">
                <ConfigList configList={configList} setCurrentConfig={setCurrentConfig} />
              </Route>
              <Route path="/config/:configName">
                <ConfigDetail config={currentConfig} />
              </Route>
            </Switch>

          </Layout>
        </Layout>
      </Router>
    </Layout>
  );
}

function getList(callback: Function): void
{
  fetch(API_CONFIG_LIST, { headers: { "Content-Type": "application/json; charset=utf-8" }})
    .then(res => res.json())
    .then(response => {
      callback(response);
    })
    .catch(err => {
        console.log(err);
    });
}

export default App;
