import * as React from 'react';
import { Row,Col,Card,Image,Form,Input, Button, message,Select } from "antd";
import { urlApi } from "../../API";
import { useHistory } from "react-router-dom";
import { Preview } from "./Camera/styles";
import { Camera } from './Camera';

const { Meta } = Card;
const { TextArea } = Input;

export const Seller:React.FC =()=>{
    const [categories,setCategories]=React.useState<any>();
    const [dataProduct,setDataProduct]=React.useState<any>({
        'name':'',
        'price':'',
        'category':1,
        'longDescription':'',
    });

    let history = useHistory();

    const [isCameraOpen, setIsCameraOpen] = React.useState<any>(false);
    const [cardImage, setCardImage] = React.useState<any>(false);

    const token= sessionStorage.token

    async function getCategories() {
        try {
          const getInfo = await fetch(`${urlApi}/getCategories`,{ method:'GET', mode:'cors', headers:{ 
            'Accept': 'application/json',
            'x-access-token': token
          }});
          const res = await getInfo.json();
          if(getInfo.status === 200){
            setCategories(res)      
          }
        } catch (error) {
          console.log(error)
        }
      }
    

    async function insertData() {
        try {
            const body = JSON.stringify(dataProduct);
            const response = await fetch(`${urlApi}/insertProduct`,{ method:'POST', mode:'cors', headers:{ 
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

    const handleImageTaken = async(blob:any) => {
        const data = new FormData();
        data.append('file', blob);
        data.append('upload_preset', 'dwzggunyf');
        const res = await fetch('https://api.cloudinary.com/v1_1/dwzggunyf/image/upload', {method:'POST', body: data})
        const file = await res.json();
        setDataProduct((current:any)=>{return {...current, 'image': file.secure_url}})
    }
    
    const handleIMG =async(e:any) => {
        const files = e.target.files
        const data = new FormData()
        data.append('file',files[0])
        data.append('upload_preset','dwzggunyf')
        const res = await fetch('https://api.cloudinary.com/v1_1/dwzggunyf/image/upload',{method:'post',body:data})
        const file = await res.json()
        setDataProduct((current:any)=>{return {...current,'image':file.secure_url}})
    }

    const handleOnSubmit =()=>{
        if(dataProduct.image){
            insertData()
        }else{

            message.error('it is necessary to upload an image')
        }
    }

    const handleOnchangeCategory =(e:any)=>{
        setDataProduct({...dataProduct,'category':e})
    }

    React.useEffect(()=>{
        getCategories();
    },[])// eslint-disable-line react-hooks/exhaustive-deps

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
                        <Form.Item label='Category'>
                            <Select onChange={handleOnchangeCategory} value={dataProduct.category} style={{ maxWidth:'15rem' }}>
                                {categories !== undefined && categories !== null ?categories.map((category:any,index:number)=>{
                                return <Select.Option key={index} value={category.idcategory}>{`${category.category}`}</Select.Option>
                                }):""}
                            </Select>
                        </Form.Item>
                        <Form.Item
                        label="Price"
                        name="price"
                        rules={[{ required: true,pattern:/^\d*(\.\d{0,2})?$/ , message: 'Enter a price product (Maximum two decimals)' }]}
                        >
                            <Input name="price" value={dataProduct.price} onChange={handleOnChange} style={{ maxWidth:'15rem' }} pattern='^\d*(\.\d{0,2})?$' placeholder='Enter the price'/>
                        </Form.Item>

                        <input type="file"  name='file' onChange={handleIMG} placeholder='Subir foto'/>
                        <Form.Item
                        label="Description"
                        name="longDescription"
                        rules={[{ required: true,pattern:/^[^'^"]*$/ , message: 'Invalid description' }]}
                        >
                            <TextArea  showCount autoSize={{minRows: 2, maxRows: 6 }} bordered={true} maxLength={600} name="longDescription" placeholder='Insert a long description' onChange={handleOnChange} style={{ margin:'1rem' }}/>
                        </Form.Item>
                        <Button htmlType='submit' type='primary' style={{ margin:'1rem' }}>Send</Button>
                        </Form>
                    </Card>
                </Col>
                <Col style={{textAlign:'center'}}>
                <h1>Item Preview</h1>
                <Card title={dataProduct.name}>
                   <Image src={dataProduct.image} width={230} height={300}/>
                   <br />
                   <Meta title={`Category: ${categories !== null && categories !== undefined?categories.filter((val:any)=>val.idcategory === dataProduct.category)[0].category:''} / Price:  $${dataProduct.price}`}/>
                </Card> 
             
                </Col>
                <Col>
                    <Row>
                        <Button type='primary' style={{ margin:'1rem' }} onClick={() => setIsCameraOpen(true)}>Open camera</Button>
                        <Button type='primary' style={{ margin:'1rem' }} onClick={() => {
                            setIsCameraOpen(false);
                            setCardImage(undefined);
                        }}>Close camera</Button>
                    </Row>

                    <Row> 
                        {isCameraOpen && (
                            <Camera 
                                onCapture={(blob:any) => {
                                    setCardImage(blob)
                                    handleImageTaken(blob)
                                }}
                                onClear={() => setCardImage(undefined)}
                            />
                        )}

                        {cardImage && (
                            <div>
                                <h2>Preview</h2>
                                <Preview src={cardImage && URL.createObjectURL(cardImage)}/>
                            </div>
                        )}
                    </Row>

                </Col>
            </Row>
        </React.Fragment>
    )
}