import React, { Component } from 'react';
import Auxiliar from '../../hoc/Auxiliar';
import Navigation from '../Navigation/Navigation';
import { connect } from 'react-redux';
import Alerts from '../UI/Alerts';

import * as actions from '../../store/actions/index';

class Layout extends Component {

    render (){
        return(
            <Auxiliar>
            <Navigation type={this.props.userType} isLogged={this.props.isLogged} />
            <Alerts 
                open={this.props.open} 
                type={this.props.type} 
                text={this.props.text}
                onClose={this.props.onDismissAlert}/>
            <main className='p-2 pt-3 p-lg-4'> 
                {this.props.children}
            </main>
        </Auxiliar>
        )
    }
}

const mapStateToProps = state =>{
    return {
        userType: state.login.userType,
        isLogged : state.login.userId !== null,
        open: state.request.successAction,
        type: state.request.typeAlert,
        text: state.request.textAlert
    };
}

const mapDispatchToProps = dispatch => {
    return {
      
      onDismissAlert: ()=> dispatch(actions.onDismissAlert())
    };
  };

export default connect(mapStateToProps,mapDispatchToProps)(Layout);