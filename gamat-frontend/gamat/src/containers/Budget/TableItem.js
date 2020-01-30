import React from 'react';
// import PropTypes from 'prop-types';
import {Button,Table} from 'reactstrap'

const TableItem = props => {
    return (     
        <table className="table table-sm table-primary table-responsive-lg w-100">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Nombre</th>
                    <th>Cant.</th>
                    <th>Urg.</th>
                    <th>Descripción</th>
                    <th>Proveedor</th>
                    <th>Precio</th>
                    <th>Precio Total</th>
                    <th>Estado</th>
                    <th>Comentario</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>

                {/*Aqui, la funcion de arriba deberia guardar todo en testrequest, y mostrarlo.*/}
                {props.items.map((item, index) => (
                    item.state !== "rechazado" &&
                    <tr key={index}>
                        <th scope="row">{item.idItem}</th>
                        <td>{item.name}</td>
                        <td>{item.quantity}</td>
                        <td>{item.urgency ? "Si":"No"}</td>
                        <td>{item.description}</td>
                        <td>{item.distributor}</td>
                        <td>{item.price}</td>
                        <td>{item.totalPrice}</td>
                        <td>{item.state}</td>
                        <td>{item.comments}</td>
                        <td>
                            {/* <div > */}
                            {/* <button className="btn btn-sm btn-info" onClick={(e)=>props.onSeeItem(index)}>Ver</button> */}
                            <button className={props.editItems[index] ? 'btn btn-sm ml-1 btn-primary':'btn btn-sm ml-1 btn-success'} onClick={(e)=>props.openAddItem(index)}>
                            {props.editItems[index] ? 'Editar':'Cotizar'}
                            </button>
                                {/* <AddItemtoBudget cantidad={this.props.datosRequest.quantity} onAddItem={(e) => this.addItemHandler(e)} /> */}
                                {/*Cuando se crea una budget, deberia poder ver su budget a partir de un botn.*/}
                                {/* <SeeBudgetforItem datos={this.state.budgetItem} funcion={this.displayCollapse}></SeeBudgetforItem> */}
                            
                            {/* </div> */}

                        </td>

                    </tr>


                ))}
            </tbody>
        </table>
        
    );
};

TableItem.propTypes = {

};

export default TableItem;