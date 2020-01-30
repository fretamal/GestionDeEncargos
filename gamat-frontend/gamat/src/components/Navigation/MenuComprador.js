import React from 'react';
import {
  Nav,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  NavItem,NavLink,
  DropdownItem } from 'reactstrap';
  import {Link}from 'react-router-dom';
  
  const MenuComprador = () => (

            <Nav className="" navbar>

              <NavItem>
                <NavLink href='/requests'>Solicitudes</NavLink>
              </NavItem>

              <NavItem>
                <NavLink href='/users'>Usuarios</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href='/companies'>Empresas</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href='/providers'>Proveedores</NavLink>
              </NavItem>
              {/* <UncontrolledDropdown nav inNavbar>
                <DropdownMenu left="true" >
                  <DropdownItem>
                    <Link to='/requests'>
                      Solicitudes
                    </Link>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Usuarios
                </DropdownToggle>
                <DropdownMenu left="true">
                  <DropdownItem>
                    Agregar nuevo usuario
                  </DropdownItem>
                  <DropdownItem>
                    Ver usuarios
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown> */}
            </Nav>
  )

  export default MenuComprador;