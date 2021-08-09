import * as React from 'react';
import { urlApi } from "../../API";
import {useParams,useHistory} from "react-router-dom"
import { Row,Col,Card, message,Image,Rate,Input, Button,Form,Spin,Modal } from "antd";

const { Meta } = Card;


export const ProductDetails:React.FC=()=>{
    const params:any = useParams();
    const search ={
        'idproduct':params.idproduct
    }
    const [infoProduct,setInfoProduct]=React.useState<any>();
    const [addCar,setAddCar]=React.useState<any>({
        'idproduct':params.idproduct,
        'cantidad':1, 
    });
    const [confirm,setConfirm]=React.useState<boolean>(false);
    const [token,setToken]=React.useState<any>(sessionStorage.token)


    const formatter = new Intl.NumberFormat('en-US',{
        style: 'currency',
        currency: 'MXN',
        minimumFractionDigits:2
      })

    async function getProduct() {
        try {
            const body = JSON.stringify(search);
            const response = await fetch(`${urlApi}/getOneProduct`,{ method:'post', mode:'cors', headers:{ 
            'Accept': 'application/json',
            "Content-Type": "application/json",
          },body:body});
          const res = await response.json();
          if(res.msg === 'success'){
              setInfoProduct(res.product[0])
              console.log(res.product[0])
          }
          
        } catch (error) {
          console.log(error)
        }
    }

    async function insertData() {
        try {
            const body = JSON.stringify(addCar);
            const response = await fetch(`${urlApi}/insertCar`,{ method:'post', mode:'cors', headers:{ 
            'Accept': 'application/json',
            "Content-Type": "application/json",
            'x-access-token': token
          },body:body});
          const res = await response.json();
          if(res.msg === 'success'){
              message.success('item added')
              setConfirm(false)
          }else{
              message.error('An error has ocurred')
              setConfirm(false)
          }
        } catch (error) {
          console.log(error)
        }
    }
      
      React.useEffect(()=>{
          if(params){
              getProduct()
          }
      },[])

      const handleOnChange =(e:any)=>{
          setAddCar({...addCar,'cantidad':e.target.value})
      }

      React.useEffect(()=>{
        console.log(addCar)
    },[addCar])

    const handleAddToCar =()=>{
        setConfirm(true)
    }

    const handleOkConfirm =()=>{
        insertData()
    }

    const handleCancelConfirm =()=>{
        setConfirm(false)
    }


return(
    <React.Fragment>
       <Modal
       title="Confirm"
       visible={confirm}
       onOk={handleOkConfirm}
        onCancel={handleCancelConfirm}
       >

       </Modal>
        {infoProduct !== null && infoProduct !== undefined?
        <Row style={{ marginTop:'1rem' }}>
            <Col span={15} style={{ marginRight:'5rem' }}>
                <Card title='Product Information'>
                    <Row>
                        <Col span={7}>
                        <Image src={`${infoProduct.img}`} width={200} height={270}/>
                        </Col>
                        <Col span={17}>
                        <h1>
                        {infoProduct.productName}   <br /> 
                        <Rate allowHalf defaultValue={infoProduct.rating} disabled />
                        </h1>
                        <br />
                        <h3>Description</h3>
                        <br />
                        <h4>
                        {infoProduct.longDescription}
                        </h4>
                        <br />
                        <Meta title={`Seller: ${infoProduct.sellerName} ${infoProduct.sellerLastName}`} />
                        <br />
                        <Meta title={`Category: ${infoProduct.category}`}/>
                        <br />
                        <Meta title={`Price:  $${infoProduct.price}`}/>
                        </Col>
                    </Row>
                </Card>
            </Col>
            {sessionStorage.token?
            <Col span={6}>
                <Card title='Add to Car'>
                    <Form.Item label='Amount :' style={{ width:'6rem' }}>
                        <Input type='number' name='cantidad' min={1} defaultValue={addCar.cantidad} onChange={handleOnChange} />
                    </Form.Item>
                    <br />
                    {`Price: ${infoProduct.price}`}
                    <br />
                    {`Total: ${formatter.format(parseFloat(infoProduct.price) * parseInt(addCar.cantidad))}`}
                    <br />
                    <Button type='primary' onClick={handleAddToCar} style={{ margin:'1rem' }}>Add to Car</Button>
                </Card>
            </Col>
            :
            ''
            }
        </Row>
        :
        <Spin/>
        
        }
    </React.Fragment>
)
}