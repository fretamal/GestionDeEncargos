import React from 'react';

import {Modal,ModalBody,ModalHeader,ModalFooter,
    Form,FormGroup,Label,
    Input,Button,Table,CustomInput} from 'reactstrap'
import Spinner from '../../components/UI/Spinner';

const ListBuildingApprover = (props) => {
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
            <th>Asiganda</th>
            <th>Direccion</th>
            
          </tr>
        </thead>
        <tbody>
            {props.buildings.map((building,i)=>(
                
            <tr key={i}>
             <th>
              {building.idBuilding}
             </th>
             <td>

              <CustomInput type="checkbox"  onChange={(e)=>props.onChangeCheck(e,i)} checked={props.checks[i]} id={i} />
             </td>
             <td>
               {building.address}
               </td> 
          
            </tr>
         
                
        
            ))}
         
        </tbody>
      </Table>
        } 
         

          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={props.onSaveBuildings}>
          Guardar</Button>{' '}
            <Button color="secondary" onClick={props.toggle}>Volver</Button>
          </ModalFooter>
        </Modal>
        </div>
    );
};

export default ListBuildingApprover;