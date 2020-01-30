import React from 'react';
import { Card,CardBody,CardHeader,Collapse } from 'reactstrap';
// import PropTypes from 'prop-types';

const SeeBudgetforItem = props => {
    return (
        <Card outline color="info">
            <CardHeader>
                Descripción del Item
        </CardHeader>

            <Collapse isOpen={props.estadocolapso}>

                <CardBody>
                    <div className="row">
                    {props.item.price &&
                        <div className="col-6">
                            Precio Unitario: {props.item.price}
                        </div>
                    }

                    {props.item.weight &&
                        <div className="col-6">
                            Precio Total: {props.item.weight}
                        </div>
                    }
                    </div>
                    <div className="row">
                        {/* <div className="col-12">
                            Estado: {props.item.estado}
                        </div> */}
                        {props.item.distributor && 
                        <div className="col-12">
                            Proveedor: {props.item.distributor}
                        </div>
                        }
                        {props.item.comments &&
                        <div className="col-12">
                            Comentarios: {props.item.comments}
                        </div>
                        }
                    </div>

                </CardBody>
            </Collapse>

        </Card>
    );
};


export default SeeBudgetforItem;