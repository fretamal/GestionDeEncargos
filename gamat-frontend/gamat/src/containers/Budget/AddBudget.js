import React, { Component } from 'react';
import {InputGroup, InputGroupText, InputGroupAddon, Input, Table, Button, 
    Card, CardText, CardHeader, CardTitle, CustomInput, Label} from 'reactstrap';
//import Moment from 'moment';

class AddBudget extends Component {

    /*componentDidMount(){
        //Carga los elementos de una request
        this.props.onFetchBudgets();
        //Crear <Form> para cada Item!
    }
    */
   /*handle de los radios
   radioHandler()  
   */


    render() {
        return (
            <div className="row">
            <div className="col-9">
                <Table size="sm" >
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Username</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <th scope="row">1</th>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                    </tr>
                    </tbody>     
                </Table>
                <br/><br/>
                <Card>
                    <CardHeader>
                        Item N#
                    </CardHeader>
                    <CardText>
                    <div class="container">
                    <div class="row">
                        <div class="col-sm-4">Nombre: {}</div>
                        <div class="col-sm-4">Cantidad: {}</div>
                        <div class="col-sm-4">Urgencia: {} </div>
                    </div>
                    <br />
                    <div>
                        <p>Descripción:</p>
                    </div>
                    </div>

                    </CardText>
                    
                </Card>
                <br /><br />
                <Card body style={{ backgroundColor: '#D3D3D3', borderColor: '#333' }}> 
                    <CardText>
                    <div class="row">
                      
                        <div class="col-md-12">
                            <div class="row">
                                <div class="col-md-6">
                                <InputGroup size="sm">
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText>Valor Unitario</InputGroupText>
                                </InputGroupAddon>
                                    <Input></Input>
                                </InputGroup>
                                </div>
                                <div class="col-md-6">
                                <InputGroup size="sm">
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText>Valor Total</InputGroupText>
                                </InputGroupAddon>
                                    <Input disabled></Input>
                                </InputGroup>
                                </div>
                            </div>
                            <br />
                            <div class="row">
                                <div class="col-md-6">
                                <InputGroup size="sm">
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText>Peso Unitario</InputGroupText>
                                </InputGroupAddon>
                                    <Input></Input>
                                </InputGroup>
                                </div>
                                <div class="col-md-6">
                                <InputGroup size="sm">
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText>Peso Total</InputGroupText>
                                </InputGroupAddon>
                                    <Input disabled></Input>
                                </InputGroup>
                                </div>
                            </div>

                            <br />
                            <div class="row">
                                <div class="col-md-8">
                                <InputGroup size="sm">
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText>Proovedor</InputGroupText>
                                </InputGroupAddon>
                                    <Input></Input>
                                </InputGroup>
                                </div>
                                <div class="col-md-4">

                                </div>
                            </div>

                            <br />
                            <div class="row">
                            <div class="col-md-1">
                                    <Label >Estado:</Label>
                                </div>
                                <div class="col-md-5">
                                 <div>
                                    <CustomInput type="radio" id="state1" name="state" label="Cotizado" value="1" />
                                    <CustomInput type="radio" id="state2" name="state" label="Cotizado con observaciones" value="2"/>
                                    <CustomInput type="radio" id="state3" name="state" label="Pendiente de entrega" value ="3"/>
                                    <CustomInput type="radio" id="state4" name="state" label="Pendiente de cotizacion" value ="4"/>
                                 </div>
                                </div>
                                <div class="col-md-6">
                                </div>
                                
                            </div>
                            <br />
                            <div class="row">
                                <div class="col-md-8">
                                <InputGroup size="sm">
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText>Comentarios: </InputGroupText>
                                </InputGroupAddon>
                                    <Input></Input>
                                </InputGroup>
                                </div>
                                <div class="col-md-4">
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    </CardText>
                </Card>
                <br />
                <div>
                <Button className="endbuttons">Volver</Button> {' '}
                <Button className="endbuttons" color="success">Guardar Cotización</Button>{' '}
                    
                    
                </div>
            </div>  
             <div className="col-3">
                <Card body inverse style={{ backgroundColor: '#808080', borderColor: '#333' }}>
                    <CardTitle>
                        <b>Solicitud</b>
                    </CardTitle>
                    <CardText>
                    <ul className="lista">
                        <li>Numero: </li>
                        <li>Fecha: </li>
                        <li>Lugar de Entrega: </li>
                        <li>Condicion de Pago: </li>
                        <li>Vence: </li>
                        <li>Solicita:</li>
                    </ul>  
                    </CardText>
                </Card>
                <br/>
                <Card body inverse style={{ backgroundColor: '#808080', borderColor: '#333' }}> 
                    <CardTitle>
                        <b>Resumen de la Cotizacion</b>
                    </CardTitle>
                    <CardText>
                    <li className="lista">Numero: </li>
                        <li>Peso Total: </li>
                        <li>Despacho: </li>
                        <li>Administración: </li>
                        <li>Valor Neto: </li>
                        <li><b>IVA:</b></li>
                        <li><b>VALOR TOTAL:</b></li>
                    </CardText>
                </Card> 
            </div>
        </div>
        );
      }
}

export default AddBudget;

