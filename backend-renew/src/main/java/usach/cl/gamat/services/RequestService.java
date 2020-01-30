package usach.cl.gamat.services;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.pdmodel.PDPageContentStream;
import org.apache.pdfbox.pdmodel.encryption.InvalidPasswordException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import usach.cl.gamat.entities.*;
import usach.cl.gamat.facadeBD.IServiceBD;
import usach.cl.gamat.serviceMail.IServiceMail;

import javax.validation.constraints.Null;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@CrossOrigin
@RestController
@RequestMapping("/requests")
public class RequestService {
    @Autowired
    private IServiceBD serviceBD;
    
    @Autowired
    private IServiceMail mailService;

    @GetMapping("/")
    @ResponseBody
    public List<Request> getAllRequest(){return (List<Request>) serviceBD.findAllRequest();}

    @GetMapping("/{idRequest}")
    @ResponseBody
    public Request getRequest(@PathVariable("idRequest") Integer id){
        return serviceBD.getRequestById(id);
    }
    //Crear Request
    @PostMapping("/create/{idUser}")
    @ResponseBody
    public Request createRequest(@RequestBody Request request, @PathVariable("idUser") Integer idUser) {
        if(request != null) {
            Manager user = serviceBD.getManagerById(idUser);
            Building building = user.getBuilding();
            System.out.println("NOMBREE");
            System.out.println(building.getAddress());
            
            request.setBuilding(building);
            request.setManager(user);
            request.setState("Pendiente por revisar");
            Request newRequest= serviceBD.saveRequest(request);
            String emailAprobador = building.getApprover().getEmail();
            Integer idRequest= newRequest.getIdRequest();
            
            mailService.sendMailNotification(
            		emailAprobador,"Nueva solicitud para aprobar",
            		"Se creo una nueva solicitud para aprobar.\n"
            		+ "Datos:\n"
            		+ "Obra:"+building.getAddress()+"\n"
            		+ "Compañia:"+building.getCompany().getName()+"\n"
            		+ "Jefe de Obra:"+user.getName()+"\n",
            		"approve-request/"+newRequest.getIdRequest()+"/notf");
            // datos aprobador
            //mailService.sendMailNotification("", "", "");
            return newRequest;
        }
        return null;

    }

    //Crear Request
    @PostMapping("/create")
    @ResponseBody
    public Request createRequestTest(@RequestBody Request request) {
        if(request != null) {
            request.setState("Pendiente por revisar");
            Request newRequest= serviceBD.saveRequest(request);
            // datos aprobador
            //mailService.sendMailNotification("", "", "");
            
            return newRequest;
        }
        return null;

    }
    //Aprobar request
    @PostMapping("/approve/{idRequest}")
    public HttpStatus aprobarRequest(@PathVariable("idRequest") Integer id,@RequestBody Request request) {
		Request request1 = serviceBD.getRequestById(id);
        if (request != null) {
//        	request.setBuilding(request1.getBuilding());
//        	request.setManager(request1.getManager());
//        	request.setDriver(request1.getDriver());
            request.setState("Aprobado");
            System.out.println("llegue aca");
            Log log = new Log(request.getState(), request);
            serviceBD.saveLog(log);
            serviceBD.saveRequest(request);
           List<Buyer> compradores= serviceBD.findAllBuyer();
           for (Buyer buyer : compradores) {
			
        	   mailService.sendMailNotification(
        			   buyer.getEmail(),"Nueva solicitud lista para ser cotizada",
        			   "Se aprobo la siguiente solicitud.\n"
        					   + "Datos:\n"
        					   + "Obra:"+request.getBuilding().getAddress()+"\n"
        					   + "Compañia:"+request.getBuilding().getCompany().getName()+"\n"
        					   + "Jefe de Obra:"+request.getManager().getName()+"\n",
        					   "new-budget/"+request.getIdRequest()+"/notf");
		}
            
           
            return HttpStatus.OK;
        }
        return HttpStatus.INTERNAL_SERVER_ERROR;
    }
    
    
    @PostMapping("/update-items/{idUser}/{type}")
    public HttpStatus updateItems(@PathVariable("idUser") Integer id,@PathVariable("type") Integer type,@RequestBody Request request) {
//		Request request1 = serviceBD.getRequestById(request.getIdRequest());
    	Driver driver=serviceBD.getDriverById(id);
    	String state="Retirada";
    	String email ="";
    	String ruta="";
    	switch (type) {
		case 0:
			state="Retirada";
			email = request.getManager().getEmail();
			ruta = "view-request/";
			break;
		case 1:
			state="Entregada";
			email = request.getManager().getEmail();
			ruta= "deliver-to-approve/";
			break;
		case 2:
			state="Recibida";
			// se debe definir coo se hara par aavisar al comprador
			email = request.getManager().getEmail();
			ruta = "view-request/";
			break;	

		default:
			break;
		}
        if (request != null) {
            request.setState(state);
            request.setDriver(driver);
//            request.setBuilding(request1.getBuilding());
//        	request.setManager(request1.getManager());
            Log log = new Log(request.getState(), request);
            serviceBD.saveLog(log);
            serviceBD.saveRequest(request);
            
            mailService.sendMailNotification(
     			   email,"Actualizacion de solicitud en proceso",
     			   "Se actualizo el estado de la siguiente solicitud.\n"
     					   + "Datos:\n"
     					   + "Obra:"+request.getBuilding().getAddress()+"\n"
     					   + "Compañia:"+request.getBuilding().getCompany().getName()+"\n"
     					   + "Jefe de Obra:"+request.getManager().getName()+"\n",
     					   ruta+request.getIdRequest()+"/notf");
            
            return HttpStatus.OK;
        }
        return HttpStatus.INTERNAL_SERVER_ERROR;
    }

