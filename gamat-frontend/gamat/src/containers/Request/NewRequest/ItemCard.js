import React from 'react';

const ItemCard = (props) => {
  return (

    <div className="col-12 col-lg-4 mb-3">
        <div className="card item-card">
            <div className="card-body item-card-body">
                <div className="row">
                    <div className="col-12 col-lg-12 d-flex justify-content-between"> 
                        <strong>{props.name}</strong>
                        <div className="item-quantity">{props.quantity}  <span className="item-unity">{props.measure ? props.measure : 'unidades'}</span>  </div>
                    </div>
                    <div className="col-12">
                    <hr/>
                    <strong>Descripción: </strong> {props.description}</div>
                </div>
                <div className="row">
                    <div className="col-12 my-2">    
                        <button onClick={props.onEdit} className="btn btn-sm btn-info mr-2">Editar</button>
                        <button onClick={props.onDelete} className="btn btn-sm btn-danger mr-2">Borrar</button>
                    </div>
                </div>           
            </div>
        </div>
    </div>

  );
};

export default ItemCard;