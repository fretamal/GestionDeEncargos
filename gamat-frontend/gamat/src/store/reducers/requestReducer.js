import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';
import { removedToFalseRequest, fetchDriverSuccess } from '../actions/requestActions';

const initialState = {
    requests: [],
    removed: false,
    userType: null,
    userId: null,
    error: null,
    loading: false,
    requestSent: false,
    requestRemoved: false,
    requestApprove:false,
    requestReject:false,
    //cuando se modifique la bd esto se modificara 
    budgetSuccess:false,
    budgetApproveSuccess:false,
    budgetRejectSuccess:false,
    drivers:[],
    assingDriver:false,
    updateItemSuccess:false,
    successAction: false,
    typeAlert:'',
    textAlert:'',
    errorAction:false
};

const addRequestsStart = ( state, action ) => {
    return updateObject( state, { 
        loading: true 
    } );
};

const addRequestsSuccess = ( state, action ) => {
    //const newOrder = updateObject( action.requestId, { id: action.requestId } );
 
    return updateObject( state, {
        loading: false,
        requestSent: true,
        successAction:true,
        textAlert:action.text,
        typeAlert:action.typeAlert
    } );
};

const addRequestsFail = ( state, action ) => {
    return updateObject( state, { 
        loading: false, 
        error: action.error 
    } );
};

const removeRequestsStart = ( state, action ) => {
    return updateObject( state, { 
        loading: true 
    } );
};

const removeRequestsSuccess = ( state, action ) => {
    return updateObject( state, {
        loading: false,
        requestRemoved: true,
    } );
};

const removeRequestsFail = ( state, action ) => {
    return updateObject( state, { 
        loading: false, 
        error: action.error 
    } );
};


const fetchRequestsStart = ( state, action ) => {
    return updateObject( state, { loading: true } );
};

const fetchRequestsSuccess = ( state, action ) => {
    return updateObject( state, {
        requests: action.requests.reverse(),
        loading: false,
        requestSent:false,
        budgetSuccess:false,
        budgetApproveSuccess:false,
        budgetRejectSuccess:false,
        assingDriver:false,
        updateItemSuccess:false,
        requestApprove:false
    } );
};

const fetchRequestsFail = ( state, action ) => {
    return updateObject( state, { loading: false } );
};

const removedToFalse= ( state, action) =>{
    return updateObject( state, { 
        requestRemoved: false
    } );
};
const falseRequest= ( state, action) =>{
    return updateObject( state, { 
        requestApprove:false,
        requestReject:false
    } );
};

const approveRequest = (state,action) =>{
    return updateObject(state,{
        requestApprove:true,
        successAction:true,
        textAlert:action.text,
        typeAlert:action.typeAlert
    })
}

const rejectRequest = (state,action) =>{
    return updateObject(state,{
        requestReject:true
    })
}

const budgetSuccess= (state,action) =>{
    return updateObject(state,{
        budgetSuccess:true,
        successAction:true,
        textAlert:action.text,
        typeAlert:action.typeAlert
    })
}

const budgetApproveSuccess= (state,action)=>{
    return updateObject(state,
        {budgetApproveSuccess:true,
            successAction:true,
        textAlert:action.text,
        typeAlert:action.typeAlert
        
        })
}

const budgetRejectSuccess= (state,action)=>{
    return updateObject(state,{budgetRejectSuccess:true})
}

const driverSuccess=(state,action)=>{
   
    return updateObject(state,{drivers:action.drivers})
}

const assingDriverSuccess = (state,action)=>{
    return updateObject(state,{
        assingDriver:true,
        successAction:true,
        textAlert:action.text,
        typeAlert:action.typeAlert
    })
}

const updateItemsOk= (state,action)=>{
    return updateObject(state,
        {updateItemSuccess:true,
            successAction:true,
        textAlert:action.text,
        typeAlert:action.typeAlert
        
        })
}

const closeAlert = (state,action) =>{
    return updateObject(state,{successAction:false})
}

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.FETCH_REQUESTS_START: return fetchRequestsStart( state, action );
        case actionTypes.FETCH_REQUESTS_SUCCESS: return fetchRequestsSuccess( state, action );
        case actionTypes.FETCH_REQUESTS_FAIL: return fetchRequestsFail( state, action );
        case actionTypes.FECTH_APPROVE_SUCCESS: return approveRequest(state,action);
        case actionTypes.FECTH_REJECT_SUCCESS: return rejectRequest(state,action);
        case actionTypes.ADD_REQUESTS_START: return addRequestsStart( state, action );
        case actionTypes.ADD_REQUESTS_SUCCESS: return addRequestsSuccess( state, action );
        case actionTypes.ADD_REQUESTS_FAIL: return addRequestsFail( state, action );
        case actionTypes.REMOVE_REQUESTS_START: return removeRequestsStart( state, action );
        case actionTypes.REMOVE_REQUESTS_SUCCESS: return removeRequestsSuccess( state, action );
        case actionTypes.REMOVE_REQUESTS_FAIL: return removeRequestsFail( state, action );
        case actionTypes.REMOVED_TO_FALSE: return removedToFalse( state, action );
        case actionTypes.REMOVED_TO_FALSE_REQUEST: return falseRequest( state, action );
        case actionTypes.ADD_BUDGET_SUCCESS: return budgetSuccess(state,action);
        case actionTypes.FETCH_BUDGET_SUCCESS: return budgetApproveSuccess(state,action);
        case actionTypes.FETCH_BUDGET_REJECT: return budgetRejectSuccess(state,action);
        case actionTypes.FETCH_DRIVER_SUCCESS: return driverSuccess(state,action);
        case actionTypes.ASSING_DRIVER_SUCCESS: return assingDriverSuccess(state,action);
        case actionTypes.UPDATE_ITEMS_SUCCESS: return updateItemsOk(state,action);
        case actionTypes.DISMISS_ALERT: return closeAlert(state,action);
        default: return state;
    }
};

export default reducer;