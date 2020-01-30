import React from 'react';
import {
  Nav,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';
  import {Link}from 'react-router-dom';

  const MenuJefeDeObra = () => (

            <Nav className="" navbar>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Solicitudes
                </DropdownToggle>
                <DropdownMenu left='true' >
                  <DropdownItem>
                    <Link to='/new-request'>Ingresar Nueva Solicitud</Link>
                  </DropdownItem>
                  <DropdownItem>
                    <Link to='/requests'>Solicitudes </Link>
                  </DropdownItem>
                  {/* <DropdownItem>
                    <Link to=''>Confirmar Recepción</Link>
                  </DropdownItem>
                  <DropdownItem>
                    <Link to='/requests'>Historial de Solicitudes </Link>
                  </DropdownItem> */}
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
  )

  export default MenuJefeDeObra;