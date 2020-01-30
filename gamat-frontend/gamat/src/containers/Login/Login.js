import React from 'react';
import { Button, FormGroup, Label, Form, Input } from 'reactstrap';
import "./Login.css";
import * as actions from '../../store/actions/index';
import {connect} from 'react-redux';
import Spinner from '../../components/UI/Spinner'
import { Redirect } from 'react-router-dom';


class Login extends React.Component {
    constructor(props) {
      super(props);
  
      this.state = {
        email: '',
        password: ''
      };
    }

    handleChange = event => {
        this.setState({
          [event.target.name]: event.target.value
        });
      }
    
    
    handleSubmit = (event) => {
        event.preventDefault();
        this.props.onLogin(this.state.email,this.state.password);      
    }
    
    validarForm() {
        if( this.state.email.length > 0 && this.state.password.length > 0){
            return false;
        }
        return true;
    }

    render() {

        let loginRedirect = null
        if (this.props.isLogged){
            loginRedirect = <Redirect to='/' />
        }

        let form = <Form onSubmit= {this.handleSubmit}>
                        <FormGroup>
                            <Label>Correo Electrónico</Label>
                            <Input
                                autoFocus
                                type="email"
                                id="email"
                                name="email"
                                value={this.state.email}
                                onChange={this.handleChange}
                                required
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label>Contraseña</Label>
                            <Input
                                required
                                value={this.state.password}
                                onChange={this.handleChange}
                                type="password"
                                id="password"
                                name="password"
                            />
                        </FormGroup>
                            <Button
                                color="primary"
                                block
                                disabled={this.validarForm()}
                                type="submit"
                            > 
                            Login
                            </Button>
                    </Form>

        if(this.props.loading){
            form = <Spinner />
        }
        
        let errorMessage = null
        if(this.props.error){
            errorMessage = <div className="alert alert-danger text-center">{this.props.error}</div>
        }

        return (
            <div className="row justify-content-center">
                {loginRedirect}
                {errorMessage}
                <div className="col-12 col-lg-3 mb-3">
                    <div className="card item-card">
                        <div className="card-body">
                            <center><h4>Iniciar Sesión</h4></center>
                            {form}
                        </div>
                    </div>
                    
                </div>
            </div>
        );
    }   

}   

const mapStateLoading = state => {
    return {
        loading: state.login.loading,
        error: state.login.error,
        isLogged : state.login.userId !== null,
    };
}

const mapDispatchToProps = dispatch => {
    return{
        onLogin: (email,password) => dispatch(actions.login(email,password))
    };
};

export default connect(mapStateLoading,mapDispatchToProps)(Login);