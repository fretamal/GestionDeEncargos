import React from 'react';
import {
    InputGroup, InputGroupText, InputGroupAddon, Input,
    Button, Form, FormGroup, Label,
    Modal, ModalBody, ModalFooter, ModalHeader
} from 'reactstrap';

const AddItemtoBudget = props => {
    return (
        <div style={{ display: "inline-block" }}>
            {/* <Button size="sm" color="danger" style={{ display: "inline-block" }} onClick={this.toggle}>+</Button> */}

            <Modal isOpen={props.open} toggle={props.toggle}>
                <ModalHeader toggle={props.toggle}>Cotizar Item</ModalHeader>
                <ModalBody>
                    <Form>
                        <div className="row">
                            <div className="col-md-6">
                                <FormGroup>

                                    <Label for="price">Precio Unitario</Label>
                                    <InputGroup>
                                        <InputGroupAddon addonType="append">$</InputGroupAddon>
                                        <Input type="number" min="0" value={props.price} name="price" total="totalprice" id="price" onChange={props.inputHandler}></Input>
                                    </InputGroup>
                                </FormGroup>
                            </div>
                            <div className="col-md-6">
                                <FormGroup>
                                    <Label for="totalprice">Precio Total</Label>
                                    <InputGroup>
                                        <InputGroupAddon addonType="append">$</InputGroupAddon>
                                        <Input disabled name="totalprice" id="totalprice" value={props.price*props.quantity}  ></Input>
                                    </InputGroup>
                                </FormGroup>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <FormGroup>
                                    <Label for="weight">Peso Unitario</Label>
                                    <InputGroup>
                                        <Input type="number" value={props.weight} min="0" name="weight" id="weight" onChange={props.inputHandler}></Input>
                                        <Input type="select" value={props.measure} name="measure" onChange={props.inputHandler}>
                                            <option value="g">g</option>
                                            <option value="m">m</option>
                                            <option value="m2">m²</option>
                                            <option value="m3">m³</option>
                                            <option value="lt">lt</option>
                                            
                                        </Input>   
                                    </InputGroup>
                                </FormGroup>
                            </div>
                            <div className="col-md-6">
                                <FormGroup>
                                    <Label for="totalweight">Peso Total</Label>
                                    <InputGroup>
                                        <Input disabled min='0' value={props.weight*props.quantity} name="totalweight" id="totalweight"  ></Input>
                                        <InputGroupAddon addonType="append">{props.measure}</InputGroupAddon>
                                    </InputGroup>
                                </FormGroup>
                            </div>
                        </div>


                        <br />
                        <div className="row">
                            <div className="col-md-12">
                                <InputGroup size="md">
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>Proveedor</InputGroupText>
                                    </InputGroupAddon>
                                    <Input name="provider" id="provider" value={props.provider} onChange={props.inputHandler}></Input>
                                </InputGroup>
                            </div>

                        </div>
                        <br />
                        <div className="row">
                            <div className="col-md-12">
                                <FormGroup>
                                    <Label for="estado">Estado</Label>
                                    <Input  value={props.estado} onChange={props.inputHandler} type="select" name="estado" id="estado" >
                                        {props.estados.map((estado,i)=>(

                                            <option key={i} value={i}>{estado.name}</option>

                                        ))}
                                        {/* <option value="Cotizado con Comentarios">Cotizado con comentarios</option>
                                        <option value="Pendiente de entrega">Pendiente de entrega</option>
                                       */}
                                    </Input>
                                </FormGroup>

                            </div>

                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <InputGroup size="">
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>Comentarios</InputGroupText>
                                    </InputGroupAddon>
                                    <Input type="textarea" name="comments" id="comments" onChange={props.inputHandler}></Input>
                                </InputGroup>
                            </div>
                        </div>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={props.submitHandler}>Agregar</Button>{' '}
                    <Button color="secondary" onClick={props.toggle}>Volver</Button>

                </ModalFooter>
            </Modal>
        </div>
    );
};


export default AddItemtoBudget;