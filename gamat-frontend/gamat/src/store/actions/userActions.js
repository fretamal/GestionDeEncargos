import * as actionTypes from './actionTypes';
import axios from '../../axios-config';

export const fetchSuccessUsers = (users) =>{
    return{
        type:actionTypes.FETCH_SUCCESS_USERS,
        usersData:users
    }
}

export const addUserSuccess = (user)=>{
    return {
        type: actionTypes.ADD_USER_SUCCESS,
        userData:user
    }
}

export const fetchUsersStart = ()=>{
    return {
        type: actionTypes.ADD_USER_START
    }
}

export const fetchUsers = () =>{
    return dispatch =>{
        dispatch(fetchUsersStart())
        axios.get('/users/')
        .then(res=>{
            console.log(res)
            dispatch(fetchSuccessUsers(res.data))
        })
        .catch(err=>{

        })



    }
}

export const updateAssingApprover=(approver) =>{
    return dispatch =>{
        axios.put(`/users/assingApprover`,approver)
        .then(res =>{
            console.log (res)
            dispatch(fetchUsers())
        })
        .catch(err=>{
            console.log (err)

        })
    }
}

export const addUser = (user) =>{
    return dispatch =>{
        axios.post(`/users/create${user.role}`,user)
        .then(res =>{
            console.log (res)
            dispatch(fetchUsers())
        })
        .catch(err=>{

        })
    }
}

export const deleteUser = (idUser)=>{
    return dispatch=>{
        axios.delete(`/users/${idUser}`)
        .then(res=>{
            dispatch(fetchUsers())
        })
        .catch(err=>{
            
        })
    }
}


