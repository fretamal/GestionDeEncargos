import * as actionTypes from './actionTypes';
import axios from '../../axios-config';

export const addRequestsSuccess = (id, requestData) => {
 
    return {
        type: actionTypes.ADD_REQUESTS_SUCCESS,
        requestId: id,
        requestData: requestData,
        text: "Solicitud creada correctamente",
        typeAlert: "success"
    };
};
export const  addBudgetsSuccess=(id, requestData) =>{
    return {
        type: actionTypes.ADD_BUDGET_SUCCESS,
        text: "Cotizacion creada correctamente",
        typeAlert: "success"
    };
};

 export const approveBudgetSuccess=()=>{
     return {
         type: actionTypes.FETCH_BUDGET_SUCCESS,
         text: "Cotizacion aprobada correctamente",
        typeAlert: "success"
     }
 }

 export const rejectBudgetSuccess=()=>{
    return {
        type: actionTypes.FETCH_BUDGET_REJECT
    }
}


export const addRequestsFail = (error) => {
    return {
        type: actionTypes.ADD_REQUESTS_FAIL,
        error: error
    };
}

export const addRequestsStart = () => {
    return {
        type: actionTypes.ADD_REQUESTS_START
    };
};

export const removeRequestsStart = () => {
    return {
        type: actionTypes.REMOVE_REQUESTS_START
    };
};

export const removeRequestsSuccess = (requestId) => {
    return {
        type: actionTypes.REMOVE_REQUESTS_SUCCESS,
        requestId: requestId
    };
};

export const removeRequestsFail = (error) => {
    return {
        type: actionTypes.REMOVE_REQUESTS_FAIL,
        error: error
    };
}

export const fetchRequestsSuccess = (requests) => {
    return {
        type: actionTypes.FETCH_REQUESTS_SUCCESS,
        requests: requests
    };
};



export const fetchRequestsFail = (error) => {
    return {
        type: actionTypes.FETCH_REQUESTS_FAIL,
        error: error
    };
};

export const fetchRequestsStart = () => {
    return {
        type: actionTypes.FETCH_REQUESTS_START
    };
};

export const approveSuccess = () =>{
    return {
        type: actionTypes.FECTH_APPROVE_SUCCESS,
        text: "Solicitud aprobada correctamente",
        typeAlert: "success"
    }
}

export const rejectSuccess = () =>{
    return {
        type: actionTypes.FECTH_REJECT_SUCCESS
    }
}

export const removedToFalse = () => {
    return {
        type: actionTypes.REMOVED_TO_FALSE
    };
};

export const removedToFalseRequest = () => {
    return {
        type: actionTypes.REMOVED_TO_FALSE_REQUEST
    };
};

export const dismissAlert= ()=>{
    return {
        type: actionTypes.DISMISS_ALERT
    }
}

export const addRequest = (requestData, userId) => {

    return dispatch => {
        dispatch(addRequestsStart());
       
        axios.post('/requests/create/' + userId, requestData)
            .then(response => {
               
                dispatch(addRequestsSuccess(response.data.idRequest, requestData));
            })
            .catch(error => {
              
                dispatch(addRequestsFail(error));
            });
    };
};


export const addBudget = (userId,budgetData) => {

    return dispatch => {
        // budgetData.manager = null;
        // budgetData.building= null;
        dispatch(addRequestsStart());
        axios.post('/requests/budget/' + userId, budgetData)
            .then(response => {
                dispatch(addBudgetsSuccess(response.data.idRequest, budgetData));
            })
            .catch(error => {
                // dispatch(addRequestsFail(error));
            });
    };
};

export const fetchDriverS = (drivers) => {
    return {
        type: actionTypes.FETCH_DRIVER_SUCCESS,
        drivers:drivers
    };
};

export const assingSuccess = ()=>{
    return {
        type: actionTypes.ASSING_DRIVER_SUCCESS,
        text: "Chofer  asignado correctamente",
        typeAlert: "success"
    }
}

export const updateItemSuccess=() =>{
    return {
        type: actionTypes.UPDATE_ITEMS_SUCCESS,
        text: "Estado de items modificado correctamente",
        typeAlert: "success"
    }
}

