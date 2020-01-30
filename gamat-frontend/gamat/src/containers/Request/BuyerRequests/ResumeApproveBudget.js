import React from 'react';

const ResumeBudget = props => {
    return (
        <div className="pl-3">
                <div className="card card-budget-request item-card">
                    <div className="card-body">
                        <div className="d-flex justify-content-between">
                            <h5>Solicitud</h5>
                        </div>
                        <p><strong>Numero:</strong> {props.request.idRequest}</p>
                        <p><strong>Fecha:</strong> {props.request.date}</p>
                        <p><strong>Lugar de Entrega:</strong> {props.request.building.address} </p>
                        <p><strong>Receptor:</strong> {props.request.manager.name} </p>
                        <p><strong>Contacto:</strong> {props.request.manager.email}</p>
                        <p><strong>Hora de Entrega:</strong> {props.hora} </p>
                        <p><strong>Condicion de Pago:</strong> {props.payCondition} </p>
                        <p><strong>Vence:</strong> {props.expiration}</p>
                    </div>
                </div>
                <br/>
                <div className="card card-budget-request item-card"> 
                    <div className="card-body">
                        <div className="d-flex justify-content-between">
                            <h5>Cotización</h5>
                        </div>
                        <p><strong>Numero:</strong> </p>
                        <p><strong>Peso Total:</strong> {props.totalWeight}</p>
                        <p><strong>Precio por Despacho:</strong> ${props.shipping_price}</p>
                        <p><strong>Precio por Administración:</strong> ${props.administration_price}</p>
                        <p><strong>Valor Neto:</strong> ${props.total_price}</p>
                        <p><strong>IVA: 19%</strong></p>
                        <p><strong>VALOR TOTAL: ${props.true_price}</strong></p>
                    </div>
                </div> 
                <br/>
            </div>
    );
};

ResumeBudget.propTypes = {
    
};

export default ResumeBudget;