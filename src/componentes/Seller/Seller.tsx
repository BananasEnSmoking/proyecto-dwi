import * as React from 'react';
import { Row,Col,Card,Image,Form,Input,Upload, Button, message } from "antd";

import { UploadOutlined } from '@ant-design/icons';
import { nextTick } from 'process';

const Dragger = Upload.Dragger;


export const Seller:React.FC =()=>{
    const [img,setIMG]=React.useState<any>();
    const [data,setData]=React.useState<any>({
        'name':'',

    });

    const handleOnChange =(e:any)=>{
        setData({...data,[e.currentTarget.name]:e.currentTarget.value});
    }

    const hanldeChange=(input:any)=>{
        console.log(input.file)
    }

    return (
        <React.Fragment>
            <Row gutter={{ xs: 4, sm: 16, md: 24, lg: 32 }} style={{ marginTop:'2rem' }}>
                <Col span={10}>    
                    <Card >
                        <Form>
                        <Form.Item
                        label="Product Name"
                        name="name"
                        rules={[{ required: true, message: 'Enter a name product' }]}
                        >
                            <Input name="name" value={data.name} onChange={handleOnChange}/>
                        </Form.Item>
                        <Form.Item
                        label="Price"
                        name="price"
                        rules={[{ required: true, message: 'Enter a price product' }]}
                        >
                            <Input name="price" value={data.price} onChange={handleOnChange}/>
                        </Form.Item>
                        <Dragger
                        accept='.jpg'
                        onChange={hanldeChange}
                        action=''
                        >

                        </Dragger>
                        
                        </Form>
                    </Card>
                </Col>
                <Col>
                {img !== null && img !== undefined?
                <Image src={img}/>
                :
                ''
                }
                </Col>
            </Row>
        </React.Fragment>
    )
}