import * as React from "react";
import logo from "../../img/utalogo.png"
import { Row,Col } from "antd";

export const Home:React.FC=()=>{
    const [wd,setWd]= React.useState<any>(450);
    const [he,setHe]= React.useState<any>(200);

    React.useEffect(()=>{
        if(window.innerWidth < 400){
            setWd(150)
            setHe(50)
        }else{
            setWd(450)
            setHe(200)
        }
    },[])

    return(
        <React.Fragment>
            <Row style={{ justifyContent:'center' }}>
            <img  src={logo} width={wd} height={he} alt="logo"/>
            </Row>
            <Row>
                <Col>
                    Carrera: IDGS
                </Col>
                
            </Row>
            <Row gutter={25} style={{ justifyContent:'center' }}>
                <Col>
                •	Diana Carolina Velasco Montoya 180055
                </Col>
                <Col>
                •	Alan Yahir Vargas Cruz 180059
                </Col>
                <Col>
                •	David Alejandro González González 171286
                </Col>
                <Col>
                •	Christian Alexia Reyes Peralta 170476
                </Col>
                <Col>
                •	Jonathan Alberto Durón Rodríguez 160613
                </Col>
            </Row>
        </React.Fragment>
    )
}