    //Aprobar request
    @PostMapping("/budget/approve")
    public HttpStatus aprobarBudget(@RequestBody Request request) {
//		Request request1 = serviceBD.getRequestById(request.getIdRequest());
        Request nuevaRequest = new Request();
        List<Item> itemPendientes = new ArrayList<>();
        List<Item> itemAprobados = new ArrayList<>();
        if (request != null) {
//        	request.setBuilding(request1.getBuilding());
//        	request.setManager(request1.getManager());
            request.setState("Autorizada");
            for (Item item:request.getItems()){
                if (item.getState().equals("no autorizado")){
                	Item newItem = new Item ();
                	newItem.setComment(item.getComment());
                	newItem.setDescription(item.getDescription());
                	newItem.setDistributor(item.getDistributor());
                	newItem.setMeasure(item.getMeasure());
                	newItem.setObservation(item.getObservation());
                	newItem.setPrice(item.getPrice());
                	newItem.setName(item.getName());
                	newItem.setQuantity(item.getQuantity());
                	newItem.setState("Aprobado");
                	newItem.setTotalPrice(item.getTotalPrice());
                	newItem.setTotalWeight(item.getTotalWeight());
                	newItem.setWeight(item.getWeight());
                	newItem.setUrgency(item.isUrgency());
                	itemPendientes.add(newItem);
                }
                else{
                    itemAprobados.add(item);
                }
            }
            if(itemPendientes.size() > 0){
                
            	nuevaRequest.setItems(itemPendientes);
                nuevaRequest.setState("Aprobado");
                nuevaRequest.setManager(request.getManager());
                nuevaRequest.setDriver(request.getDriver());
                nuevaRequest.setBuilding(request.getBuilding());
                nuevaRequest.setObservation("Solicitud creada debido a item rechazados de otra: " + request.getObservation());
                nuevaRequest.setPayCondition(request.getPayCondition());
                Log log2 = new Log(nuevaRequest.getState(), nuevaRequest);
                serviceBD.saveLog(log2);
                serviceBD.saveRequest(nuevaRequest);
            }
           
            request.setItems(itemAprobados);
            Log log = new Log(request.getState(), request);
            serviceBD.saveLog(log);
            serviceBD.saveRequest(request);
            List<Buyer> compradores= serviceBD.findAllBuyer();
            for (Buyer buyer : compradores) {
            	
            	
            	
            	mailService.sendMailNotification(
            			buyer.getEmail(),"Cotizacion aprobada",
            			"Se aprobo la siguiente cotizacion.\n"
            					+ "Datos:\n"
            					+ "Obra:"+request.getBuilding().getAddress()+"\n"
            					+ "Compañia:"+request.getBuilding().getCompany().getName()+"\n"
            					+ "Jefe de Obra:"+request.getManager().getName()+"\n",
            					"assing-driver/"+request.getIdRequest()+"/notf");
            	
            }
            
            return HttpStatus.OK;
        }
        return HttpStatus.INTERNAL_SERVER_ERROR;
    }
    //Rechazar budget
    @PostMapping("/budget/reject/{idRequest}")
    public HttpStatus rechazarBudget(@PathVariable("idRequest") Integer id,@RequestBody Request request) {
//		Request request = serviceBd.getRequestById(id);
        if (request != null) {
            request.setState("Rechazada");
            Log log = new Log(request.getState(), request);
            serviceBD.saveLog(log);
            serviceBD.saveRequest(request);
            return HttpStatus.OK;
        }
        return HttpStatus.INTERNAL_SERVER_ERROR;
    }
    //Cotizar request
    @PostMapping("/budget/{idRequest}")
    public HttpStatus cotizarRequest(@PathVariable("idRequest") Integer id,@RequestBody Request request) {
		Request request1 = serviceBD.getRequestById(request.getIdRequest());
        if (request != null) {
            request.setState("Cotizacion");
            request.setBuilding(request1.getBuilding());
            request.setManager(request1.getManager());
            Log log = new Log(request.getState(), request);
            serviceBD.saveLog(log);
            serviceBD.saveRequest(request);
            
            

        	mailService.sendMailNotification(
        			request.getBuilding().getApprover().getEmail(),"Cotizacion creada",
        			"Se creo una nueva cotizacion.\n"
        					+ "Datos:\n"
        					+ "Obra:"+request.getBuilding().getAddress()+"\n"
        					+ "Compañia:"+request.getBuilding().getCompany().getName()+"\n"
        					+ "Jefe de Obra:"+request.getManager().getName()+"\n",
        					"approve-budget/"+request.getIdRequest()+"/notf");
            
            return HttpStatus.OK;
        }
        return HttpStatus.INTERNAL_SERVER_ERROR;
    }

