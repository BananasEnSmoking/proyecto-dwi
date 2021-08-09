import * as React from 'react';
import { urlApi } from "../../API";
import {Link} from "react-router-dom"
import { Row,Col,Card, message,Image,Rate,Input, Button,Form } from "antd";

const { Meta } = Card;
const { Search } = Input;

export const AllProducts:React.FC =()=>{
    const [products,setProducts]=React.useState<any>();
    const [showProducts,setShowProducts]=React.useState<any>();
    const [search,setSearch]=React.useState<any>();

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
      
    const handleSearch =(e:any)=>{
      setSearch(e.currentTarget.value.replace(/['"]/g,''))
      handleOnEnterSearch(e.currentTarget.value.replace(/['"]/g,''))
      console.log(search)
      
    }

    const handleOnEnterSearch =(e:any)=>{
      setShowProducts(products.filter(
        (produ:any)=>(produ.rating == parseInt(e) || produ.productName.toLowerCase().includes(e.toLowerCase()) || produ.sellerName.toLowerCase().includes(e.toLowerCase()) || produ.sellerLastName.toLowerCase().includes(e.toLowerCase())))
        )
    }

      React.useEffect(()=>{
        getProducts()
        
      },[])

      React.useEffect(()=>{
        if(products){
          setShowProducts(products)
        }
      },[products])

    return(
       <React.Fragment>
         <Row style={{ margin:'2rem' }}>
           <Col span={8}>
           </Col>
           <Col span={8} >
         <Search placeholder={'Enter your Search'} onChange={handleSearch} />
           </Col>
         </Row>
           <Row gutter={[16,16]} style={{ marginTop:'3rem'}}>
               {showProducts !== undefined && showProducts !== null?
               showProducts.map((prod:any,index:any)=> {return <Col key={index}>
               <Card  title={prod.productName}>
                   <Image src={prod.img} width={270} height={320}/>
                   <br />
                   <Rate allowHalf defaultValue={prod.rating} disabled />
                   <br />
                   <Meta title={`Seller: ${prod.sellerName} ${prod.sellerLastName}`} />
                   <br />
                   <Meta title={`Category: ${prod.category}`}/>
                   <br />
                   <Meta title={`Price:  $${prod.price}`}/>
                   <Link to={`/Product/${prod.idproducts}`}>
                   <Button style={{ margin:'.5rem' }}>View Product</Button>
                   </Link>
               </Card>
               </Col>})
               :''} 
           </Row>
       </React.Fragment>
    )
}