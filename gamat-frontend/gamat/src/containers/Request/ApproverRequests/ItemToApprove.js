import React from 'react';

const ItemToApprove = (props) => {

    let succesBtn = null;
    let warningBtn = null;
    let dangerBtn = null;
    if(props.state === 'pendiente'){
        succesBtn = 'btn btn-sm mr-2 btn-outline-success'
        warningBtn = 'btn btn-sm mr-2 btn-warning'
        dangerBtn = 'btn btn-sm mr-2 btn-outline-danger'
    }else if(props.state === 'autorizado'){
        succesBtn = 'btn btn-sm mr-2 btn-success'
        warningBtn = 'btn btn-sm mr-2 btn-outline-warning'
        dangerBtn = 'btn btn-sm mr-2 btn-outline-danger'
    }else if(props.state === 'rechazado'){
        succesBtn = 'btn btn-sm mr-2 btn-outline-success'
        warningBtn = 'btn btn-sm mr-2 btn-outline-warning'
        dangerBtn = 'btn btn-sm mr-2 btn-danger'
    }else{
        succesBtn = 'btn btn-sm mr-2 btn-outline-success'
        warningBtn = 'btn btn-sm mr-2 btn-outline-warning'
        dangerBtn = 'btn btn-sm mr-2 btn-outline-danger'
    }

  return (
      <div className="col-12 col-lg-4 mb-3">
      {console.log(props.state)}
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
                    <div className="col-12"><strong>Observaciones:</strong> </div>
                    <div className="col-12"> <textarea value={props.valueObservation} onChange={(e)=>props.onChangeForm(e,props.i)} className="form-control  w-100" rows="2"></textarea></div>
                </div>
                <div className="row">
                    <div className="col-12 my-2">    
                        <button onClick={(e)=>{props.onChangeState("autorizado",props.i)}} className={succesBtn}>Aprobar</button>
                        <button onClick={(e)=>{props.onChangeState("pendiente",props.i)}} className={warningBtn}>Pendiente</button>
                        <button onClick={(e)=>{props.onChangeState("rechazado",props.i)}} className={dangerBtn}>Rechazar</button>
                    </div>
                </div>           
            </div>
        </div>
    </div>

    // <div className="col-12 col-lg-4 mb-3">
    //     <div className="card">
    //         <div className="card-body">
    //         <div className="row">
    //                 <div className="col-4"><b>Item #{props.number}</b></div>
    //                 <div className="col-8"></div>
    //             </div>
    //             <div className="row">
    //                 <div className="col-5 col-lg-4">Nombre:</div>
    //                 <div className="col-7 col-lg-8"> {props.name} </div>
    //             </div>
    //             <div className="row">
    //                 <div className="col-5 col-lg-4">Cantidad:</div>
    //                 <div className="col-7 col-lg-8"> {props.quantity} </div>
    //             </div>
    //             <div className="row">
    //                 <div className="col-5 col-lg-4">Urgencia:</div>
    //                 <div className="col-7 col-lg-8"> {props.urgency ? 'Si' : 'No' }</div>
    //             </div>
    //             <div className="row">
    //                 <div className="col-5 col-lg-4">Descripción:</div>
    //                 <div className="col-7 col-lg-8"> {props.description}</div>
    //             </div>
    //             <div className="row">
    //                 <div className="col-5 col-lg-4">Estado:</div>
    //                 <div className="col-7 col-lg-8 font-weight-bold"> {props.state}</div>
    //             </div>
    //             <div className="row">
    //                 <div className="col-12">Observaciones:</div>
    //                 <div className="col-12"> <textarea value={props.valueObservation} onChange={(e)=>props.onChangeForm(e,props.i)} className="form-control  w-100" rows="2"></textarea></div>
    //             </div>
                
    //             <div className="row">
    //                 <div className="col-12 my-2">
    //                     <button onClick={(e)=>{props.onChangeState("autorizado",props.i)}} className="btn btn-sm mr-2 btn-success">Aprobar</button>
    //                     <button onClick={(e)=>{props.onChangeState("pendiente",props.i)}} className="btn btn-sm mr-2 btn-warning">Pendiente</button>
    //                     <button onClick={(e)=>{props.onChangeState("rechazado",props.i)}} className="btn btn-sm mr-2 btn-danger">Rechazar</button>
    //                 </div>
    //             </div>
                
    //                 {/* <button onClick={props.handler}/> */}
                
    //         </div>
    //     </div>
    //   </div>

  );
};

export default ItemToApprove;