export const fetchRequests = (userId, userType,state) => {
    return dispatch => {
        let ruta = ''
        // console.log("userType",userType)
        userType === "Approver" ?
            ruta = `/requests/${userId}/${state}/approver` :
        userType === "Manager" ?
            ruta = `/requests/${userId}/manager`:
        userType === "Buyer"? 
            state == 0 ?  ruta = `/requests/${userId}/all/buyer`:
            ruta = `/requests/${userId}/${state}/buyer`:
            ruta = `/requests/${userId}/driver`;   
        // console.log('id de user es ',userId)
       
        dispatch(fetchRequestsStart());
        axios.get(ruta)
            .then(res => {
                const fetchedRequests = res.data;
                // console.log("respuesta",res.data)
                dispatch(fetchRequestsSuccess(fetchedRequests));
            })
            .catch(err => {
                dispatch(fetchRequestsFail(err));
            });
    };
};

export const removeRequests = (requestId) => {
    return dispatch => {
        dispatch(removeRequestsStart());
        axios.delete('/requests/delete/' + requestId)
            .then(res => {
               
                dispatch(removeRequestsSuccess(requestId));
            })
            .catch(err => {
                dispatch(removeRequestsFail(err));
            });
    };
};

export const fetchApproveRequests = (requestId,request) =>{
    return dispatch => {
        // request.manager = {idUser:request.manager};
        // request.building= {idBuilding: request.building};
      
    axios.post(`/requests/approve/${requestId}`,request)
        .then(res =>{
            
            dispatch (approveSuccess());
        })
        .catch(err =>{
            console.log('error',err)
        })

    }

}

export const fetchRejectRequests = (requestId,request) =>{
    return dispatch => {
    axios.post(`requests/reject/${requestId}`,request)
        .then(res =>{
            console.log("rechazada",res)
            dispatch (rejectSuccess());
        })
        .catch(err =>{
            console.log('error',err)
        })

    }

}
export const removedFalseRequest = () => {
    return dispatch => {
        dispatch(removedToFalseRequest());
    };
};

export const fetchApproveBudget = (requestId,request) =>{
    return dispatch => {
        // request.manager = {idUser:request.manager};
        // request.building= {idBuilding: request.building};
    axios.post(`/requests/budget/approve`,request)
        .then(res =>{
            console.log("aprobada",res)
            dispatch (approveBudgetSuccess());
        })
        .catch(err =>{
            console.log('error',err)
        })

    }

};

export const fetchRejectBudget = (requestId,request) =>{
    return dispatch => {
       
    axios.post(`requests/budget/reject/${requestId}`,request)
        .then(res =>{
            console.log("rechazada",res)
            dispatch (rejectBudgetSuccess());
        })
        .catch(err =>{
            console.log('error',err)
        })

    };
}

export const fetchDriver= () =>{
    return dispatch => {
        
    axios.get(`/drivers`)
        .then(res =>{
            console.log(res.data)
            dispatch (fetchDriverS(res.data));
        })
        .catch(err =>{
            console.log('error',err)
        })

    }

}

export const assingDriver= (idDriver,idRequest) =>{
    return dispatch=>{
        axios.put(`/requests/driver/${idDriver}/${idRequest}`)
            .then(res =>{
                dispatch(assingSuccess())
            })
            .catch(err => {
                console.log('error',err)
            })

    }
}

export const updateItems=(request,type,userId)=>{
    return dispatch=>{
        console.log(request)
        // request.manager = {idUser:request.manager};
        // request.building= {idBuilding: request.building};
        // request.driver={idUser: request.driver};
        axios.post(`/requests/update-items/${userId}/${type}`,request)
        .then(res =>{ 
            dispatch(updateItemSuccess())
        })
        .catch(err => {
            console.log('error',err)
        })
    }
}

export const removedFalse = () => {
    return dispatch => {
        dispatch(removedToFalse());
    };
};


export const onDismissAlert = () =>{
    return dispatch =>{
        dispatch(dismissAlert())
    }
}
