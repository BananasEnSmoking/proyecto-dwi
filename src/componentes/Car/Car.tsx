import * as React from 'react';
import { urlApi } from "../../API";
import {useParams,useHistory} from "react-router-dom"
import { Row,Col,Card, message,Image,Rate,Input, Button,Form,Spin,Modal,Table } from "antd";

const { Meta } = Card;

export const Car:React.FC =()=>{
    const [token,setToken]=React.useState<any>(sessionStorage.token)
    const [productsCar,setProductsCar]=React.useState<any>()

    async function getCar() {
        try {
              const response = await fetch(`${urlApi}/getCar`,{ method:'Get', mode:'cors', headers:{ 
                'Accept': 'application/json',
                'x-access-token': token
              }});
              const res = await response.json();
              console.log(res)
              if( res.msg === 'success'){
                  setProductsCar(res.car)      
              }else{
                  message.error('Fail to Load!')
              }
        } catch (error) {
              console.log(error)
          }
      }

      const columnsMovis = [
        {
            title: 'Partida',
            dataIndex: 'key',
            width: 'auto',
        },{
            title: 'Product',
            dataIndex: 'productName',
            width: 'auto',
        }
      ];

      React.useEffect(()=>{
          getCar()
      },[])

    return(
        <React.Fragment>

        </React.Fragment>
    )
}