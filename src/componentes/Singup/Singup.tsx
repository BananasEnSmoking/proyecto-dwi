import * as React from "react";
import { Row,Col,Card,Form,Input,Radio,Button } from "antd";

export const Singup:React.FC =()=>{
    const [rol,setRol]=React.useState<any>(2);

    const onChange =(e:any)=>{
        setRol(e.target.value)
    }


    return(
        <React.Fragment>
            <Row justify='center'>
                <Col>
                    <Card title='Sing up'>
                        <Form layout='vertical'>
                            <Row>
                            <Form.Item label='Username'>
                                <Input  type='text'/>
                            </Form.Item>
                            <Form.Item label='Username'>
                                <Input  type='password'/>
                            </Form.Item>
                            <Form.Item label='Name'>
                                <Input  type='text'/>
                            </Form.Item>
                            <Form.Item label='Last Name'>
                                <Input  type='text'/>
                            </Form.Item>
                            <Radio.Group onChange={onChange} value={rol}>
                                <Radio value={2}>Purchase</Radio>
                                <Radio value={3}>Seller</Radio>
                            </Radio.Group>
                            <Button type='primary'>
                                Send
                            </Button>
                            </Row>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </React.Fragment>
    )
}
