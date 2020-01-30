import React, { Component } from 'react'
import { UncontrolledAlert, Button } from 'reactstrap';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';
import { Link, Redirect } from 'react-router-dom';
import ItemToApprove from './ItemToApprove';
import NewRequest from '../NewRequest/NewRequest';

class RequestoToAprove extends Component {
    constructor(props) {
        super(props);
        this.state = {
            indice: 0,
            items: [],
            observations:[],
            states:[],
            disabled:true
        };
        this.handleOnApprove = this.handleOnApprove.bind(this);
        this.handleOnReject = this.handleOnReject.bind(this);
        this.handleOnChangeState = this.handleOnChangeState.bind(this);
        this.handleOnChangeForm=this.handleOnChangeForm.bind(this);
        this.helperRefreshItems=this.helperRefreshItems.bind(this);
        this.disabledBoton=this.disabledBoton.bind(this);
    }

    componentDidMount() {
        // this.props.onFalseVariables();
        if(this.props.match.params.update === "notf"){
            // console.log("vengo de notificacion");
            this.props.onFetchRequests(this.props.userId, this.props.userType, 0);
        }
        let indiceRequest =  this.props.requests.findIndex(
            (req)=>req.idRequest == this.props.match.params.idRequest);
        const newObservations= this.props.requests[indiceRequest].items.map(()=>"")
        const newStates=this.props.requests[indiceRequest].items.map(()=>"");
      
            console.log( this.props.requests[indiceRequest])
        this.setState({
            indice: indiceRequest,
            // items: request.items,
            observations: newObservations,
            states: newStates
        })

    }
    handleOnChangeState(state,i) {
        
       let copiaStates = [...this.state.states]
       copiaStates[i]=state;
       const disabled=this.disabledBoton(copiaStates)
       console.log(disabled)
       this.setState({
           states:copiaStates,
           disabled:disabled
       })
    }
    disabledBoton(state){
       for (let i = 0; i < state.length; i++) {
           const actual = state[i];
           if(actual=='autorizado'){
               console.log("entre",actual)
               return false
           }
           
       }
        return true;

    }

    handleOnChangeForm(e,i){
   
        const value = e.target.value;
        let copia = [...this.state.observations]
        copia[i]=value;
       
        this.setState({
            observations:copia
        })

    }
    helperRefreshItems(){
       
        const observations= this.state.observations;
        const states= this.state.states;
        let newStateRequest= this.props.requests[this.state.indice]
        newStateRequest.items.map((item,i)=>{
            item.observation=observations[i];
           
            // esto se modificara despues, cuando se hagan cambios en la bd
         
            item.state=states[i]
        })

        return newStateRequest
    }

    handleOnApprove() {
        const idRequest= this.props.requests[this.state.indice].idRequest;
        let newStateRequest = this.helperRefreshItems();
        this.props.onApproveRequest(idRequest,newStateRequest)
    }

    handleOnReject() {
        const idRequest= this.props.requests[this.state.indice].idRequest;
        let newStateRequest = this.helperRefreshItems()
        this.props.onRejectRequest(idRequest, newStateRequest)
    }

    render() {

        return (
            <div>
                {this.props.approve &&
                  <Redirect to='/requests' />}

                {this.props.reject &&
                    <UncontrolledAlert color="warning"  >
                        Solicitud rechazada correctamente
                    </UncontrolledAlert>
                }
                <h2>Revisar Solicitud </h2>

                <div className="d-flex  mb-5">

                    {
                        this.props.requests[this.state.indice].items.map((item, index) => (


                            <ItemToApprove
                                key={index}
                                i={index}
                                number={item.number}
                                name={item.name}
                                quantity={item.quantity}
                                urgency={item.urgency}
                                description={item.description}
                                observation={item.observation}
                                onChangeForm={this.handleOnChangeForm}
                                valueObservation={this.state.observations[index]}
                                state={this.state.states[index]}
                                onChangeState={this.handleOnChangeState}
                            />



                        ))}
                </div>

                <div className=" col-md-7 d-flex justify-content-around">

                    <Button color="success"  disabled={this.state.disabled} onClick={this.handleOnApprove}>Aprobar Solicitud </Button>
                    <Button color="danger" onClick={this.handleOnReject}>Rechazar Solicitud </Button>
                    <Link to={'/requests'}>
                        <Button color="secondary">Volver </Button>

                    </Link>
                </div>
            </div>

        )
    }


};

const mapStateToProps = state => {
    return {
        requests: state.request.requests,
        approve: state.request.requestApprove,
        reject: state.request.requestReject,
        userId: state.login.userId,
    userType: state.login.userType,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onApproveRequest: (requestId,request) => dispatch(actions.fetchApproveRequests(requestId,request)),
        onRejectRequest: (requestId,request) => dispatch(actions.fetchRejectRequests(requestId,request)),
        onFalseVariables: () => dispatch(actions.removedToFalseRequest()),
        onFetchRequests: (userId, userType, state) => dispatch(actions.fetchRequests(userId, userType, state)),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RequestoToAprove);