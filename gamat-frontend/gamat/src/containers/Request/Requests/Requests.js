import React, { Component } from 'react';
import Moment from 'moment';
// Redux
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';
import Spinner from '../../../components/UI/Spinner';
import { Table, Button ,FormGroup,Label,Input,Alert} from 'reactstrap';
import { Link, Redirect } from 'react-router-dom';
import ListRequest from './ListRequest';
import ButtonsRequest from './ButtonsRequest';

class Requests extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      estado:0,
      estados:[
        'Pendientes por revisar',
        'Aprobados',
        'Cotizados'
      ]
    };
    this.toggle = this.toggle.bind(this);
    this.handler = this.handler.bind(this);
    this.refreshRequest= this.refreshRequest.bind(this);
    
  }
  handler() {
    console.log("funciona")
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  componentDidMount() {
 

    let estados;
    if(this.props.userType==="Buyer")
   {
     estados=[
        'Todas',
       'Aprobados',
       'Autorizados',
       'Asignadas'
      ]
       
   } 
   else{
    estados=[
      'Todas',
      'Pendientes por revisar',
      'Aprobados',
      'Cotizados',
    
    ]


   }
    this.setState({
      estados:estados
    })
    let state=0;
   
    this.props.onFetchRequests(this.props.userId, this.props.userType, state);
    this.props.removedFalse();
    
  }

  refreshRequest(e){
    const value = e.target.value;
    this.setState({
      estado:value
    })
    this.props.onFetchRequests(this.props.userId, this.props.userType, value);
    // console.log(this.props.userType)
  }



  deleteHandler = (event) => {
    const res= window.confirm("¿Esta seguro de que desea eliminar esta solicitud?")
    res && (this.props.onDeleteRequest(event.target.name))
  }
  
 

  render() {

    let redirect = null
    if (this.props.requestRemoved) {
      //console.log(this.props.requestRemoved)
      redirect = <Redirect to='/removed-success' />
    }
    
    let spinner = <Spinner />
    let requests = null
    if (!this.props.loading) {
      spinner = null
      requests = this.props.requests.map((request, i) => (
        <tr key={request.idRequest}>
          <td>{request.idRequest}</td>
          {this.props.userType !== "Manager" &&
          <td>{request.manager ? request.manager.name : '---'}</td>
      }
          {this.props.userType !== "Manager" &&
          <td>{request.building ? request.building.company.name : '---'}</td>
         }
          {this.props.userType !== "Driver" &&
            <td>{request.date ? Moment(request.date).format("DD/MM/YYYY hh:mm") : ''}</td>
         }
          {this.props.userType !== "Driver" &&
            <td>{request.state}</td> 
          }
          {this.props.userType !== "Driver" && this.props.userType !== "Manager" &&
            <td>{request.observation}</td>
          }
          {/* <td><Link to={'/view-request/'+request.idRequest}><Button color="primary" id="ver">Ver</Button></Link> </td> */}
         
          <td className="d-flex justify-content-center justify-content-lg-start flex-wrap">
              <ButtonsRequest
              userType={this.props.userType}
              state={request.state}
              id={request.idRequest}
              />
              {(this.props.userType === 'Buyer' || this.props.userType === 'Approver') 
             &&<Button className="btn btn-sm mr-1 btn-danger" id="borrar" name={request.idRequest} onClick={this.deleteHandler}>Borrar</Button>}
             
          </td>
        </tr>
      ))
    }

    return (
      <div className="container p-2 p-lg-4">
      
        {redirect}
        {spinner}
        
        <ListRequest 
          userType={this.props.userType}
          estado={this.state.estado}
          estados={this.state.estados}
          refreshRequest={this.refreshRequest}
          requests={requests}
        />
 

      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    requestRemoved: state.request.requestRemoved,
    requests: state.request.requests,
    loading: state.request.loading,
    userId: state.login.userId,
    userType: state.login.userType,
    removed: state.request.removed
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchRequests: (userId, userType, state) => dispatch(actions.fetchRequests(userId, userType, state)),
    onDeleteRequest: (requestId) => dispatch(actions.removeRequests(requestId)),
    removedFalse: () => dispatch(actions.removedToFalse()),
    
  };
};



export default connect(mapStateToProps, mapDispatchToProps)(Requests);