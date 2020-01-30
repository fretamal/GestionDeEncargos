import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    // buildings: [],
    // companies:[],
    users:[],
    loading:false
    
};

const addUserStart = ( state, action ) => {
    return updateObject( state, { 
        loading: true 
    } );
};



const fetchUsersSuccess= (state,action) =>{
    return updateObject(state,{
        users:action.usersData,
        loading:false
    })
}

const addSuccessUser = (state,action ) =>{
    return updateObject(state,{
        
    })
}

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.FETCH_SUCCESS_USERS: return  fetchUsersSuccess(state,action);
        case actionTypes.ADD_USER_SUCCESS: return addSuccessUser(state,action);
        case actionTypes.ADD_USER_START: return addUserStart(state,action);
       
        default: return state;
    }
};

export default reducer;