import * as React from "react";
import { Form, Input, Button, Card, Row,message,Avatar } from 'antd';
import { urlApi } from "../../API";


const { Meta } = Card;

export const Login:React.FC=()=>{
    const [isIn,setIsIn] = React.useState<boolean>(false);
    const [token,setToken] = React.useState<any>(sessionStorage.token);
    const [login,setLogin]= React.useState({
        "usuario":"",
        "password":""
    });
    const [infoUser,setInfoUser] = React.useState<any>(null);

    async function singIn() {
        try {
          const body = JSON.stringify(login);
          const response = await fetch(`${urlApi}/signIn`, { method: 'POST', headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },body:body })        
          const res = await response.json();
            if(response.status === 401){
                message.error('Invalido!')
            }
            if(res.token){ sessionStorage.setItem('token',res.token);setToken(sessionStorage.token); getUserData();message.success('Has ingresado!')}
        } catch (error) {
          console.log(error)
        }
      }

      async function getUserData() {
        if(token !== null && token !== undefined){
          try {
            const response = await fetch(`${urlApi}/infousuario`,{ method:'Get', mode:'cors', headers:{ 
              'Accept': 'application/json',
              'x-access-token': `${token}`
            }});
            const usuario = await response.json();
            if(response.status === 200 && usuario[0]){
              setInfoUser(()=>{return usuario[0]})
            }
          } catch (error) {
            console.log(error)
          }
        }
      }


    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };

    const tailLayout = {
        wrapperCol: { offset: 8, span: 16 },
    };

    
    const onFinish = (values: any) => {
        singIn()
    };
    
      
    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    const handleOnChange =(e:any)=>{
        setLogin({...login,[e.currentTarget.name]:e.currentTarget.value})
    }

    React.useEffect(()=>{
      getUserData()
    },[token])

    React.useEffect(()=>{
      setInterval(()=>{
        setIsIn(!isIn)
      },500)
    },[])

    React.useEffect(()=>{

    },[isIn])


    return(
        <React.Fragment>
            <Row gutter={{ xs: 4, sm: 16, md: 24, lg: 32 }} style={{ justifyContent:'center' }}>
              { infoUser !== null && infoUser !== undefined?
              <Card
              style={{ padding:'2rem',margin:'1rem',borderRadius:'10px',boxShadow:'0px 5px 8px rgba(0, 0, 0, 0.377)',background: '-webkit-linear-gradient(bottom, #2dbd6e, #a6f77b)'
}}
              cover={
                <img
                  alt="example"
                  src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                />
              }
              actions={[
                <Button onClick={()=>{sessionStorage.clear();setInfoUser(null)}} type='primary' danger>Log out</Button>
              ]}
            >
              <Meta
                avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                title={`${infoUser.nombre} ${infoUser.apellido}`}
                description={`${infoUser.rol}`}
              />
            </Card>
              :
            <Form
      {...layout}
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      style={{ padding:'2rem',margin:'1rem',borderRadius:'10px',boxShadow:'0px 5px 8px rgba(0, 0, 0, 0.377)',background: '-webkit-linear-gradient(bottom, #2dbd6e, #a6f77b)'
}}
      >
      <Form.Item
        label="Usuario"
        name="user"
        rules={[{ required: true, message: 'Ingresa tu usuario' }]}
        >
        <Input name="usuario" onChange={handleOnChange}/>
      </Form.Item>

      <Form.Item
        label="Contraseña"
        name="contrasena"
        rules={[{ required: true, message: 'Ingresa tu contraseña' }]}
        >
        <Input.Password width='auto' name="password" onChange={handleOnChange} />
      </Form.Item>

    {/*
    <Form.Item {...tailLayout} name="remember" valuePropName="checked">
        <Checkbox>Remember me</Checkbox>
    </Form.Item>
    */}
     
      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
              }
            </Row>
        </React.Fragment>
    )
}
