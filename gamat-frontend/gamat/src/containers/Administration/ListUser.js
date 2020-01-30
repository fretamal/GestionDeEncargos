import React from 'react';
import ListIcon from '@material-ui/icons/List'

const ListUser = (props) => {
    return (
        <div>
    <table className="table table-primary table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Empresa</th>
            <th>Obra</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
            {props.users.map((user,i)=>(


          <tr key={i}>
            <th scope="row">{i}</th>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.role}</td>
            <td></td>
            {user.role==='Approver' &&
            <td>{<button onClick={(e)=>props.onListBuilding(user.company.idCompany,i)} className="btn btn-sm btn-secondary">Ver <ListIcon/></button>}</td>
            }
              {user.role==='Manager' &&
            <td>{user.building.address}</td>
            }
            {(user.role==='Driver' || user.role ==='Buyer') &&
            <td>-----</td>
            }
            <td>
              <button className="btn btn-sm btn-info">Editar</button>{' '}
              <button onClick={(e)=>props.onDelete(user.idUser)} className="btn btn-sm btn-danger">Borrar</button>
            </td>

          </tr>

            ))}
        </tbody>
      </table>
        </div>
    );
};

export default ListUser;