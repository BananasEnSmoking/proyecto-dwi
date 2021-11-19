import * as React from "react";
import { Row,Col,Card,Form,Input,Radio,Button,message } from "antd";
import { urlApi } from "../../API";
import { useHistory } from "react-router-dom";
import BES from "../../img/isologo/BES.png";

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
            if(response.status === 400){
                message.error(res)
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
        setData((current:any) => {return {...current,'rol':e.target.value}})
        console.log(data)
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
                    <Card title={
                    <React.Fragment>
                        <Row>
                            <Col span={12}>
                        <img src={BES} alt='Banana' width={120} />
                            </Col>
                            <Col span={12}>
                        <h2>Sing up</h2>
                            </Col>
                        </Row>
                        </React.Fragment>
                        } className='title-card' style={{ borderRadius:'10px',boxShadow:'0px 5px 8px rgba(0, 0, 0, 0.377)',background: 'linear-gradient(to right, #06beb6, #48b1bf)'
}}>
                        <Form layout='vertical' onSubmitCapture={onSubmit} >
                            <Row gutter={[15,15]}>
                                <Col>
                                <Form.Item label='Username'
                                rules={[{ required: true,pattern:/^[^'^"]*$/, message: 'Invalid Password' }]}
                                >
                                <Input name='username' onChange={onChangeInput} type='text' minLength={3} maxLength={20} required className='inpu'/>
                            </Form.Item>
                                </Col>
                                <Col>
                                <Form.Item label='Password'
                                rules={[{ required: true,pattern:/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/, message: 'Invalid Password' }]}
                                >
                                <Input  name='password' onChange={onChangeInput} type='password' minLength={8} maxLength={16} required className='inpu'/>
                            </Form.Item>
                                </Col>
                                <Col>
                                <Form.Item label='Name'
                                rules={[{ required: true,pattern:/^[^'^"]*$/, message: 'Invalid Password' }]}>
                                <Input name='name' onChange={onChangeInput} type='text' minLength={3} maxLength={20} required className='inpu'/>
                            </Form.Item>
                                </Col>
                                <Col>
                                <Form.Item label='Last Name'
                                rules={[{ required: true,pattern:/^[^'^"]*$/, message: 'Invalid Password' }]}
                                >
                                <Input  name='lastname' onChange={onChangeInput} type='text' minLength={3} maxLength={20} required className='inpu'/>
                            </Form.Item>
                                </Col>
                                <Col>
                                <Radio.Group name='rol' onChange={onChange} value={data.rol}>
                                <Radio value={2}>Buyer</Radio>
                                <Radio value={3}>Seller</Radio>
                            </Radio.Group>
                                </Col>
                                <Col>
                                <Button type='primary' className='btn-send' htmlType='submit'>
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
