import React, { useEffect } from 'react';
import 'antd/dist/antd.css';
import './App.css';
import { urlApi } from "./API";
//import BES from "../src/img/isologo/BES.png";
import BANANA from "../src/img/isotipo/BES11.png";
import CAR from "../src/img/carrito.svg";

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

//Products
import { AllProducts } from './componentes/Products/AllProducts';
import { Seller } from './componentes/Seller/Seller';


import {
  HomeTwoTone,
  UnlockTwoTone,
  PlusCircleTwoTone,
  ShopTwoTone
} from '@ant-design/icons';
import { ProductDetails } from './componentes/Products/ProductDetails';
import { Car } from './componentes/Car/Car';
import { Pedidos } from './componentes/Pedido/Pedidos';

const { Header, Content, Footer, Sider } = Layout;
//const { SubMenu } = Menu;

function App() {
  const [infoUser,setInfoUser]=React.useState<any>();
  const [collapse,setCollapse]=React.useState<boolean>(true);
  const [token,setToken]= React.useState<any>(sessionStorage.token)
  const handleOnCollapse =()=>{
    setCollapse((currentCollapse:boolean)=>!collapse)
  }


  },[])// eslint-disable-line react-hooks/exhaustive-deps
    },500)
      
      setToken(()=>sessionStorage.token);
    setInterval(()=>{
  useEffect(()=>{

  },[])// eslint-disable-line react-hooks/exhaustive-deps
    }
      }
        getUserData()
      if(infoUser === null || infoUser === undefined){
    if(token !== null && token !== undefined){
  useEffect(()=>{

  }
    }
      }
        console.log(error)
      } catch (error) {
        }
          setInfoUser(()=>{return usuario[0]})
        if(response.status === 200 && usuario[0]){
        }});
        const usuario = await response.json();
          'x-access-token': `${token}`
          'Accept': 'application/json',
        const response = await fetch(`${urlApi}/infousuario`,{ method:'Get', mode:'cors', headers:{ 
      try {
    if(token !== null && token !== undefined){
  async function getUserData() {
  return (
    <div className="App">
      <Router>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapse} onCollapse={handleOnCollapse} style={{ background:'#404040' }}>
          <Menu theme='light' defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key='1' icon={<HomeTwoTone twoToneColor='#FEC42D'/>}>Home<Link to={'/'}></Link></Menu.Item>
            <Menu.Item key='2' icon={<UnlockTwoTone twoToneColor='#FEC42D'/>}>Login<Link to={'/Login'}></Link></Menu.Item>
            {token !== null && token !== undefined?
            '':
            <Menu.Item key='3' icon={<PlusCircleTwoTone twoToneColor='#FEC42D'/>}>Sing up<Link to={'/Signup'}></Link></Menu.Item>   
            }
            <Menu.Item key='4' icon={<ShopTwoTone twoToneColor='#FEC42D' />}>All Products<Link to={'/AllProducts'}></Link></Menu.Item> 
            <Menu.Item key='5' icon={<ShopTwoTone twoToneColor='#FEC42D' />}>Add Product<Link to={'/AddProduct'}></Link></Menu.Item> 


              
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
          <Header className="site-layout-background" style={{ padding: 0,background: '#404040',color: '#ffffff',textAlign: 'center',display:'inline' }}><img src={BANANA} alt='Banana' className='App-logo' style={{ marginRight: '1REM' }}/>Bananas En Smoking<img src={BANANA} alt='Banana' className='App-logo' style={{ transform: 'scaleX(-1)', marginLeft: '1REM' }}/>
          {sessionStorage.token !== null && sessionStorage.token !== undefined?
          <Link to='/MyCar'>
          <img src={CAR} alt='' width={35} style={{ position:'relative',left:'40rem'}}/>
          </Link>
          :''}
          </Header>
          <Content style={{ margin: '0 16px' }}>
            <Switch>
              <Route exact={true} path="/" component={Home}/>
              <Route exact={true} path="/Login" component={Login}/> 
              {token !== null && token !== undefined?
              ''
              :
              <Route exact={true} path="/Signup" component={Singup}/> 
              }
              <Route exact={true} path="/AddProduct" component={Seller}/> 
              <Route exact={true} path="/AllProducts" component={AllProducts}/> 
              <Route exact={true} path="/Product/:idproduct" component={ProductDetails}/>
              <Route exact={true} path="/MyCar" component={Car}/>
              <Route exact={true} path="/Pedidos" component={Pedidos}/>

              

              
            </Switch>
          </Content>
          <Footer style={{ textAlign: 'center', background: '#404040' }}>Bananas {infoUser !== null && infoUser !== undefined?infoUser.name:''}</Footer>
        </Layout>
      </Layout>
      </Router>
    </div>
  );
}

export default App;
