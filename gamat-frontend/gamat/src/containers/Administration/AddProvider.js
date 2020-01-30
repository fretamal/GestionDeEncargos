import React from 'react';
import {Modal,ModalBody,ModalHeader,ModalFooter,
    Form,FormGroup,Label,
    Input,Button} from 'reactstrap'

const AddProvider = (props) => {
    return (
        <div>
            
        <Modal isOpen={props.open} toggle={props.toggle} >
          <ModalHeader 
            toggle={props.toggle}> 
           Agregar Proveedor 
          </ModalHeader>
          <ModalBody>

              <Form>
                <FormGroup>
                <Label for="name">Nombre</Label>
                <Input value={props.name} type="text" name="name" id="name" onChange={props.onChangeForm}/>
                </FormGroup>

                <FormGroup>
                <Label for="address">Dirección</Label>
                <Input value={props.address} type="Email" name="address" id="address" onChange={props.onChangeForm}/>
                </FormGroup>

                <FormGroup>
                <Label for="observation">Observación</Label>
                <Input value={props.observation} type="text" name="observation" id="observation" onChange={props.onChangeForm}/>
                </FormGroup>

                <FormGroup>
                <Label for="schedule">Horario</Label>
                <Input value={props.schedule} type="text" name="schedule" id="schedule" onChange={props.onChangeForm}/>
                </FormGroup>

            </Form>

          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={props.onAddProvider}>
           Agregar</Button>{' '}
            <Button color="secondary" onClick={props.toggle}>Volver</Button>
          </ModalFooter>
        </Modal>
      </div>
        
    );
};

export default AddProvider;