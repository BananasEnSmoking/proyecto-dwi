import * as React from 'react';
import { urlApi } from "../../API";
import { message,Input, Button,Table, Popconfirm } from "antd";
import { PayPalButton } from "react-paypal-button-v2";



export const Car:React.FC =()=>{
    const token = sessionStorage.token
    const [productsCar,setProductsCar]=React.useState<any>();
    const [tAmount,setTAmount]=React.useState<any>();
    const formatter = new Intl.NumberFormat('en-US',{
        style: 'currency',
        currency: 'MXN',
        minimumFractionDigits:2
    });

    return(
        <React.Fragment>
            <h1>Final Amount: {formatter.format(tAmount)}</h1>
            <Table columns={columnsCar} dataSource={productsCar} style={{ margin:'1rem' }} pagination={false} bordered/>
            {productsCar !== null && productsCar !== undefined && tAmount > .01?
            <PayPalButton
            amount={tAmount.toFixed(2)}
            // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
            
            />
            :
            ''
            }
        </React.Fragment>
    )
}