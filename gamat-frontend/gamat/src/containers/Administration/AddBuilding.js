import React from 'react';
import {Modal,ModalBody,ModalHeader,ModalFooter,
    Form,FormGroup,Label,
    Input,Button} from 'reactstrap'

const AddBuilding = (props) => {
    return (
        <div>
            
        <Modal isOpen={props.open} toggle={props.toggle} >
          <ModalHeader 
            toggle={props.toggle}> 
           Agregar Obra 
          </ModalHeader>
          <ModalBody>

            <Form>
                <FormGroup>
                <Label for="name">Nombre</Label>
                <Input value={props.name} type="text" name="nameBuilding" id="name" onChange={props.onChangeForm}/>
                </FormGroup>

                <FormGroup>
                <Label for="name">Dirección</Label>
                <Input value={props.address} type="text" name="addressBuilding" id="name" onChange={props.onChangeForm}/>
                </FormGroup>

            </Form>

          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={props.onAddBuilding}>
           Agregar</Button>{' '}
            <Button color="secondary" onClick={props.toggle}>Volver</Button>
          </ModalFooter>
        </Modal>
      </div>
        
    );
};

export default AddBuilding;