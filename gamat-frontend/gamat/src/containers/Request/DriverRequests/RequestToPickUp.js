import React, { Component } from 'react'
import ItemToPick from './ItemToPickUp'
import { Link,Redirect } from 'react-router-dom';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
// import Spinner from '../../../components/UI/Spinner';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';
import Spinner from '../../../components/UI/Spinner';

class RequestToPickUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
          modal: false,
          open: false,
          itemStates:[],
          indice:0
        };
    
        this.toggle = this.toggle.bind(this);
        this.handlerOnChangeState=this.handlerOnChangeState.bind(this);
        this.handlerOnSendItems=this.handlerOnSendItems.bind(this);
        // this.handleOnDelete = this.handleOnDelete.bind(this);
        // this.handleOnOpenEdit = this.handleOnOpenEdit.bind(this) ;
        // this.handleOnEditItem= this.handleOnEditItem.bind(this);
    
    }

    componentDidMount(){
      if(this.props.match.params.update === "notf"){
        // console.log("vengo de notificacion");
        this.props.onFetchRequests(this.props.userId, this.props.userType, 0);
    }
      let indiceRequest =  this.props.requests.findIndex(
        (req)=>req.idRequest == this.props.match.params.idRequest);
        const itemStates= this.props.requests[indiceRequest].items.map(()=>false)
        this.setState({
          indice:indiceRequest,
          itemStates:itemStates
        })

        // console.log( this.props.requests[indiceRequest])
    }
    handlerOnChangeState(i){
      let newItemState=[...this.state.itemStates]
      newItemState[i]=!this.state.itemStates[i]
      this.setState({
        itemStates:newItemState
      })
    }

    handlerOnSendItems(){

     ;
      const states= this.state.itemStates;
      let newStateRequest= this.props.requests[this.state.indice]
      newStateRequest.items.map((item,i)=>{
          
         
          // esto se modificara despues, cuando se hagan cambios en la bd
        if(states[i]) item.state="Retirado"
      })

      this.props.onUpdateItems(newStateRequest,0,this.props.userId);

    }
    
    toggle() {
    this.setState({
        modal: !this.state.modal
    });
    }
    

    render() {

        const itemsRow = 
        this.props.requests[this.state.indice].items.map((item,i)=>(

          <tr key={i}>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                {this.state.itemStates[i] ?
                <td>Retirado</td>:
                <td>No Retirado</td>
                }
          </tr>
          
          ))
    
        return (
      <div>
         {this.props.updateItemSuccess && <Redirect to='/requests' />}
          <h4>Solicitud a Entregar: </h4>
          <p><strong>Jefe de Obra:</strong> Juanito Perez</p>
          <p><strong>Dirección de obra:</strong> {this.props.requests[this.state.indice].building.address}</p>

          <h4>Items a Retirar:</h4>
          <div className="row">
            { this.props.requests[this.state.indice].items.map((item,i)=>(
              <ItemToPick 
                key={i}
                picked={this.state.itemStates[i]} 
                quantity={item.quantity}
                name={item.name} 
                description={item.description}
                distributor={item.distributor}
                onChangeState={(e)=>this.handlerOnChangeState(i)}         
                />
            ))
          }
          </div>

            <Link to='/'><button className="btn btn-secondary">Volver</button></Link>{' '}
            <button className="btn btn-success" disabled={false} onClick={this.toggle} >Enviar Reporte</button>

            <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
              <ModalHeader toggle={this.toggle}>Enviar Reporte</ModalHeader>
              <ModalBody>
                {this.props.loading ? <Spinner/> : 
                  <div>
                    Los siguientes items fueron retirados:
                    <table className="table table-sm">
                      <thead>
                        <tr>
                        <th>Nombre</th>
                        <th>Cantidad</th>
                        <th>Estado</th>
                        </tr>
                      </thead>
                      <tbody>
                        {itemsRow}
                      
                      </tbody>
                    </table>
                  
                
                </div>
                }
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onClick={this.handlerOnSendItems} disabled={false}>Enviar</Button>{' '}
                <Button color="secondary" onClick={this.toggle}>Cancelar</Button>
              </ModalFooter>
            </Modal>

          </div>
    )
  }
}


const mapStateToProps = state => {
  return {
      requests: state.request.requests,
      updateItemSuccess: state.request.updateItemSuccess
      ,userId: state.login.userId,
     
    userType: state.login.userType,
      
  };
};

const mapDispatchToProps = dispatch => {
  return {
      onUpdateItems: (request,type,userId) => dispatch(actions.updateItems(request,type,userId)),
      onFetchRequests: (userId, userType, state) => dispatch(actions.fetchRequests(userId, userType, state)),
      

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RequestToPickUp);