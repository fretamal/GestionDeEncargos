import React from 'react';
import PropTypes from 'prop-types';
import { getButtonsType } from './ButtonsType';
import {Button} from 'reactstrap';
import {Link} from 'react-router-dom'

const ButtonsRequest = props => {

    let buttonOption = getButtonsType(props.userType,props.state,props.id)
    const buttons =buttonOption.map((bt,i)=>(
        <Link  key ={i} to={{ pathname: bt.path}}>
        <Button className={`btn btn-sm mr-1 btn-${bt.type}`} id="retirarr">{bt.action}</Button>
      </Link>

    ))
    return (
        <div className="d-flex justify-content-center justify-content-lg-start flex-wrap">

            {buttons}
        </div>
        
    );
};

ButtonsRequest.propTypes = {
    
};

export default ButtonsRequest;