import { useEffect, useState } from "react";
import { Button, Container, Table, Row } from "react-bootstrap";
import NavbarComponent from "../navbar/Navbar";
import Cookies from "universal-cookie";
import * as API from '../../services/send-services'

import { Link } from "react-router-dom";
import "./Envios.css";
import { BiEdit } from "react-icons/bi"
const cookies = new Cookies();

function ListEnvios() {

    const token = cookies.get("TOKEN");

    const [sends, setSends] = useState([]);
    const [dataLogin, setDataLogin] = useState({});

    const getSends = async() => {
        const configuration = {
            headers: {
                'Authorization': `${token}`,
            }
        }
        try {
            if(token){
               const response = await API.getAllSends(configuration);
               setSends(response);
               console.log(response);
               console.log(dataLogin.email);
            }else{
                window.location.href = "/login"
                cookies.remove("TOKEN");
            }
        } catch (error) {
            console.log(error);            
            if(error.response.data.message == " Error unauthorized"){
                window.location.href = "/login"
            }
        }
    }

    useEffect(() => {
        getSends();
        const dataLogin = JSON.parse(localStorage.getItem('dataLogin'));
        if(dataLogin){
            setDataLogin(dataLogin);
        }
    },[])


  return (
    <>
      <NavbarComponent />
      <Container id="main-container" className="d-grid ">
      <Row className="form-container border rounded  list-sends px-5 py-2 my-5 ">
        <Table className="sends_list">
            <thead>
                <tr className="tr-list">
                    <th>Código de envio</th>
                    <th>Fecha</th>
                    <th>Ciudad de entrega</th>
                    <th>Direccion de entrega</th>
                    <th>Persona de entrega</th>
                    <th>Estado</th>
                    <th>Editar</th>
                </tr>
            </thead>
            <tbody>
                {
                    sends./* filter((send) => send.userLogin == dataLogin.email) */map(send => 
                        <tr key={send._id}>
                            <td> {send.codeSend} </td>
                            <td> {send.dateSend} </td>
                            <td> {send.cityUserDelivery} </td>
                            <td> {send.addressUserDelivery} </td>
                            <td> {send.nameUserDelivery} </td>
                            <td> {send.status} </td>
                            <td> <Link to={`/EditSend/${send._id}`} className="btn btn-secondary" > <BiEdit/> </Link> </td>
                        </tr>)
                }
            </tbody>
        </Table>
        </Row>
      </Container>
    </>
  )
}

export default ListEnvios;
