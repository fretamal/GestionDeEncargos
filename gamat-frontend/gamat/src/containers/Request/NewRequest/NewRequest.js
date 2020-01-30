import React, { Component } from 'react';
import AddItemModal from './AddItemModal';
import ItemCard from './ItemCard';
//import { requests } from '../../../requests.json';
import { connect } from 'react-redux';
import Spinner from '../../../components/UI/Spinner';
import * as actions from '../../../store/actions/index';
import { Link, Redirect } from 'react-router-dom';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';
// import AlertModal from  '../../AlertModal/AlertModal'

class NewRequest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      observation: '',
      items : [],
      itemEdit:null,
      open: false
    };

    this.toggle = this.toggle.bind(this);
    this.toggleAddItem= this.toggleAddItem.bind(this);
    this.inputHandler = this.inputHandler.bind(this);
    this.handleOnDelete = this.handleOnDelete.bind(this);
    this.handleOnOpenEdit = this.handleOnOpenEdit.bind(this) ;
    this.handleOnEditItem= this.handleOnEditItem.bind(this);

  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  toggleAddItem() {
    this.setState({
      open: !this.state.open,
      itemEdit:null
    });
  }


  inputHandler (e) {
    const {value, name} = e.target;
      this.setState({
        [name] : value
      })
  }

  addItemHandler (item){
    
    this.setState({
      items: this.state.items.concat(item),
    })
  }

  handleOnEditItem(item,index){
    let newItems= this.state.items.map((it)=>({...it}))
    newItems[index] = item;
    this.setState({
      items: newItems,
      itemEdit: null
    })
  }

  handleOnOpenEdit(item){
    
    this.setState({
      itemEdit: {...this.state.items[item],index:item},
      open:true
    })

  }

  handleOnDelete(item){
    let newItems= this.state.items.map(item=>({...item}))
    newItems.splice(item,1);
    this.setState({
      items:newItems
    })

  }


  sendHandler = (event) => {
    const requestData = {
      observation: this.state.observation,
      items: this.state.items,
     
    }
    console.log(requestData,this.props.userId)
    this.props.onSendRequest(requestData, this.props.userId);
    
  }

  render() {

    let redirect = null
    console.log("estado",this.props.requestSent)
    if (this.props.requestSent){
        // alert=<AlertModal/>
        
        redirect = <Redirect to='/requests' />
    }

    const items = this.state.items.map((item, index) => {
      return <ItemCard 
                key={index}
                number={index} 
                name={item.name} 
                quantity={item.quantity} 
                description={item.description} 
                urgency={item.urgency}
                measure={item.measure}
                onEdit={ e =>this.handleOnOpenEdit(index)}
                onDelete={ e =>this.handleOnDelete(index)}
                />
    });

    const itemsRow = this.state.items.map((item, index) => {
      return <tr key={index}>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
            </tr>
    });

    return (
      <div>
        <div className="d-flex">
          
          <div className="mr-3"><h4>Nueva solicitud</h4></div>
          <Button color="info" onClick={this.toggleAddItem}>Agregar Item</Button>
          {this.state.open &&

          <div><AddItemModal  
            open={this.state.open} 
            toggle={this.toggleAddItem} 
            item={this.state.itemEdit} 
            onAddItem={(e) => this.addItemHandler(e)}
            onEditItem={this.handleOnEditItem}
            />
          </div>
          }
        </div>
        
        <h4>Items agregados:</h4>
        <div className="row">
            {items}
        </div>

        <Link to='/requests'><button className="btn btn-secondary">Volver</button></Link>{' '}
        <button className="btn btn-success" disabled={!this.state.items.length > 0} onClick={this.toggle} >Enviar Solicitud</button>
       
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Enviar Solicitud</ModalHeader>
          <ModalBody>
          {this.props.requestSent && <Redirect to='/requests' />}
            {this.props.loading ? <Spinner/> : 
              <div>
                Los items a enviar son los siguientes:
                <table className="table table-sm">
                  <thead>
                    <tr>
                    <th>Nombre</th>
                    <th>Cantidad</th>
                    </tr>
                  </thead>
                  <tbody>
                    {itemsRow}
                  </tbody>
                </table>
              
            
              <Form>
                <FormGroup>
                    <Label for="description">Agregar observaciones (opcional): </Label>
                    <Input type="textarea" name="observation" id="description" onChange={this.inputHandler} />
                </FormGroup>

            </Form>
            </div>
            }
          </ModalBody>
          <ModalFooter>
            <Button color="primary" disabled={this.props.loading} onClick={this.sendHandler} >Enviar</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancelar</Button>
          </ModalFooter>
        </Modal>

      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    requestSent: state.request.requestSent,
    loading: state.request.loading,
    userId : state.login.userId,
  };
}
const mapDispatchToProps = dispatch => {
  return{
    onSendRequest: (requestData, userId) => dispatch(actions.addRequest(requestData, userId))  
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewRequest);