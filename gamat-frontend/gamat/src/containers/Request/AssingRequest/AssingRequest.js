import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';
import Spinner from '../../../components/UI/Spinner';
import { Button ,FormGroup,Label,Input} from 'reactstrap';
import { Link, Redirect } from 'react-router-dom';
import Moment from 'moment'


class AssingRequest extends Component {
    constructor(props){
        super(props)
        this.state={
            indice:0,
            driver:0
        }

        this.onChangeDriver=this.onChangeDriver.bind(this);
        this.assignDriver=this.assignDriver.bind(this);

    }

    componentWillMount(){
        if(this.props.match.params.update === "notf"){
            // console.log("vengo de notificacion");
            this.props.onFetchRequests(this.props.userId, this.props.userType, 0);
        }
        let indiceRequest =  this.props.requests.findIndex(
            (req)=>req.idRequest == this.props.match.params.idRequest);

            this.props.onRefreshDriver();
            // console.log(this.props.drivers)
        this.setState({
            indice:indiceRequest
        })
    }

    onChangeDriver(e){
        const value = e.target.value;
    this.setState({
      driver:value
    })
    }
    assignDriver(){
        let idDriver=this.props.drivers[this.state.driver].idUser;
        let idRequest=this.props.requests[this.state.indice].idRequest;
        this.props.onAssingDriver(idDriver,idRequest)
    }

    render() {
        let request = this.props.requests[this.state.indice]

        return (
            <div className="container">
                 <div>
                    {this.props.assingDriver && <Redirect to='/requests' />}
                    <h2>Detalles de la solicitud:</h2>
                    <p><strong>Solicitante:</strong> {request.manager ? request.manager.name : '---'}</p>
                    <p><strong>Compañía:</strong> {request.building ? request.building.company.name : '---'}</p>
                    <p><strong>Dirección de obra:</strong> {request.building ? request.building.address : '---'}</p>
                    <p><strong>Fecha:</strong> {request.date ? Moment(request.date).format("DD/MM/YYYY hh:mm") : '---'}</p>
                    <p><strong>Estado de la solicitud:</strong> {request.state} </p>

                    <h4>Items Solicitados: </h4>
                    <table className="table table-primary table-sm">
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
                        
                        this.props.requests[this.state.indice].items.map((item, index) => {
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
                </div>
                <div>
                    <FormGroup>
                        <Label for="chofer">Chofer</Label>
                        <Input value={this.state.driver} onChange={this.onChangeDriver} type="select" name="chofer" id="chofer" >
                        {this.props.drivers.map((driver, i) => (
                            <option key={i} value={i}>{driver.name}</option>
                            ))}
                        </Input>
                    </FormGroup>
                    <Link to={'/requests'}>
                    <Button color="secondary">Volver </Button>
                    </Link>
                    {' '}  
                    <Button color="success" onClick={this.assignDriver}>Asignar</Button>

                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        requests: state.request.requests,
        drivers: state.request.drivers,
        assingDriver: state.request.assingDriver,
        userId: state.login.userId,
    userType: state.login.userType,
        
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onRefreshDriver: () => dispatch(actions.fetchDriver()),
        onAssingDriver: (idDriver,idRequest) => dispatch(actions.assingDriver(idDriver,idRequest)),
        onFetchRequests: (userId, userType, state) => dispatch(actions.fetchRequests(userId, userType, state)),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AssingRequest);