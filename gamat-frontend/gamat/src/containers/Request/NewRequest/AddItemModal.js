import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, CustomInput } from 'reactstrap';

class AddItemModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      name: '',
      quantity: '',
      urgency: false,
      description: '',
      measure: '',
    };

   
    this.inputHandler = this.inputHandler.bind(this);
    this.radioHandler = this.radioHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }

  componentDidMount(){
    if(this.props.item !== null){
      this.setState({
        name:this.props.item.name,
        quantity: this.props.item.quantity,
        urgency: this.props.item.urgency,
        description: this.props.item.description,
        measure: this.props.item.measure
      })
      
    }
  }


  inputHandler (e) {
    const {value, name} = e.target;
      this.setState({
        [name] : value
      })
  }

  radioHandler (e) {
    if(e.target.value === "si"){
      this.setState({
        urgency : true
      })
    }
    else if(e.target.value === "no"){
      this.setState({
        urgency : false
      })
    }
  }

  submitHandler(){
    const item = {
      name: this.state.name,
      quantity: this.state.quantity,
      urgency: this.state.urgency,
      description: this.state.description,
      measure: this.state.measure,
      price: null,
      itemState: null,
      state: "pendiente"
    }

    this.props.item !== null  ? 
      this.props.onEditItem(item,this.props.item.index):
      this.props.onAddItem(item);
    this.setState({
      name: '',
      quantity: '',
      urgency: false,
      description: '',
      measure: '',
    })
    return this.props.toggle()
  }

  validForm() {
    if( this.state.name.length > 0 && this.state.quantity.length > 0){
      // eslint-disable-next-line  
      if(this.state.quantity == parseInt(this.state.quantity, 10)){ // si quantity es un valor entero NO CAMBIAR
        return false;
      }
    }
    return true;
}

  render() {
    return (
      <div>
       
        <Modal isOpen={this.props.open} toggle={this.props.toggle} className={this.props.className}>
          <ModalHeader 
            toggle={this.props.toggle}> 
            {this.props.item === null ? "Agregar Item":"Editar Item"} 
          </ModalHeader>
          <ModalBody>

              <Form>
                <FormGroup>
                <Label for="name">Nombre</Label>
                <Input value={this.state.name} type="text" name="name" id="name" onChange={this.inputHandler}/>
                </FormGroup>

                <div className="row m-0">
                  <div className="col-6 pl-0">
                  <Label for="quantity">Cantidad</Label>
                  <Input value={this.state.quantity} type="number" name="quantity" id="quantity" onChange={this.inputHandler}/>
                  </div>
                  <div className="col-6 pr-0">
                  <Label for="measure">Unidad</Label>
                  <Input value={this.state.measure} type="text" name="measure" id="measure" onChange={this.inputHandler}/>
                  </div>
                </div>

                <FormGroup>
                    <Label for="urgency">Urgencia</Label>
                    <div>
                        <CustomInput type="radio" id="urgency1" name="urgency" label="Si" value="si" checked={this.state.urgency === true}  inline onChange={this.radioHandler}/>
                        <CustomInput type="radio" id="urgency2" name="urgency" label="No" value="no" checked={this.state.urgency === false} inline onChange={this.radioHandler}/>
                    </div>
                </FormGroup>

                <FormGroup>
                    <Label for="description">Descripción</Label>
                    <Input value={this.state.description} type="textarea" name="description" id="description" onChange={this.inputHandler} />
                </FormGroup>

            </Form>

          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.submitHandler} disabled={this.validForm()}>
            {this.props.item === null ? "Agregar":"Editar"}</Button>{' '}
            <Button color="secondary" onClick={this.props.toggle}>Volver</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default AddItemModal;