import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';
import { removedToFalseRequest } from '../actions/requestActions';

const initialState = {
    budgets:[]
};



const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.FETCH_REQUESTS_START: return fetchRequestsStart( state, action );
        
        default: return state;
    }
};

export default reducer;