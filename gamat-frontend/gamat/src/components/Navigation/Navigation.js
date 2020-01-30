import React from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavLink,
} from 'reactstrap';
import MenuJefeDeObra from './MenuJefeDeObra';
import MenuComprador from './MenuComprador';
import MenuChofer from './MenuChofer'
import MenuAprobador from './MenuAprobador';
import logo from  '../../assets/img/logoblanco.png'


export default class Navigation extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  
  render() {

    let menu = null
    if(this.props.type === "Approver" ){
      menu =  <MenuAprobador/>
    }
    else if(this.props.type === "Manager" ){
      menu =  <MenuJefeDeObra/>
    }
    else if(this.props.type === "Buyer" ){
      menu =  <MenuComprador/>
    }
    else if(this.props.type === "Driver" ){
      menu =  <MenuChofer/>
    }

    let loginMenu = <NavLink href="/login">Iniciar Sesión</NavLink>
    if (this.props.type != null){
      loginMenu = <NavLink href="/logout"> Cerrar Sesión</NavLink>
    }

    return (
      <div>
        <Navbar className="navbar navbar-dark bg-primary" light expand="md">
          <NavbarBrand href="/"> <img src={logo} width='200px'/> </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            {menu}
            <Nav className="ml-auto" navbar>
              {loginMenu}
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}