    //Rechazar Request
    @PostMapping("/reject/{idRequest}")
    public HttpStatus rechazarRequest(@PathVariable("idRequest") Integer id,@RequestBody Request request) {
//		Request request = serviceBd.getRequestById(id);
        if (request != null) {
            request.setState("Cancelada");
            Log log = new Log(request.getState(), request);
            serviceBD.saveLog(log);
            serviceBD.saveRequest(request);
            return HttpStatus.OK;
        }
        return HttpStatus.INTERNAL_SERVER_ERROR;
    }


    /*//Método para el comprador
    @RequestMapping(value = "/", method = RequestMethod.GET)
    @ResponseBody
    public Iterable<Request> getAllRequests(){
        return serviceBd.findAllRequest();
    }*/

    //Request de un jefe de obra
    @GetMapping("/{idUser}/manager")
    @ResponseBody
    public List<Request> getRequestJefeObra(@PathVariable("idUser") Integer id){
        Manager user = serviceBD.getManagerById(id);
        Iterable<Request> requests = serviceBD.findAllRequest();
        List<Request> createdRequests = new ArrayList<>();
        for (Request request:requests){
            if(request.getManager() == user){
                createdRequests.add(request);
            }
        }
        return createdRequests;

    }
    //Request visibles por aprobador
    @GetMapping("/{idUser}/{state}/approver")
    @ResponseBody
    public List<Request> getRequestAprobador(
            @PathVariable("idUser") Integer id,
            @PathVariable("state") Integer state){
        String nameState;
        switch (state) {
	        case 0:
	        	nameState="";
	        	break;
            case 1:
                nameState="Pendiente por revisar";
                break;
            case 2:
                nameState="Aprobado";
                break;
            case 3:
                nameState="Cotizacion";
                break;
//            case 3:
//            	nameState="Entregada";
//            	break;

            default:
                nameState=null;
                break;
        }
        Approver user = serviceBD.getApproverById(id);
        List<Request> requests = new ArrayList<>();
        //for(UserType rol:user.getRoles()){
        //if(user.getRol().getIdUserType() == 1){
        if(nameState !="") {
        	
            for (Building building:user.getBuildings()){
                for(Request request : building.getRequests()) {
                	
                    if (request.getState().equals(nameState)){
                    	
                        requests.add(request);
                    }
                }
            }
        }else {
            for (Building building:user.getBuildings()){
                for(Request request : building.getRequests()) {
                	
                	
                    if (request.getState().equals("Aprobado") || request.getState().equals("Cotizacion")
                    		|| request.getState().equals("Pendiente por revisar")){
                    	
                        requests.add(request);
                    }
                }
            }
        	
        }
        //}
        //}
        return requests;
    }
    //Request visibles al comprador
    @GetMapping("/{idUser}/{state}/buyer")
    @ResponseBody
    public List<Request> getRequestComprador(@PathVariable("idUser") Integer id,@PathVariable("state") Integer state){
        Buyer user = serviceBD.getBuyerById(id);
        List<Request> requestsApprove = new ArrayList<>();
        Iterable<Request> requests = serviceBD.findAllRequest();

        //for(UserType rol:user.getRoles()){
        //if(user.getRol().getIdUserType() == 3){
        String nameState;
        switch (state) {
            case 1:
                nameState="Aprobado";
                break;
            case 2:
                nameState="Autorizada";
                break;
            case 3:
            	nameState="Cotizacion";
            	break;
            case 4:
            	nameState="Asignada";
            	break;
        

            default:
                nameState=null;
                break;
        }
            for (Request request:requests){

                //request.setManager(null);

                if (request.getState().equals(nameState) ){
                	//request.setBuilding(null);
                	
                    requestsApprove.add(request);
                }
            }
        //}
        //}
        return requestsApprove;
    }

