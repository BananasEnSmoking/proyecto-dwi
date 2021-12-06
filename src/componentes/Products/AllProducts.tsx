import * as React from 'react';
import { urlApi } from "../../API";
import {Link} from "react-router-dom"
import { Row,Col,Card, message,Image,Rate,Input, Button,Form,Select,Radio } from "antd";

const { Meta } = Card;
const { Search } = Input;

export const AllProducts:React.FC =()=>{
    const [products,setProducts]=React.useState<any>();
    const [searchValue,setSearchValue]= React.useState<any>('1');
    const [categories,setCategories]=React.useState<any>();
    const [showProducts,setShowProducts]=React.useState<any>();
    const [search,setSearch]=React.useState<any>();
    const [category,setCategory]=React.useState<any>(1);

    async function getProducts() {
      try {
            const response = await fetch(`${urlApi}/products`,{ method:'GET', mode:'cors', headers:{ 
              'Accept': 'application/json',
              'x-access-token': `${sessionStorage.token}`
            }});
            const res = await response.json();
            if( res.msg === 'success'){
                setProducts(res.products)      
            }else{
                message.error('Fail to Load!')
            }
      } catch (error) {
            console.log(error)
        }
    }

    async function getCategories() {
      try {
        const getInfo = await fetch(`${urlApi}/getCategories`,{ method:'GET', mode:'cors', headers:{ 
          'Accept': 'application/json',
          'x-access-token': `${sessionStorage.token}`
        }});
        const res = await getInfo.json();
        if(getInfo.status === 200){
          setCategories(res)      
        }
      } catch (error) {
        console.log(error)
      }
    }

    async function getBycategory() {
      try {
        const body = JSON.stringify({'idcategory':category});
        const getInfo = await fetch(`${urlApi}/getProductsByCategory`,{ method:'POST', mode:'cors', headers:{ 
          'Accept': 'application/json',
          "Content-Type": "application/json",
          'x-access-token': `${sessionStorage.token}`
        },body:body});
        const res = await getInfo.json();
        if(getInfo.status === 200){
          setProducts(res.products)      
        }
      } catch (error) {
        console.log(error)
      }
    }
      
    const handleSearch =(e:any)=>{
      setSearch(e.currentTarget.value.replace(/['"]/g,''))
      handleOnEnterSearch(e.currentTarget.value.replace(/['"]/g,''))
    }

    const handleOnEnterSearch =(e:any)=>{
      setShowProducts(products.filter(
        (produ:any)=>(parseFloat(produ.rating) === parseFloat(e) || produ.productName.toLowerCase().includes(e.toLowerCase()) || produ.sellerName.toLowerCase().includes(e.toLowerCase()) || produ.sellerLastName.toLowerCase().includes(e.toLowerCase())))
        )
    }

      React.useEffect(()=>{
        if(searchValue == 1){
          getProducts()
        }else{
          getBycategory()
        }    
      },[searchValue])// eslint-disable-line react-hooks/exhaustive-deps

      React.useEffect(()=>{
        if(searchValue == 1){
          getProducts()
        }else{
          getBycategory()
        }    
      },[category])// eslint-disable-line react-hooks/exhaustive-deps

      React.useEffect(()=>{
        if(products){
          setShowProducts(products)
        }
      },[products])// eslint-disable-line react-hooks/exhaustive-deps

      React.useEffect(()=>{
        getCategories();
    },[])// eslint-disable-line react-hooks/exhaustive-deps

      const handleOnchangeCategory =(e:any)=>{
        setCategory(e)
       
    }

    const handleRadioButton =(e:any)=>{
      setSearchValue(e.target.value)
  }

    return(
       <React.Fragment>
         <Row style={{ margin:'2rem' }}>
           <Col span={8}>
           <Form.Item label='Category'>
              <Select onChange={handleOnchangeCategory} value={category} style={{ maxWidth:'15rem' }}>
                  {categories !== undefined && categories !== null ?categories.map((category:any,index:number)=>{
                    return <Select.Option key={index} value={category.idcategory}>{`${category.category}`}</Select.Option>
                  }):""}
              </Select>
              <Radio.Group defaultValue={searchValue} onChange={handleRadioButton} buttonStyle="solid" style={{ padding: '1rem' }}>
                    <Radio.Button value="1">All</Radio.Button>
                    <Radio.Button value="0">By category</Radio.Button>
               
                </Radio.Group>
            </Form.Item>
           </Col>
           <Col span={8} >
         <Search placeholder={'Enter your search'} onChange={handleSearch} />
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