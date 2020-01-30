import React from 'react';
// import { Component } from 'react';
import {
    InputGroup, InputGroupText, InputGroupAddon, Input,
    Button, Form, FormGroup, Label,
    Modal, ModalBody, ModalFooter, ModalHeader
} from 'reactstrap';
// import Calendar from 'react-input-calendar'
import TextField from '@material-ui/core/TextField';

const EditRequestInfo = props => {
    return (
        <div style={{ display: "inline-block" }}>
            <Modal isOpen={props.open} toggle={props.toggle}>
                <ModalHeader toggle={props.toggle}>Editar Solicitud</ModalHeader>
                <ModalBody>
                    <Form>
                        <div className="row">
                            <div className="col-md-12">
                                <FormGroup>

                                    <Label for="">Hora de entrega</Label>
                                    <InputGroup>
                                    <TextField
                                        id="time"
                                       className="border"
                                       name="hora"
                                        type="time"
                                        onChange={props.onChangeForm}
                                        value={props.hora}
                                        InputLabelProps={{
                                            shrink: true,
                                          }}
                                          inputProps={{
                                            step: 300, // 5 min
                                          }}
                                    />
                                        {/* <Calendar format='DD/MM/YYYY' date='4-12-2014' />    */}
                                        {/* <Input type="text" name="" id=""></Input> */}
                                    </InputGroup>
                                </FormGroup>
                            </div>
                            <div className="col-md-12">
                                <FormGroup>
                                    <Label for="">Condición de pago</Label>
                                    <InputGroup>
                                        <Input type="text"  onChange={props.onChangeForm} value={props.payCondition} name="payCondition" id=""></Input>                                    
                                    </InputGroup>
                                </FormGroup>
                            </div>
                            <div className="col-md-12">
                                <FormGroup>
                                    <Label for="">Vence</Label>
                                    <InputGroup>
                            <TextField
                                name="expiration"
                                 id="date"
                                 className="border"
                                 type="date"
                                 onChange={props.onChangeForm}
                                

                               
                                         />
                                    
                                    </InputGroup>
                                </FormGroup>
                            </div>
                        </div>
        
                    </Form>
                </ModalBody>
                <ModalFooter>
                    {/* <Button color="primary" onClick={props.submitHandler}>Editar</Button>{' '} */}
                    <Button color="secondary" onClick={props.toggle}>Cancelar</Button>

                </ModalFooter>
            </Modal>
        </div>
    );
};


export default EditRequestInfo;