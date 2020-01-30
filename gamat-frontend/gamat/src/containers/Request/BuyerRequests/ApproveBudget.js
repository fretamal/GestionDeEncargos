import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';
import { Link } from 'react-router-dom';
import {Button} from 'reactstrap';
import ItemApproveBudget from './ItemApproveBudget';
import {  Redirect } from 'react-router-dom';
import ResumeBudget from './ResumeApproveBudget'


class ApproveBudget extends Component {
    constructor(props){
        super(props);
        this.state={
            indiceRequest:0,
            items:[],
            states:[],
            disabled:true

        }

        this.handleOnApprove=this.handleOnApprove.bind(this)
        this.handleOnReject=this.handleOnReject.bind(this);
        this.handleOnChangeState=this.handleOnChangeState.bind(this)
        this.helperRefreshItems=this.helperRefreshItems.bind(this)
        this.handleOnAutorizar=this.handleOnAutorizar.bind(this)
        this.disabledBoton=this.disabledBoton.bind(this)


    }

    componentDidMount(){

        if(this.props.match.params.update === "notf"){
            // console.log("vengo de notificacion");
            this.props.onFetchRequests(this.props.userId, this.props.userType, 0);
        }
        let indiceRequest =  this.props.requests.findIndex(
            (req)=>req.idRequest == this.props.match.params.idRequest);
      
        const newStates=this.props.requests[indiceRequest].items.map(()=>false);
            console.log("nesStates",newStates)

        this.setState({
            indiceRequest: indiceRequest,
            // items: request.items,
            
            states: newStates
        })

    }

    handleOnAutorizar(){
        let  newState= [...this.state.states]
        console.log(newState)
        for (let index = 0; index < newState.length; index++) {
             newState[index]=true;
            
        }
        console.log(newState)
        this.setState({
            states:newState,
            disabled:false
        })
    }
    
    handleOnChangeState(indice,valor){
        console.log("CAMBIANDO",indice)
        let  newState= [...this.state.states]
        newState[indice]=valor
        const disabled=this.disabledBoton(newState)
        this.setState({
            states:newState,
            disabled:disabled
        },()=>console.log(this.state.states))
    }

    disabledBoton(state){
        for (let i = 0; i < state.length; i++) {
            const actual = state[i];
            if(actual){
                console.log("entre",actual)
                return false
            }
            
        }
         return true;
 
     }
    helperRefreshItems(){
       
        
        const states= this.state.states;
        let request= this.props.requests[this.state.indiceRequest]
       let newItems = request.items.map((item,i)=>{
           let state;
            states[i] ? state='autorizado':
            state='no autorizado';

            return {...item,state:state}
        })
        let newStateRequest={...request,items:newItems}

        return newStateRequest
    }


    handleOnApprove(){
        const idRequest= this.props.requests[this.state.indiceRequest].idRequest;
        let newStateRequest = this.helperRefreshItems();
        console.log(newStateRequest)
        this.props.onApproveBudget(idRequest,newStateRequest);

    }

    handleOnReject(){
        const idRequest= this.props.requests[this.state.indiceRequest].idRequest;
        let newStateRequest = this.helperRefreshItems();
        this.props.onRejectBudget(idRequest,newStateRequest);
    }


    render() {
        return (

        <div>
            {console.log(this.props.requests[this.state.indiceRequest])}
            {(this.props.budgetApproveSuccess || this.props.budgetRejectSuccess) && <Redirect to='/requests' />}
            <h3>Revisar Cotizacion</h3>
            <div className="budget-content" >
                <div className="budget-table">

                    {this.props.requests[this.state.indiceRequest].items.map((item, index) => (
                        <ItemApproveBudget
                            key={index}
                            i={index}
                            name={item.name}
                            quantity={item.quantity}
                            urgency={item.urgency}
                            description={item.description}
                            comment={item.comment}
                            // observation={item.observation}
                            price={item.price}
                            state={item.state}
                            // distributor={item.distributor}
                            totalPrice={item.totalPrice}
                            active={this.state.states[index]}
                            // onChangeForm={this.handleOnChangeForm}
                            // valueObservation={this.state.observations[index]}
                            onChangeState={this.handleOnChangeState}
                        />
                        ))}

                </div>
                <div className="budget-resume">
                    <ResumeBudget
                        request={this.props.requests[this.state.indiceRequest]}
                        totalWeight={this.state.totalWeight}
                        shipping_price={this.state.shipping_price}
                        administration_price={this.state.administration_price}
                        total_price={this.state.total_price}
                        true_price={this.state.true_price}
                        payCondition={this.state.payCondition}
                        expiration={this.state.expiration}
                        hora={this.state.hora}
                        sendBudget={this.sendBudget}
                        onEditRequestInfo={this.toggleRequestInfo}
                        onEditBudgetInfo={this.toggleInfo}
                    />
                </div>
            </div>


            

            <div className="d-flex  mb-5">

               
            </div>

            <div className=" col-md-7 d-flex justify-content-around">
                <Link to={'/requests'}>
                    <Button color="secondary">Volver </Button>
                </Link>
                <Button color="danger" onClick={this.handleOnReject}>Rechazar Cotizacion </Button>
                <Button color="success" onClick={this.handleOnAutorizar}>Autorizar todos </Button>            
                <Button color="primary" disabled={this.state.disabled} onClick={this.handleOnApprove}>Aprobar Cotizacion </Button>
            </div>
        </div>

        );
    }
}




const mapStateToProps = state => {
    return {
        requests: state.request.requests,
        approve: state.request.requestApprove,
        reject: state.request.requestReject,
        budgetApproveSuccess: state.request.budgetApproveSuccess,
        budgetRejectSuccess: state.request.budgetRejectSuccess,
        userId: state.login.userId,
    userType: state.login.userType,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onApproveBudget: (requestId,request) => dispatch(actions.fetchApproveBudget(requestId,request)),
        onRejectBudget: (requestId,request) => dispatch(actions.fetchRejectBudget(requestId,request)),
        onFalseVariables: () => dispatch(actions.removedToFalseRequest()),
        onFetchRequests: (userId, userType, state) => dispatch(actions.fetchRequests(userId, userType, state)),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ApproveBudget);