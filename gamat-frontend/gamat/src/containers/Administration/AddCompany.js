import React from 'react';
import {Modal,ModalBody,ModalHeader,ModalFooter,
    Form,FormGroup,Label,
    Input,Button} from 'reactstrap'

const AddCompany = (props) => {
    return (
        <div>
            
        <Modal isOpen={props.open} toggle={props.toggle} >
          <ModalHeader 
            toggle={props.toggle}> 
           Agregar Empresa 
          </ModalHeader>
          <ModalBody>

              <Form>
                <FormGroup>
                <Label for="name">Nombre</Label>
                <Input value={props.name} type="text" name="nameCompany" id="name" onChange={props.onChangeForm}/>
                </FormGroup>

            </Form>

          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={props.onAddCompany}>
           Agregar</Button>{' '}
            <Button color="secondary" onClick={props.toggle}>Volver</Button>
          </ModalFooter>
        </Modal>
      </div>
        
    );
};

export default AddCompany;