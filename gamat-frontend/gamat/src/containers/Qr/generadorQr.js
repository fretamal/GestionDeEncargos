import React, { Component } from 'react';
import QRCode from 'qrcode.react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';


class generadorQr extends Component {
    constructor(props){
        super(props)
        this.state ={
            indice:0,
            idRequest:0
        }
    }

    componentDidMount(){
        let indiceRequest = this.props.requests.findIndex(
            (req)=>req.idRequest == this.props.match.params.idRequest);
        let idRequest = this.props.requests[indiceRequest].idRequest.toString();
            this.setState({indice:indiceRequest,
            idRequest: idRequest})
    }
    render() {
        return (
            <div className="row m-0">
                <div className="col-12 d-flex flex-column align-items-center">
                    <h3 className="text-center">Escanea el siguiente código</h3>
                    <QRCode value={this.state.idRequest}></QRCode>  
                    <Link to='/requests'><button className="btn btn-secondary mt-3">Volver</button></Link>

                </div>   
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
      requests: state.request.requests,
    
    };
};
    
    
    export default connect(mapStateToProps,null)(generadorQr);