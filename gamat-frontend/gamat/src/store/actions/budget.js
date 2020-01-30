import * as actionTypes from './actionTypes';
import axios from '../../axios-config';


export const fetchBudgets= () => {
    return dispatch => {
        dispatch(fetchRequestsStart());
        //Servicio para obtener todos los items de una Request
        axios.get('http://pingeso-back.herokuapp.com/budgets')
            .then( res => {
                const fetchedRequests = res.data;

    
                dispatch(fetchRequestsSuccess(fetchedRequests));
            } )
            .catch( err => {
                dispatch(fetchRequestsFail(err));
            } );
    };
};