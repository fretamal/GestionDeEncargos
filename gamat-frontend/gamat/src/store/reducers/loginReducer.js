import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    userType: null,
    userId: null,
    loading: false,
    error: null,
    
};

const fetchLoginStart = ( state, action ) => {
    return updateObject( state , { loading: true } );
};

const fetchLoginSuccess = ( state, action ) => {
    return updateObject( state , { 
        loading: false,
        error: null,
        userType: action.userType,
        userId: action.userId
     } );
};

const fetchLoginFail = ( state, action ) => {
    return updateObject( state , { 
        loading: false,
        error: action.error
    } );
};

const fetchLogout = (state, action) => {
    return updateObject(state, { userType: null,userId: null, loading:false, error:null});
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.LOGIN_START: return fetchLoginStart( state, action);
        case actionTypes.LOGIN_SUCCSESS: return fetchLoginSuccess( state, action);
        case actionTypes.LOGIN_FAIL: return fetchLoginFail( state, action);
        case actionTypes.LOGIN_LOGOUT: return fetchLogout( state, action);
        default: return state;
    }
};

export default reducer;