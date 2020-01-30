import React, {Component} from 'react';
import QRCode from 'qrcode.react';
import QrReader from 'react-qr-reader';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';

/*
TestingQR: Clase de prueba donde se ve el funcionamiento del QR que deberian tener el JefeObra y el Chofer.
             En Lector: Se genera un MODAL con el componente QrReader, que realiza la lectura del QR, y manda al servicio X.
                        Cuando el sensor de QR lee el codigo. Se activa la funcion handlerScan()
                        Carga lo leido en el state, manda un 
                        
*/

class testingQR extends Component {

    constructor(props){
        super(props);
        this.state = {
            delay: 100,
            result: "",
            modal: false,
            message: "",
            IDrequest: "12345" //IDRequest: Obtiene la ID de la request (enviar codificada).
            
        };
        this.handleScan = this.handleScan.bind(this);
        this.toggle = this.toggle.bind(this);
    }

    handleScan(data) {
        if (data) {
          this.setState({
            result: data,
            message: "Lectura Realizada!"
          });
          //Llama al servicio para ver si la IDRequest es correcta.
          //En caso de llegarle un request que esta en el estado correcta-> RequestUser true.
          //En caso de que la request ya esta aceptada por los dos, el jefe de obra deberia poder aceptar items.
          //(habilita el boton)
          //En caso de que el codigo QR no corresponde a la request actual, o no esta en la BD. Manda un error.
          
        }

      }




    toggle() {
    this.setState({
        modal: !this.state.modal
    });
    }



    render(){
        return(
        <div className="row">
            <div className="col-12 col-md-4">
                <h3>Lector</h3>
                <Button color="danger" onClick={this.toggle}>Lector</Button>
                <Modal  isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}> Ponga la camara para leer el codigo QR</ModalHeader>
                    <ModalBody>
                        <QrReader
                    delay={this.state.delay}
                    onScan={this.handleScan}
                    style={{ width: "100%"}}
                    ></QrReader>
                    <ModalFooter>
                    {this.state.message} 
                    </ModalFooter>
                    </ModalBody>
                </Modal>
                
                
                
            </div>
            <div className="col-12 col-md-4">
            <h3>Generador</h3>
            <QRCode value={this.state.IDrequest}></QRCode>            
            </div>    

            <div className="col-12 col-md-4">
                <h3>La QR que leyo es: {this.state.result}</h3>
                <br></br>
                <Button color="success" disabled="true"> Confirmar entrega.</Button>

            </div>
        </div>    
               
        );
    }

}
export default testingQR;