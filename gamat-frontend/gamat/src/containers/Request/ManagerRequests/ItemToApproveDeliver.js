import React from 'react';

const ItemToApproveDeliver = (props) => {

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
                    <div className="col-12"><strong>Proveedor: </strong>{props.distributor} </div>
                </div>
                <div className="row">
                    <div className="col-12 my-2">    
                        <select value={props.select} onChange={(e)=>props.onChangeState(e,props.i)} className="form-control">
                            <option key={0} value={0}>Conforme</option>
                            <option  key={1} value={1}>Disconforme</option>
                        </select>
                    </div>
                </div>           
            </div>
        </div>
    </div>
  );
};

export default ItemToApproveDeliver;