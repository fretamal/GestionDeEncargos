import React, { Component } from 'react';
import Layout from './components/Layout/Layout';
import { Route, withRouter, Redirect } from 'react-router-dom';
import NewRequest from './containers/Request/NewRequest/NewRequest';
import Requests from './containers/Request/Requests/Requests';
import RemovedSuccess from './containers/Request/Requests/Requests';
import Login from './containers/Login/Login';
import newBudget from './containers/Budget/NewBudget';
import Logout from './containers/Login/Logout';
import ViewRequest from './containers/Request/ViewRequest/ViewRequest';
import RequestToAprove from './containers/Request/ApproverRequests/RequestToAprove';
import RequestToPickUp from './containers/Request/DriverRequests/RequestToPickUp';
import RequestToDeliver from './containers/Request/DriverRequests/RequestToDeliver';
import DeliverToApprove from './containers/Request/ManagerRequests/DeliverToApprove';
import { connect } from 'react-redux';
import * as actions from './store/actions/index';
import ApproveBudget from './containers/Request/BuyerRequests/ApproveBudget';
import testingQR from './containers/QRTest/testingQR';
import AssingRequest from './containers/Request/AssingRequest/AssingRequest';
import generadorQr from './containers/Qr/generadorQr';
import Users from './containers/Administration/Users'
import Companies from './containers/Administration/Companies';
import Providers from './containers/Administration/Providers';
import NewBudget from './containers/Budget/NewBudget';



// componente para filtrar rutas ( en desarrollo, le debo hacer algunas modificaciones)


const VerificarRuta = (props,Component, userType, roles) => {

  if (userType !== null) {
    return (roles.indexOf(userType) > -1) ?
      <Component {...props} />
      : <Redirect {...props} to="/" />

  }
  else {
    return <Redirect {...props} to="/login" />
  }
}

class App extends Component {

  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  render() {
    return (
      <div>
        {/* <AlertModal/> */}
        <Layout>
          <Route exact path="/"
            render={(props) => <Redirect {...props} to="/requests" />}></Route>

          <Route path="/new-request" exact
            render={(props) => VerificarRuta({...props},NewRequest, this.props.uType, ['Approver', 'Manager'])}></Route>

          <Route exact path='/requests'
            render={(props) => VerificarRuta({...props},Requests, this.props.uType, ['Approver', 'Manager', 'Buyer', 'Driver'])} />
          {/* <Route path="/requests" exact component={ Requests }></Route> */}

          <Route path="/login" exact component={Login}></Route>

          <Route path="/new-budget/:idRequest/:update?" exact
            render={(props) => VerificarRuta({...props},NewBudget, this.props.uType, ['Buyer'])}></Route>

          <Route path="/logout" exact
            render={(props) => VerificarRuta({...props},Logout, this.props.uType, ['Approver', 'Manager', 'Buyer', 'Driver'])}></Route>

          <Route path="/view-request/:idRequest/:update?" exact
            render={(props) => VerificarRuta({...props},ViewRequest, this.props.uType, ['Approver', 'Manager', 'Buyer', 'Driver'])}></Route>

          <Route path="/approve-request/:idRequest/:update?" exact
            render={(props) => VerificarRuta({...props},RequestToAprove, this.props.uType, ['Approver'])}></Route>

          <Route path="/approve-budget/:idRequest/:update?" exact
            render={(props) => VerificarRuta({...props},ApproveBudget, this.props.uType, ['Approver'])}></Route>

          <Route path="/assing-driver/:idRequest/:update?" exact
            render={(props) => VerificarRuta({...props},AssingRequest, this.props.uType, ['Buyer'])}></Route>

          <Route path="/removed-success" exact
            render={(props) => VerificarRuta({...props},RemovedSuccess, this.props.uType, ['Approver', 'Buyer'])}></Route>

          <Route path="/testingqr" exact component={testingQR}></Route>

          <Route path="/request-to-pick/:idRequest/:update?" exact
            render={(props) => VerificarRuta({...props},RequestToPickUp, this.props.uType, ['Driver'])}></Route>

          <Route path="/request-to-deliver/:idRequest/:update?" exact
            render={(props) => VerificarRuta({...props},RequestToDeliver, this.props.uType, ['Driver'])}></Route>

          <Route path="/deliver-to-approve/:idRequest/:update?" exact
            render={(props) => VerificarRuta({...props},DeliverToApprove, this.props.uType, ['Approver'])}></Route>

          <Route path="/validation/:idRequest/:update?" exact
            render={(props) => VerificarRuta({...props},generadorQr, this.props.uType, ['Manager'])}></Route>

          <Route path="/users" exact
            render={(props) => VerificarRuta({...props},Users, this.props.uType, ['Buyer'])}></Route>

          <Route path="/companies" exact
            render={(props) => VerificarRuta({...props},Companies, this.props.uType, ['Buyer'])}></Route>

          <Route path="/providers" exact
            render={(props) => VerificarRuta({...props},Providers, this.props.uType, ['Buyer'])}></Route>
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {

    uType: state.login.userType
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.loginCheckState())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
