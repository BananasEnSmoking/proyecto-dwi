import * as React from "react";
import { Form, Input, Button, Card, Row,message,Avatar } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { urlApi } from "../../API";


const { Meta } = Card;

export const Login:React.FC=()=>{
    const [isIn,setIsIn] = React.useState<boolean>(false);
    const [login,setLogin]= React.useState({
        "usuario":"",
        "password":""
    });
    const [infoUser,setInfoUser] = React.useState<any>();

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
            if(res.token){ sessionStorage.setItem('token',res.token); getUserData(); message.success('Has ingresado!')}
        } catch (error) {
          console.log(error)
        }
      }

      async function getUserData() {
        if(sessionStorage.token){
          try {
            const response = await fetch(`${urlApi}/infousuario`,{ method:'Get', mode:'cors', headers:{ 
              'Accept': 'application/json',
              'x-access-token': `${sessionStorage.token}`
            }});
            const usuario = await response.json();
            if(response.status === 200 && usuario[0]){
              setInfoUser(usuario[0])
              setIsIn(true)
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


    return(
        <React.Fragment>
            <Row gutter={{ xs: 4, sm: 16, md: 24, lg: 32 }} style={{ justifyContent:'center' }}>
              {isIn?
              <Card
              style={{ width: '35rem', margin:'2rem' }}
              cover={
                <img
                  alt="example"
                  src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                />
              }
              actions={[
                <SettingOutlined key="setting" />,
                <EditOutlined key="edit" />,
                <EllipsisOutlined key="ellipsis" />,
              ]}
            >
              <Meta
                avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                title={`${infoUser.nombre} ${infoUser.apellido}`}
                description="This is the description"
              />
            </Card>
              :
              
            <Form
      {...layout}
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      style={{ margin: '2rem' }}
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
