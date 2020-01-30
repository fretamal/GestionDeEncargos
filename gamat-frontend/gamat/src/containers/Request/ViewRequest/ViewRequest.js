import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import {Button} from 'reactstrap';
import { connect } from 'react-redux';
import Moment from 'moment'
import * as actions from '../../../store/actions/index';
import axios from '../../../axios-config';
import FileDownload from 'js-file-download'
import DownIcon from '@material-ui/icons/CloudDownload'

 class ViewRequest extends Component {
  

  componentDidMount(){
    if(this.props.match.params.update === "notf"){
      // console.log("vengo de notificacion");
      this.props.onFetchRequests(this.props.userId, this.props.userType, 0);
  }

  }

  onDownloadExcel= ()=>{
    const id =this.props.match.params.idRequest
    axios.get(`/requests/download-request-excel/${id}`,{
      responseType: 'arraybuffer'
  })
   .then((response) => {
     console.log("RESPDF",response)
        FileDownload(response.data,`GamatRequest_${id}.xlsx`);
   });

  }

  onDownloadPDF= ()=>{
    const id =this.props.match.params.idRequest
    axios.get(`/requests/download-request-pdf/${id}`,{
      responseType: 'arraybuffer'
  })
   .then((response) => {
     console.log("RESPDF",response)
        FileDownload(response.data,`GamatRequest_${id}.pdf`);
   });

  }

  render() {
    // esto es para qeu se pueda acceder directamente usando la ruta
    let request= this.props.requests.find(
      (req)=>req.idRequest == this.props.match.params.idRequest)
    return (
      <div className="container">
        <h2>Detalles de la solicitud:</h2>
        <p><strong>Solicitante:</strong> {request.manager ? request.manager.name : '---'}</p>
        <p><strong>Compañía:</strong> {request.building ? request.building.company.name : '---'}</p>
        <p><strong>Dirección de obra:</strong> {request.building ? request.building.address : '---'}</p>
        <p><strong>Fecha:</strong> {request.date ? Moment(request.date).format("DD/MM/YYYY hh:mm") : '---'}</p>
        <p><strong>Estado de la solicitud:</strong> {request.state} </p>
      
      <div className="d-flex ml-0 col-md-4 justify-content-between">
        
        <Button onClick={this.onDownloadPDF} color="info">Descargar PDF <DownIcon/> </Button>
        <Button onClick={this.onDownloadExcel} color="success">Descargar EXCEL <DownIcon/> </Button>
        
        
        </div>


        <h4>Items Solicitados: </h4>
        <table className="table table-primary table-responsive-lg table-sm">
          <thead>
            <tr>
            <th>Nombre</th>
            <th>Cantidad</th>
            <th>Urgencia</th>
            <th>Descripción</th>
            <th>Observación</th>
            </tr>
          </thead>
          <tbody>
            {
              request.items.map((item, index) => {
                return <tr key={index}>
                        <td>{item.name}</td>
                        <td>{item.quantity}</td>
                        <td>{item.urgency === false ? 'No' : 'Si' }</td>
                        <td>{item.description}</td>
                        <td>{item.observation}</td>
                      </tr>
              })
            }
          </tbody>
        </table>
        <Link to={'/requests'}>
           <Button color="secondary">Volver </Button>
        </Link>
      </div>
    )
  }
}


const mapStateToProps = state => {
  return {
      requests: state.request.requests,
      userId: state.login.userId,
    userType: state.login.userType,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchRequests: (userId, userType, state) => dispatch(actions.fetchRequests(userId, userType, state)),
  };
};

export default connect(mapStateToProps,  mapDispatchToProps)(ViewRequest);