import * as React from 'react';
import { urlApi } from "../../API";
import {useParams,useHistory} from "react-router-dom"
import { Row,Col,Card, message,Image,Rate,Input, Button,Form,Spin,Modal,Table } from "antd";
import { PayPalButton } from "react-paypal-button-v2";


const { Meta } = Card;

export const Car:React.FC =()=>{
    const [token,setToken]=React.useState<any>(sessionStorage.token);
    const [productsCar,setProductsCar]=React.useState<any>();
    const [tAmount,setTAmount]=React.useState<any>();
    const [detailsP,setDetailsP]= React.useState<any>(null)
    const formatter = new Intl.NumberFormat('en-US',{
        style: 'currency',
        currency: 'MXN',
        minimumFractionDigits:2
    });

    async function getCar() {
        try {
              const response = await fetch(`${urlApi}/getCar`,{ method:'Get', mode:'cors', headers:{ 
                'Accept': 'application/json',
                'x-access-token': token
              }});
              const res = await response.json();
              console.log(res)
              if( res.msg === 'success'){
                  setProductsCar(addKeyCar(res.car))   
              }else{
                  message.error('Fail to Load!')
              }
        } catch (error) {
              console.log(error)
          }
      }


      async function cleanCar() {
        try {
              const response = await fetch(`${urlApi}/clearCar`,{ method:'Get', mode:'cors', headers:{ 
                'Accept': 'application/json',
                'x-access-token': token
              }});
              const res = await response.json();
              if( res.msg === 'success'){
                  message.info('Car empty!')
                  getCar()
              }else{
                  message.error('Fail to Load!')
              }
        } catch (error) {
              console.log(error)
          }
      }

    //Agregar "Key" a cada movimiento para evitar warning react
    const addKeyCar=(prods:any)=>{
    const arr:any =[]
    let total=0;
    prods.map((prod:any,index:number)=>{
        arr.push({
            "key":index + 1,
            "name":prod.name,
            "price":prod.price,
            "cantidad":prod.cantidad,
            "total": formatter.format(parseFloat(prod.price) * parseFloat(prod.cantidad))
        })
        total= total + parseFloat(prod.price) * parseFloat(prod.cantidad)
    })
    setTAmount(total)
    return arr
    }

      const columnsCar = [
        {
            title: 'Article',
            dataIndex: 'key',
            width: 'auto',
        },
        {
            title: 'Product',
            dataIndex: 'name',
            width: 'auto',
        },
        {
            title: 'Unit Price',
            dataIndex: 'price',
            width: 'auto',
        },
        {
            title: 'Quantity',
            dataIndex: 'cantidad',
            width: 'auto',
        },
        {
            title: 'Total',
            dataIndex: 'total',
            width: 'auto'
        }
      ];

      React.useEffect(()=>{
          getCar()
      },[])

    return(
        <React.Fragment>
            <h1>Final Amount: {formatter.format(tAmount)}</h1>
            <Table columns={columnsCar} dataSource={productsCar} style={{ margin:'1rem' }} pagination={false} bordered/>
            {productsCar !== null && productsCar !== undefined?
            <PayPalButton
            amount={tAmount.toFixed(2)}
            // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
            
            onSuccess={(details:any, data:any) => {
              setDetailsP(details)
              cleanCar()
              // OPTIONAL: Call your server to save the transaction
              return fetch("/paypal-transaction-complete", {
                method: "post",
                body: JSON.stringify({
                  orderID: data.orderID
                })
              });
            }}
            
            />
            :
            ''
            }
        </React.Fragment>
    )
}