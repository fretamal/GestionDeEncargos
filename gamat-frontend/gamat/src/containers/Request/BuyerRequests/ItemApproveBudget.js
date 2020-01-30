import React from 'react';
import {Button} from 'reactstrap';
import Check from '@material-ui/icons/CheckCircle'

const ItemApproveBudget = (props) => {

    let succesBtn = null;
    let dangerBtn = null;
    if(props.active === true){
        succesBtn = 'btn btn-sm mr-2 btn-success'
        dangerBtn = 'btn btn-sm mr-2 btn-outline-danger'
    }else{
        succesBtn = 'btn btn-sm mr-2 btn-outline-success'
        dangerBtn = 'btn btn-sm mr-2 btn-danger'
    }
    console.log(props);

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
                        <strong>Descripción: </strong> {props.description}
                    </div>
                    <div className="col-12"><strong>Urgente: </strong>{props.urgency ? 'Si' : 'No'} </div>
                    <div className="col-12"><strong>Comentarios: </strong>{props.comment} </div>
                    <div className="col-12"><strong>Precio unitario: </strong>{props.price} </div>
                    <div className="col-12"><strong>PRECIO TOTAL: </strong>{props.totalPrice} </div>
                </div>
                <div className="row">
                    <div className="col-12 my-2">    
                        <button onClick={(e)=>props.onChangeState(props.i,true)} className={succesBtn}>Autorizar</button>
                        <button onClick={(e)=>props.onChangeState(props.i,false)} className={dangerBtn}>Rechazar</button>
                    </div>
                </div>           
            </div>
        </div>
    </div>

    // <div className="col-12 col-lg-4 mb-3">
    //     <div className="card">
    //         <div className="card-body">
            
    //             <div className="row">
    //                 <div className="col-5 col-lg-4">Nombre:</div>
    //                 <div className="col-7 col-lg-8"> {props.name} </div>
    //             </div>
    //             <div className="row">
    //                 <div className="col-5 col-lg-4">Descripción:</div>
    //                 <div className="col-7 col-lg-8"> {props.description}</div>
    //             </div>
    //             <div className="row">
    //                 <div className="col-5 col-lg-4">Urgencia:</div>
    //                 <div className="col-7 col-lg-8"> {props.urgency ? 'Si' : 'No' }</div>
    //             </div>
    //             <div className="row">
    //                 <div className="col-5 col-lg-4">Estado:</div>
    //                 <div className="col-7 col-lg-8 font-weight-bold"> {props.state}</div>
    //             </div>
    //             <div className="row">
    //                 <div className="col-5 col-lg-4">Cantidad:</div>
    //                 <div className="col-7 col-lg-8"> {props.quantity} </div>
    //             </div>
    //             <div className="row">
    //                 <div className="col-5 col-lg-4">Precio:{props.price}</div>
    //                 <div className="col-7 col-lg-8">Precio total: {props.totalPrice} </div>
    //             </div>
    //             <div className="row">
    //                 <div className="col-12">Comentarios:</div>
    //                 <div className="col-12">{props.comment} </div>
    //             </div>
                
    //             <div className="row">
    //                 <div className="col-11 my-2">
    //                     <Button  active={props.active} onClick={(e)=>{props.onChangeState(props.i)}} className="btn btn-sm mr-2 btn-success">Autorizado</Button>
    //                     {props.active && <Check color="action" />}
    //                     {/* <button onClick={(e)=>{props.onChangeState("rechazado",props.i)}} className="btn btn-sm mr-2 btn-danger">r</button> */}
    //                 </div>
    //             </div>
                
    //                 {/* <button onClick={props.handler}/> */}
                
    //         </div>
    //     </div>
    // </div>

  );
};

export default ItemApproveBudget;