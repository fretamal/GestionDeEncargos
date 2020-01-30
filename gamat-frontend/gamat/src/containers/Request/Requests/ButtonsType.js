export const getButtonsType = (userType, state, id) => {
    let objectButtons = []

    objectButtons.push({
        type: 'info',
        path: `/view-request/${id}`,
        action: 'Ver'
    })
    // console.log(userType)
    if (userType === "Manager") getManagerType(objectButtons, state, id);

    else if (userType === "Buyer") getBuyerType(objectButtons, state, id);

    else if (userType === "Driver") getDriverType(objectButtons, state, id);

    else if (userType === "Approver") getApproverType(objectButtons, state, id);

    return objectButtons;
}

const getManagerType = (objectButtons, state, id) => {
    // console.log("llego aca 000")
    if (state === 'Entregada')
        objectButtons.push({
            type: 'success',
            path: `/deliver-to-approve/${id}`,
            action: 'Confirmar Recepcion'
        })

    if (state === 'Retirada')
        objectButtons.push({
            type: 'success',
            path: `/validation/${id}`,
            action: 'Validar Entrega'
        })


}


const getBuyerType = (objectButtons, state, id) => {



    if (state === 'Autorizada') {
       
        objectButtons.push({
            type: 'success',
            path: `/assing-driver/${id}`,
            action: 'Asignar Chofer'
        })

        objectButtons.push({
            type: 'primary',
            path: `/new-budget/${id}`,
            action: 'Editar'
        })

    }

    if (state === 'Cotizacion')
        objectButtons.push({
            type: 'primary',
            path: `/new-budget/${id}`,
            action: 'Editar'
        })


    if (state === 'Aprobado')
        objectButtons.push({
            type: 'success',
            path: `/new-budget/${id}`,
            action: 'Cotizar'
        })

}


const getDriverType = (objectButtons, state, id) => {
    // console.log("llego aca 222")
    if (state === 'Asignada')
        objectButtons.push({
            type: 'success',
            path: `/request-to-pick/${id}`,
            action: 'Retirar'
        })

    if (state === 'Retirada')
        objectButtons.push({
            type: 'success',
            path: `/request-to-deliver/${id}`,
            action: 'Entregar'
        })

}


const getApproverType = (objectButtons, state, id) => {
    // console.log("llego aca 333",state)
    if (state === 'Pendiente por revisar')
        // console.log("llego aca 333")
        objectButtons.push({
            type: 'success',
            path: `/approve-request/${id}`,
            action: 'Aprobar'
        })

        if (state === 'Cotizacion')
        objectButtons.push({
            type: 'success',
            path: `/approve-budget/${id}`,
            action: 'Aprobar Cotizacion'
        })

}