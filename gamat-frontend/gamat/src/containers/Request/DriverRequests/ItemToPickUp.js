import React from 'react';

const ItemToPickUp = (props) => {
    let succesBtn = null;
    let dangerBtn = null;
    if(props.picked === true){
        succesBtn = 'btn btn-sm mr-2 btn-success'
        dangerBtn = 'btn btn-sm mr-2 btn-outline-danger'
    }else{
        succesBtn = 'btn btn-sm mr-2 btn-outline-success'
        dangerBtn = 'btn btn-sm mr-2 btn-danger'
    }

  return (
    <div className="col-12 col-lg-4 mb-3">
        <div className="card item-card">
            <div className="card-body item-card-body">
                <div className="row">
                    <div className="col-12 col-lg-12 d-flex justify-content-between"> 
                        <strong>{props.name}</strong>
                        <div className="item-quantity">{props.quantity}  <span className="item-unity">{props.measure ? props.measure : 'unidades'}</span>  </div>
                    </div>
                    <div className="col-12"><strong>
                        <hr/>
                        Descripción: </strong> {props.description}
                    </div>
                    <div className="col-12"><strong>Proveedor: </strong>{props.distributor} </div>
                </div>
                <div className="row">
                    <div className="col-12 my-2">    
                        <button onClick={props.onChangeState} className={succesBtn}>Retirado</button>
                        <button onClick={props.onChangeState} className={dangerBtn}>No Retirado</button>
                    </div>
                </div>
            </div>
        </div>
    </div>


  );
};

export default ItemToPickUp;