    //Todas requests para comprador
    @GetMapping("/{idUser}/all/buyer")
    @ResponseBody
    public List<Request> getAllRequestBuyer(@PathVariable("idUser") Integer id){
        Buyer user = serviceBD.getBuyerById(id);
        List<Request> buyerRequests = new ArrayList<>();
        Iterable<Request> requests = serviceBD.findAllRequest();
        for (Request request:requests){
            if (request.getState().equals("Aprobado") || request.getState().equals("Autorizada") ||
                    request.getState().equals("Cotizacion") || request.getState().equals("Asignada")){
                buyerRequests.add(request);
            }
        }
        return buyerRequests;
    }
    
    @GetMapping("/{idUser}/driver")
    public List<Request> getRequestDriver(@PathVariable("idUser")Integer id){
    	Driver driver = serviceBD.getDriverById(id);
    	List<Building> buildings =serviceBD.findAllBuilding();
    	
    	List<Request> requests= new ArrayList<Request>();
    	for (Building building : buildings) {
    		System.out.println(building.getAddress());
			for (Request req: building.getRequests()) {
				if(req.getDriver()!= null && req.getDriver().getIdUser()==id) {
					requests.add(req);
				}
			}
				
		}
    	return requests;
    }

//    @GetMapping("/attendant/{id}")
//    @ResponseBody
//    public Driver getDriverAttendant(@PathVariable("id") Integer id){
//        Request request = serviceBD.getRequestById(id);
//        Driver user = new Driver();
//        if(request.getItems().size() > 0){
//            user = request.getItems().get(0).getDriver();
//			/*for(Item item: request.getItems()){
//				EN CASO DE QUE UN PEDIDO TENGA VARIOS CHOFERES
//			}*/
//        }
//        return user;
//    }

    //asignar chofer a items
    @RequestMapping(value = "/driver/{idDriver}/{idRequest}", method = RequestMethod.PUT)
    @ResponseBody
    public void sendBudget(@PathVariable("idDriver") Integer idDriver, @PathVariable("idRequest") Integer idRequest){
//        List<Item> items = budget.getItems();
    	Request budget = serviceBD.getRequestById(idRequest);
    	Driver driver =serviceBD.getDriverById(idDriver);
        budget.setDriver(driver);
        budget.setState("Asignada");
        Log log = new Log(budget.getState(), budget);
        serviceBD.saveLog(log);
        serviceBD.saveRequest(budget);
        

    	mailService.sendMailNotification(
    			driver.getEmail(),"Se asigno un nuevo despacho",
    			"Informacion dle nueco despacho.\n"
    					+ "Datos:\n"
    					+ "Obra:"+budget.getBuilding().getAddress()+"\n"
    					+ "Compañia:"+budget.getBuilding().getCompany().getName()+"\n"
    					+ "Jefe de Obra:"+budget.getManager().getName()+"\n",
    					"request-to-pick/"+budget.getIdRequest()+"/notf");
//        for(Item item:items){
//            item.setDriver(serviceBD.getDriverById(id));
//            serviceBD.saveItem(item);
//        }
    }

