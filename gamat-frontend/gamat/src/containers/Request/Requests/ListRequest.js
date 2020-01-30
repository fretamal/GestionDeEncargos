import React from 'react';
import PropTypes from 'prop-types';
import { Table, Button ,FormGroup,Label,Input} from 'reactstrap';

const ListRequest = props => {
    return (
        <div>
           
        <div className="row m-0">
          <div className="col-12 p-0 mb-4">
            <h2>Lista de Solicitudes: </h2>
          </div>
          
            {(props.userType =="Approver" || props.userType=="Buyer") &&
            <div className="col-12 p-0 mb-4">
              <h6>Filtrar por:</h6>
              <div className="form-group row">
                <label className="col-sm-1 col-form-label">Estado</label>
                <div className="col-sm-4">
                <Input value={props.estado} onChange={props.refreshRequest} type="select" name="estado" id="estado" >
                    {props.estados.map((estado, i) => (
                      <option key={i} value={i}>{estado}</option>
                      ))}
                  </Input>
                </div>
              </div>
            </div>

            }
          
          <div className="col-12 p-0">
          
            <table className="table table-primary table-responsive-lg">
              <thead>
                <tr>
                  <th>#</th>
                  {props.userType !== "Manager" && <th>Solicitante</th> }
                  {props.userType !== "Manager" && <th>Compañía</th> }
                  {props.userType !== "Driver" && <th>Fecha</th> }
                  {props.userType !== "Driver" && <th>Estado</th> }
                  {props.userType !== "Driver" && props.userType !== "Manager" && <th>Observación</th> }
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {props.requests}
              </tbody>
            </table>

          </div>
        </div> 
        </div>
    );
};

ListRequest.propTypes = {
    
};

export default ListRequest;