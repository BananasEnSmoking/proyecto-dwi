import * as React from "react";
import { Row,Col,Card,Form,Input,Radio,Button,message } from "antd";
import { urlApi } from "../../API";
import { useHistory } from "react-router-dom";


export const Singup:React.FC =()=>{
    let history = useHistory();
    const [data,setData]=React.useState<any>({
        'username':'',
        'password':'',
        'name':'',
        'lastname':'',
        'rol':2
    });

    async function signup() {
        try {
          const body = JSON.stringify(data);
          const response = await fetch(`${urlApi}/signup`, { method: 'POST', headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },body:body })        
          const res = await response.json();
            if(response.status === 401){
                message.error('Fail!')
            }
            if(res.msg === 'success'){
                message.success('Creado con exito');
                history.push(`/Login`);
            }
        } catch (error) {
          console.log(error)
        }
      }

    const onChange =(e:any)=>{
        setData((current:any) => {return {...current,['rol']:e.target.value}})
    }

    const onChangeInput =(e:any)=>{
        setData({...data,[e.currentTarget.name]:e.currentTarget.value})
        
    }

    const  onSubmit =(e:React.FormEvent)=>{
        e.preventDefault();
        console.log(data)
        signup()
    }

    return(
        <React.Fragment>
            <Row justify='center' style={{ margin:10}}>
                <Col span={8}>
                    <Card title='Sing up'>
                        <Form layout='vertical' onSubmitCapture={onSubmit}>
                            <Row gutter={[15,15]}>
                                <Col>
                                <Form.Item label='Username'>
                                <Input name='username' onChange={onChangeInput} type='text'/>
                            </Form.Item>
                                </Col>
                                <Col>
                                <Form.Item label='Username'>
                                <Input  name='password' onChange={onChangeInput} type='password'/>
                            </Form.Item>
                                </Col>
                                <Col>
                                <Form.Item label='Name'>
                                <Input name='name' onChange={onChangeInput} type='text'/>
                            </Form.Item>
                                </Col>
                                <Col>
                                <Form.Item label='Last Name'>
                                <Input  name='lastname' onChange={onChangeInput} type='text'/>
                            </Form.Item>
                                </Col>
                                <Col>
                                <Radio.Group name='rol' onChange={onChange} value={data.rol}>
                                <Radio value={2}>Purchase</Radio>
                                <Radio value={3}>Seller</Radio>
                            </Radio.Group>
                                </Col>
                                <Col>
                                <Button type='primary' htmlType='submit'>
                                Send
                            </Button>
                                </Col>
                            </Row>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </React.Fragment>
    )
}
