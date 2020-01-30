import React, { Component } from 'react';
import AddItemModal from './AddItemModal';
import ItemCard from './ItemCard';
//import { requests } from '../../../requests.json';
import { connect } from 'react-redux';
import Spinner from '../../../components/UI/Spinner';
import * as actions from '../../../store/actions/index';
import { Link, Redirect } from 'react-router-dom';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';


class NewRequest extends Component {
 
  addItemHandler (item){
    this.setState({
      items: this.state.items.concat(item),
    })
  }

  onBackHandler = (event) => {

    this.props.removedFalse();
    
  }

  render() {

      
    let redirect = null
    if (!this.props.requestRemoved){
        redirect = <Redirect to='/requests' />
    }

    return (
      <div> 
          {redirect}      
          <h1>Solicitud eliminada con exito</h1>
          <Button className="btn btn-secondary" onClick={this.onBackHandler}>Volver</Button>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    requestRemoved: state.request.requestRemoved,
    loading: state.request.loading,
    userId : state.login.userId,
  };
}
const mapDispatchToProps = dispatch => {
  return{
    removedFalse: () => dispatch(actions.removedFalse())  
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewRequest);