import React from 'react';

import {Modal,ModalBody,ModalHeader,ModalFooter,
    Form,FormGroup,Label,
    Input,Button,Table} from 'reactstrap'
import Spinner from '../../components/UI/Spinner';

const ListBuilding = (props) => {
    return (
        <div>
        <Modal isOpen={props.open} toggle={props.toggle} >
          <ModalHeader 
            toggle={props.toggle}> 
           Lista de Obras
          </ModalHeader>
          <ModalBody>
             {props.loading ?
             <Spinner/>
             :
          <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Nombre</th>
            <th>Direccion</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
            {props.buildings.map((building,i)=>(
                
                
                
                <tr key={i}>
            <th scope="row">{building.idBuilding}</th>
            <td>{building.name}</td>
            <td>{building.address}</td>
            <td>
            <button className="btn btn-sm btn-info">Editar</button>{' '}
              <button onClick={(e)=>props.onDelete(building.idBuilding)} className="btn btn-sm btn-danger">Borrar</button>{' '}    
            </td>
          </tr>
            ))}
         
        </tbody>
      </Table>
        } 
         

          </ModalBody>
          <ModalFooter>
            {/* <Button color="primary" onClick={props.onAddUser}>
           Agregar</Button>{' '} */}
            <Button color="secondary" onClick={props.toggle}>Volver</Button>
          </ModalFooter>
        </Modal>
        </div>
    );
};

export default ListBuilding;