import React from 'react';
import 'antd/dist/antd.css';
import './App.css';
import BES from "../src/img/isologo/BES.png";
import BANANA from "../src/img/isotipo/BES11.png";

import { Layout, Menu } from 'antd';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

//Componentes

//Componentes Generales (Buttons,Tables.. etc)

//Home
import { Home } from './componentes/Home/Home';

//Login
import { Login } from './componentes/Login/Login';

//Singup
import { Singup } from './componentes/Singup/Singup';

import {
  HomeTwoTone,
  UnlockTwoTone,
  PlusCircleTwoTone
} from '@ant-design/icons';

const { Header, Content, Footer, Sider } = Layout;
//const { SubMenu } = Menu;

function App() {
  const [collapse,setCollapse]=React.useState<boolean>(true);

  const handleOnCollapse =()=>{
    setCollapse((currentCollapse:boolean)=>!collapse)
  }

  return (
    <div className="App">
      <Router>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapse} onCollapse={handleOnCollapse} style={{ background:'#404040' }}>
          <Menu theme='light' defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key='1' icon={<HomeTwoTone twoToneColor='#FEC42D'/>}>Home<Link to={'/'}></Link></Menu.Item>
            <Menu.Item key='2' icon={<UnlockTwoTone twoToneColor='#FEC42D'/>}>Login<Link to={'/Login'}></Link></Menu.Item>
            <Menu.Item key='3' icon={<PlusCircleTwoTone twoToneColor='#FEC42D'/>}>Sing up<Link to={'/Signup'}></Link></Menu.Item>   
            {/**
            <SubMenu key="sub1" icon={<UserOutlined />} title="User">
              <Menu.Item key="3">Tom</Menu.Item>
              <Menu.Item key="4">Bill</Menu.Item>
              <Menu.Item key="5">Alex</Menu.Item>
            </SubMenu>
             * 
             */}
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0,background: '#404040',color: '#ffffff',textAlign: 'center' }}><img src={BANANA} alt='Banana' style={{ marginRight: '1REM' }}/>Bananas En Smoking<img src={BANANA} alt='Banana' style={{ transform: 'scaleX(-1)', marginLeft: '1REM' }}/></Header>
          <Content style={{ margin: '0 16px' }}>
            <Switch>
              <Route exact={true} path="/" component={Home}/>
              <Route exact={true} path="/Login" component={Login}/> 
              <Route exact={true} path="/Signup" component={Singup}/> 
            </Switch>
          </Content>
          <Footer style={{ textAlign: 'center', background: '#404040' }}><img src={BES} alt='Banana' width={120} /></Footer>
        </Layout>
      </Layout>
      </Router>
    </div>
  );
}

export default App;
