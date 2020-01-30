import React from 'react';
import ListIcon from '@material-ui/icons/List'

const ListProvider = (props) => {
    return (
        <div>
    <table className="table table-primary table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>Nombre</th>
            <th>Dirección</th>
            <th>Observación</th>
            <th>Horario</th>
            <th>Acciones</th>
          </tr>
        </thead>
        {/* <tbody>
            {props.providers.map((provider,i)=>(

          <tr key={i}>
            <th scope="row">{i}</th>
            <td>{provider.name}</td>
            <td>{provider.address}</td>
            <td>{provider.observation}</td>
            <td>{provider.schedule}</td>
            <td>
              <button className="btn btn-sm btn-info">Editar</button>{' '}
              <button onClick={(e)=>props.onDelete(provider.idProvider)} className="btn btn-sm btn-danger">Borrar</button>
            </td>

          </tr>

            ))}
        </tbody> */}
      </table>
        </div>
    );
};

export default ListProvider;