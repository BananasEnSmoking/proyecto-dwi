import * as React from 'react';
import { urlApi } from "../../API";
import { Row,Col,Card, message,Image,Rate } from "antd";

const { Meta } = Card;

export const AllProducts:React.FC =()=>{
    const [products,setProducts]=React.useState<any>();

    async function getProducts() {
          try {
            const response = await fetch(`${urlApi}/products`,{ method:'Get', mode:'cors', headers:{ 
              'Accept': 'application/json',
              'x-access-token': `${sessionStorage.token}`
            }});
            const res = await response.json();
            console.log(res)
            if( res.msg === 'success'){
                setProducts(res.products)      
            }else{
                message.error('Fail to Load!')
            }
          } catch (error) {
            console.log(error)
          }
        }
      

      React.useEffect(()=>{
        getProducts()
      },[])

    return(
       <React.Fragment>
           <Row gutter={[16,16]} style={{ marginTop:'3rem'}}>
               {products !== undefined && products !== null?
               products.map((prod:any,index:any)=> {return <Col>
               <Card key={index} title={prod.productName}>
                   <Image src='https://picsum.photos/200/300'/>
                   <br />
                   <Rate allowHalf defaultValue={prod.rating} disabled />
                   <Meta title={`Precio:  $${prod.price}`}/>
               </Card>
               </Col>})
               :''} 
           </Row>
       </React.Fragment>
    )
}