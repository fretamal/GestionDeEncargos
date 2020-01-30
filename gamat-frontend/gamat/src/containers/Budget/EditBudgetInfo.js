import React from 'react';
import {
    InputGroup, InputGroupText, InputGroupAddon, Input,
    Button, Form, FormGroup, Label,
    Modal, ModalBody, ModalFooter, ModalHeader
} from 'reactstrap';

const EditBudgetInfo = props => {
    return (
        <div style={{ display: "inline-block" }}>
            <Modal isOpen={props.open} toggle={props.toggle}>
                <ModalHeader toggle={props.toggle}>Editar Cotización</ModalHeader>
                <ModalBody>
                    <Form>
                        <div className="row">
                            <div className="col-md-12">
                                <FormGroup>
                                    <Label for="">Precio por despacho</Label>
                                    <InputGroup>
                                        <Input type="text" value={props.shippingPrice} onChange={props.onChangeForm} name="shipping_price" id=""></Input>
                                    </InputGroup>
                                </FormGroup>
                            </div>
                            <div className="col-md-12">
                                <FormGroup>
                                    <Label for="">Precio por administración</Label>
                                    <InputGroup>
                                        <Input type="text"value ={props.administrationPrice} onChange={props.onChangeForm} name="administration_price" id=""></Input>
                                    </InputGroup>
                                </FormGroup>
                            </div>
                        </div>
        
                    </Form>
                </ModalBody>
                <ModalFooter>
                    {/* <Button color="primary" onClick={props.submitHandler}>Editar</Button>{' '} */}
                    <Button color="secondary" onClick={props.toggle}>Cerrar</Button>

                </ModalFooter>
            </Modal>
        </div>
    );
};


export default EditBudgetInfo;