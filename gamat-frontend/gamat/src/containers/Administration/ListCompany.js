import React from 'react';
import ListIcon from '@material-ui/icons/List'
const ListCompany = (props) => {
    return (
        <div>
    <table className="table table-primary table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>Nombre</th>
            {/* <th>Rut</th> */}
            <th>Obras</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
            {props.companies.map((company,i)=>(


          <tr key={i}>
            <th scope="row">{company.idCompany}</th>
            <td>{company.name}</td>
            <td><button onClick={(e)=>props.onListBuilding(company.idCompany)} className="btn btn-sm btn-secondary">Ver <ListIcon/></button></td>
            {/* <td></td> */}
            <td>
              <button className="btn btn-sm btn-info">Editar</button>{' '}
              <button onClick={(e)=>props.onDelete(company.idCompany)} className="btn btn-sm btn-danger">Borrar</button>{' '}
              <button onClick={(e)=>props.toggle(company.idCompany)} className="btn btn-sm btn-success">Agregar Obra</button>{' '}
              {/* <button className="btn btn-sm btn-danger">Borrar Obra</button>{' '} */}
            </td>

          </tr>

            ))} 
        </tbody>
      </table>
        </div>
    );
};

export default ListCompany;