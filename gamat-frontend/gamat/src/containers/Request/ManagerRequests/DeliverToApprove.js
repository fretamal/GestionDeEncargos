import React, { Component } from 'react'
import ItemToApproveDeliver from './ItemToApproveDeliver'
import { Link,Redirect } from 'react-router-dom';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import Spinner from '../../../components/UI/Spinner';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';
import LectorQr from '../../Qr/LectorQr';


class DeliverToApprove extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      open: false,
      itemStates:[],
      indice:0,
      validate:false
    };

    this.toggle = this.toggle.bind(this);
    this.handlerOnChangeState=this.handlerOnChangeState.bind(this);
    this.handlerOnSendItems=this.handlerOnSendItems.bind(this);
    this.handleOnValidate=this.handleOnValidate.bind(this);
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
    const itemStates= this.props.requests[indiceRequest].items.map(()=>0)
    this.setState({
      indice:indiceRequest,
      itemStates:itemStates
    })
}
handlerOnChangeState(e,i){
  let value = e.target.value
  console.log(value)
  console.log(i)
  let newItemState=[...this.state.itemStates]
  newItemState[i]=value
  console.log(newItemState)
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
    states[i]==0 ? item.state="Conforme": item.state="No conforme";
  })

  this.props.onUpdateItems(newStateRequest,2,this.props.userId);

}

toggle() {
this.setState({
    modal: !this.state.modal
});
}

handleOnValidate(data){
  const idRequest = this.props.requests[this.state.indice].idRequest;
  console.log("data",data)
  if(data === idRequest.toString()){
    this.setState({
      validate: true
    })
  }

}



render() {

    const itemsRow = 
    this.props.requests[this.state.indice].items.map((item,i)=>(

      <tr key={i}>
            <td>{item.name}</td>
            <td>{item.quantity}</td>
            {this.state.itemStates[i]==0 ?
            <td>Conforme</td>:
            <td>Disconforme</td>

            }
            </tr>
      
      ))

    return (
      <div>
       
        <div>

          {this.props.updateItemSuccess && <Redirect to='/requests' />}
            <h4>Solicitud Entregada: </h4>
            <p><strong>Jefe de Obra:</strong> Juanito Perez</p>
            <p><strong>Dirección de obra:</strong> {this.props.requests[this.state.indice].building.address}</p>

            <h4>Items Entregados:</h4>
            <div className="row">
              { this.props.requests[this.state.indice].items.map((item,i)=>(
                
                
                <ItemToApproveDeliver
                key={i}
                i={i}
                select={this.state.itemStates[i]} 
                quantity={item.quantity}
                name={item.name} 
                description={item.description}
                distributor={item.distributor}
                onChangeState={this.handlerOnChangeState}         
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
                    Los siguientes items fueron entregados:
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
        
      </div>
    )
  }
}


const mapStateToProps = state => {
return {
  requests: state.request.requests,
  updateItemSuccess: state.request.updateItemSuccess,
  userId: state.login.userId,
  
    userType: state.login.userType,
  
};
};

const mapDispatchToProps = dispatch => {
return {
  onUpdateItems: (request,type,userId) => dispatch(actions.updateItems(request,type,userId)),
  onFetchRequests: (userId, userType, state) => dispatch(actions.fetchRequests(userId, userType, state)),
  

};
};

export default connect(mapStateToProps, mapDispatchToProps)(DeliverToApprove);