    //Validar entrega manager o driver
    @PutMapping("/{idUser}/validateReceived/{idRequest}")
    @ResponseBody
    public HttpStatus validateReceived(@PathVariable("idUser") Integer idUser, @PathVariable("idRequest") Integer idRequest){
        Manager manager = serviceBD.getManagerById(idUser);
        if(manager != null){
            for(Request request:manager.getRequests()){
                if(request.getIdRequest() == idRequest){
                    request.setManagerValidation(Boolean.TRUE);
                    serviceBD.saveRequest(request);
                    return HttpStatus.ACCEPTED;
                }
            }
        }
        Driver driver = serviceBD.getDriverById(idUser);
        if(driver != null){
            for(Request request:driver.getRequest()){
                if(request.getIdRequest() == idRequest){
                    request.setDriverValidation(Boolean.TRUE);
                    serviceBD.saveRequest(request);
                    return HttpStatus.ACCEPTED;
                }
            }
        }
        return HttpStatus.UNAUTHORIZED;
    }

    //Validar request como entregada
    @GetMapping("/{idRequest}/confirmed")
    @ResponseBody
    public Integer confirmDelivered(@PathVariable("idRequest") Integer id){
        Request request = serviceBD.getRequestById(id);
        if(request.getDriverValidation() || request.getManagerValidation()){
            if(!request.getState().equals("Recibida") && !request.getState().equals("Disconforme")){
                request.setState("Recibida");
                Log log = new Log(request.getState(), request);
                serviceBD.saveLog(log);
                serviceBD.saveRequest(request);
            }
            return 1;
        }
        return 0;
    }

    @PutMapping("/update")
    public Request editRequest(@RequestBody Request request) {
        if(request!=null) {
            return serviceBD.updateRequest(request);
        }
        return null;

    }

    @DeleteMapping("/delete/{id}")
    public HttpStatus deleteRequest(@PathVariable("id") Integer idRequest) {
        if(serviceBD.deleteRequest(idRequest)) return HttpStatus.OK;
        return HttpStatus.INTERNAL_SERVER_ERROR;
    }
    
	@GetMapping("download-request-pdf/{id}")
	public ResponseEntity<Resource> downloadFile(
			@PathVariable("id")Integer idRequest
			) throws IOException {
		Request request = serviceBD.getRequestById(idRequest);
		FilePlantillaPdf plantilla = serviceBD.findPlantillaById(1);
		FilePlantillaPdf plantilla2 = serviceBD.findPlantillaById(2);
//		byte[] data = FilePlantilla.rellenarCertificado(plantilla, nombre, nombreTaller);
		byte[] data=FilePlantillaPdf.rellenarCertificado(plantilla.getData(),plantilla2.getData(),request);
		String contentType = "application/pdf";
		//String fileName = user.getNombre()+"_"+conferencia.getNombre()+"_"+taller.getCodigo()+".pdf
		String fileName = "Request_"+request.getIdRequest()+".pdf";
	
		

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + fileName + "\"")
                .body(new ByteArrayResource(data));
	
	}
	
	
	@GetMapping("download-request-excel/{id}")
	public ResponseEntity<Resource> downloadFileExcel(
			@PathVariable("id")Integer idRequest
			) throws IOException {
		Request request = serviceBD.getRequestById(idRequest);
		
		
	   
	    
	   
		
	   
	   
//		byte[] data = FilePlantilla.rellenarCertificado(plantilla, nombre, nombreTaller);
		byte[] data=ExcelUtils.generateExcel(request);
		String contentType = "application/xlsx";
		//String fileName = user.getNombre()+"_"+conferencia.getNombre()+"_"+taller.getCodigo()+".pdf
		String fileName= "Request_"+request.getIdRequest()+".xlsx";
	
		

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + fileName + "\"")
                .body(new ByteArrayResource(data));
	
	}
    
}
