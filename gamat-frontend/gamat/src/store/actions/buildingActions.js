import * as actionTypes from './actionTypes';
import axios from '../../axios-config';


export const fetchCompanySuccess = (companies) =>{
    return {
       type: actionTypes.FETCH_COMPANIES_SUCCESS,
       companiesData:companies
    }
}

export const addCompany = (newCompany) =>{
    return dispatch =>{
        axios.post('/companies/create',newCompany)
        .then(res=>{
            console.log(res)
            dispatch(fetchCompanies())
        })
        .catch(err=>{

        })
    }
}

export const deleteCompany = (idCompany) =>{
    return dispatch =>{
        axios.delete(`/companies/${idCompany}`)
        .then(res =>{
            dispatch(fetchCompanies())
        })
        .catch(err=>{

        })
    }
}



export const fetchCompanyStart=()=>{
    return {
        type: actionTypes.FETCH_COMPANY_START
    }
}

export const fetchCompanies= ()=>{
    return dispatch => {
        dispatch(fetchCompanyStart())
        axios.get('/companies/')
        .then(res =>{
            console.log("Comp",res)
            dispatch(fetchCompanySuccess(res.data))

        })
        .catch(err=>{

        })
    }
}

export const fetchBuildingsSuccess = (buildings) =>{
    return {
        type: actionTypes.FETCH_BUILDINGS_SUCCESS,
        buildingsData: buildings
    }
}

export const fetchBuildingStart = () =>{
    return {
        type:actionTypes.FETCH_BUILDING_START
    }
}

export const fetchBuildings= (idCompany) =>{
    return dispatch =>{
        dispatch(fetchBuildingStart())
        axios.get(`/buildings/${idCompany}`)
        .then(res=>{
            console.log(res.data)
            dispatch(fetchBuildingsSuccess(res.data))
        })
        .catch(err=>{

        })
    }
}

export const addBuilding= (newBuilding,idCompany) =>{
    return dispatch =>{
        axios.post(`/buildings/${idCompany}`,newBuilding)
        .then(res =>{
            console.log(res)
            dispatch(fetchBuildings(idCompany))

        })
        .catch(err=>{

        })
    }
}

export const deleteBuilding = (idBuilding,idCompany) =>{
    return dispatch =>{
        axios.delete(`/buildings/${idBuilding}`)
        .then(res=>{
            dispatch(fetchBuildings(idCompany))
        })
        .catch(err =>{

        })
    }
}
