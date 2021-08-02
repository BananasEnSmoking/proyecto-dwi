import * as React from 'react';
import { Row,Col,Card,Image,Form,Input,Upload, Button, message } from "antd";
import { urlApi } from "../../API";
import { useHistory } from "react-router-dom";


const { Meta } = Card;


const Dragger = Upload.Dragger;


export const Seller:React.FC =()=>{
    const [loading,setLoading]=React.useState<boolean>();
    const [image,setImage]=React.useState<any>();
    const [img,setIMG]=React.useState<any>();
    const [dataProduct,setDataProduct]=React.useState<any>({
        'name':'',
        'price':''
    });
    let history = useHistory();

    

    const [token,setToken]=React.useState<any>(sessionStorage.token)

    async function insertData() {
        try {
            const body = JSON.stringify(dataProduct);
            const response = await fetch(`${urlApi}/insertProduct`,{ method:'post', mode:'cors', headers:{ 
            'Accept': 'application/json',
            "Content-Type": "application/json",
            'x-access-token': token
          },body:body});
          const res = await response.json();
          if(res.msg === 'success'){
              message.success('item added')
             history.push('/AllProducts')
          }
          
        } catch (error) {
          console.log(error)
        }
      }
    

    const handleOnChange =(e:any)=>{
        setDataProduct({...dataProduct,[e.currentTarget.name]:e.currentTarget.value});
    }

    const hanldeChange=(input:any)=>{
        console.log(input.file)
    }

    const handleIMG =async(e:any) => {
        const files = e.target.files
        const data = new FormData()
        data.append('file',files[0])
        data.append('upload_preset','dwzggunyf')
        setLoading(true)
        const res = await fetch('https://api.cloudinary.com/v1_1/dwzggunyf/image/upload',{method:'post',body:data})
        const file = await res.json()
        setDataProduct((current:any)=>{return {...current,'image':file.secure_url}})
        setLoading(false)
    }

    const handleOnSubmit =()=>{
        if(dataProduct.image){
            insertData()
        }else{

            message.error('it is necessary to upload an image')
        }
    }

    return (
        <React.Fragment>
            <Row gutter={{ xs: 4, sm: 16, md: 24, lg: 32 }} style={{ marginTop:'2rem' }}>
                <Col span={10}>    
                <h1>Form</h1>
                    <Card >
                        <Form layout='vertical' onSubmitCapture={handleOnSubmit}>
                        <Form.Item
                        label="Product Name"
                        name="name"
                        rules={[{ required: true, message: 'Enter a name product' }]}
                        >
                            <Input name="name" value={dataProduct.name} onChange={handleOnChange} maxLength={30} style={{ maxWidth:'15rem' }} placeholder='Enter the name'/>
                        </Form.Item>
                        <Form.Item
                        label="Price"
                        name="price"
                        rules={[{ required: true,pattern:/^\d*(\.\d{0,2})?$/ , message: 'Enter a price product (Maximum two decimals)' }]}
                        >
                            <Input name="price" value={dataProduct.price} onChange={handleOnChange} style={{ maxWidth:'15rem' }} pattern='^\d*(\.\d{0,2})?$' placeholder='Enter the price'/>
                        </Form.Item>

                        <input type="file"  name='file' onChange={handleIMG} placeholder='Subir foto'/>
                        <Button htmlType='submit' type='primary' style={{ margin:'1rem' }}>Enviar</Button>
                        </Form>
                    </Card>
                </Col>
                <Col style={{textAlign:'center'}}>
                <h1>Card Preview</h1>
                <Card title={dataProduct.name}>
                   <Image src={dataProduct.image} width={230} height={300}/>
                   <br />
                   <Meta title={`Price:  $${dataProduct.price}`}/>
               </Card>
                </Col>
            </Row>
        </React.Fragment>
    )
}