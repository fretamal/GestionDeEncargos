T/PINGESO GAMAT
 
 ## Rutas Servicios
 
##Request
-Ejemplo JSON que se debe mandar(los demas datos se generan automaticamente en el back ):
{

    "observation": "velit adipisicing exercitation excepteur dolor ea"
    ,
    "items": [
      {
       
        "name": "item1",
        "description": "sit eiusmod do o121321fficia veniam voluptate",
        "price": 3141,
        "quantity": 75,
        "itemState":   
      {
        "idItemState": 2,
        "name": "pendiente",
        "date": null
    }
      },
       {
       
        "name": "item3",
        "description": "sit eiusmod do officia veniam volu11313123ptate",
        "price": 31,
        "quantity": 175,
        "itemState":   
       {
        "idItemState": 2,
        "name": "pendiente",
        "date": null
    }
      }
      , {
       
        "name": "item2",
        "description": "sit eiusmod do officia veniam v1321312luptate",
        "price": 41,
        "quantity": 5,
        "itemState":   
      {
        "idItemState": 2,
        "name": "pendiente",
        "date": null
    }
      }

    ]
  }
  
  -Ejemplo JSON de respuesta:
  
{
    "idRequest": 5,
    "state": "Pendiente por revisar",
    "observation": "velit adipisicing exercitation excepteur dolor ea",
    "date": "2018-11-23T06:05:18.434+0000",
    "user": {
        "idUser": 1,
        "email": "sebastian.pinto.g@usach.cl",
        "password": "1234",
        "nombre": "Soy un aprobador",
        "date": null,
        "roles": [
            {
                "idUserType": 1,
                "name": "aprobador",
                "date": null
            }
        ]
    },
    "building": {
        "idBuilding": 1,
        "address": "Direccion de obra1",
        "date": null
    },
    "items": [
        {
            "idItem": 3,
            "name": "item1",
            "price": 3141,
            "quantity": 75,
            "driver": null,
            "distributor": null,
            "itemState": {
                "idItemState": 2,
                "name": "pendiente",
                "date": null
            },
            "date": "2018-11-23T06:05:18.603+0000"
        },
        {
            "idItem": 4,
            "name": "item3",
            "price": 31,
            "quantity": 175,
            "driver": null,
            "distributor": null,
            "itemState": {
                "idItemState": 2,
                "name": "pendiente",
                "date": null
            },
            "date": "2018-11-23T06:05:18.749+0000"
        },
        {
            "idItem": 5,
            "name": "item2",
            "price": 41,
            "quantity": 5,
            "driver": null,
            "distributor": null,
            "itemState": {
                "idItemState": 2,
                "name": "pendiente",
                "date": null
            },
            "date": "2018-11-23T06:05:18.893+0000"
        }
    ]
}

(2) -/request/create/{idUser}/{idBuilding} (post) : crea una nueva request, con el estado pendiente por revisar
-/request/{idUser}/owned (get): lista las request de un determinado tipo de usuario (aprobador,jefe de obra,comprador)
(7)-/request/approve/{idRequest} (get) : se cambia estado de una determinada request a aprobado

-/request/update (put): actualiza una determinada request, recibe un objto request con los nuevos datos ( este servicio seria principalmente para el cambio de estado)

-/request/delete/{id} (delete) : elimina una detemrinada request 
**-/requests/{idUser}/manager (get) : se obtiene las requets creadas por un jefe de obra
**-/requests/{idUser}/approver (get) : se obtiene las requets asociadas a un aprobador
**-/requests/{idUser}/buyer (get) : se obtiene las requets asociadas un comprador

## Building
(5)-/buildings/{idAprobador} (get): retorna las obras asignadas a un aprobador
(6)-/buildings/requests/{id} (get) : obtener las request de una determinada obra 
-/buildings (get) : retorna todas las obras 

json:

  {
        "idBuilding": 1,
        "address": "Direccion de obra1",
        "date": null
    },
##User

(1) (4)-users/login (post) :recibe mail  y contraseña, para validar a un usuario

datos usuario aprobador :
email:sebastian.pinto.g@usach.cl
password:1234

datos usuario jefe de obra:
email:nicolas.roman@usach.cl
password:1234

ejemplo json :
{
    "idUser": 6,
    "email": "nicolas.roman@usach.cl",
    "password": "1234",
    "nombre": "Soy otro jefe de obra",
    "date": null,
    "roles": [
        {
            "idUserType": 2,
            "name": "jefe de obra",
            "date": null
        }
    ]
}

*demas usuarios se pueden ver en el import.sql (ubicado en resource)
##Budget
-/budgets/ (get) : retorna toda las cotizaciones
-/budgets/approved (get): retorna  coizaciones aprobadas 
-/budgets/create (post) : crear una nueva cotizacion  
-/budgets/driver/{id} (put): enviar contizacion a chofer
-/budgets/accept/{id} (put): aprobar cotizacion
-/budgets/{id} (get): obtener budget especifica por su id

##item-state
(2) -/item-states (get) : retorna los estados disponibles para items (este se debe usar para asignar estado inicial a los items)

ejemplo json:
 {
        "idItemState": 1,
        "name": "conforme",
        "date": null
    },
