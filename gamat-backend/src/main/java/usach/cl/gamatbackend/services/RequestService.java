package usach.cl.gamatbackend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import usach.cl.gamatbackend.entities.Building;
import usach.cl.gamatbackend.entities.Request;
import usach.cl.gamatbackend.entities.User;
import usach.cl.gamatbackend.entities.Item;
import usach.cl.gamatbackend.entities.UserType;
import usach.cl.gamatbackend.facadeBd.IServiceBd;
import usach.cl.gamatbackend.repositories.RequestRepository;
import usach.cl.gamatbackend.repositories.UserRepository;
import usach.cl.gamatbackend.serviceMail.IServiceMail;

import javax.validation.constraints.Null;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/requests")
public class RequestService  implements Serializable {
	
	@Autowired
	private IServiceBd serviceBd;
	@Autowired
	private UserRepository userRepository;
	@Autowired 
	private IServiceMail mailService;

	@PostMapping("/create/{idUser}")
	public Request createRequest(
			@RequestBody Request request,
			@PathVariable("idUser") Integer idUser) {
		if(request != null) {
			User user = serviceBd.getUserById(idUser);
			Building building = user.getBuilding();
			request.setBuilding(building);
			request.setUser(user);
			request.setState("Pendiente por revisar");
			Request newRequest= serviceBd.saveRequest(request);
			// datos aprobador 
			//mailService.sendMailNotification("", "", "");
			return newRequest;
		}
		return null;
		
	}
	
	@PostMapping("/approve/{idRequest}")
	public HttpStatus aprobarRequest(@PathVariable("idRequest") Integer id,@RequestBody Request request) {
//		Request request = serviceBd.getRequestById(id);
		if (request != null) {
			request.setState("Aprobado");
			serviceBd.saveRequest(request);
			return HttpStatus.OK;
		}
		return HttpStatus.INTERNAL_SERVER_ERROR;
	}
	
	@PostMapping("/budget/approve/{idRequest}")
	public HttpStatus aprobarBudget(@PathVariable("idRequest") Integer id,@RequestBody Request request) {
//		Request request = serviceBd.getRequestById(id);
		if (request != null) {
			request.setState("Autorizada");
			serviceBd.saveRequest(request);
			return HttpStatus.OK;
		}
		return HttpStatus.INTERNAL_SERVER_ERROR;
	}
	
	@PostMapping("/budget/reject/{idRequest}")
	public HttpStatus rechazarBudget(@PathVariable("idRequest") Integer id,@RequestBody Request request) {
//		Request request = serviceBd.getRequestById(id);
		if (request != null) {
			request.setState("Rechazada");
			serviceBd.saveRequest(request);
			return HttpStatus.OK;
		}
		return HttpStatus.INTERNAL_SERVER_ERROR;
	}
	
	@PostMapping("/budget/{idRequest}")
	public HttpStatus cotizarRequest(@PathVariable("idRequest") Integer id,@RequestBody Request request) {
//		Request request = serviceBd.getRequestById(id);
		if (request != null) {
			request.setState("Cotizacion");
			serviceBd.saveRequest(request);
			return HttpStatus.OK;
		}
		return HttpStatus.INTERNAL_SERVER_ERROR;
	}
	
	
	@PostMapping("/reject/{idRequest}")
	public HttpStatus rechazarRequest(@PathVariable("idRequest") Integer id,@RequestBody Request request) {
//		Request request = serviceBd.getRequestById(id);
		if (request != null) {
			request.setState("Rechazado");
			serviceBd.saveRequest(request);
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
	@GetMapping("/{idUser}/manager")
	@ResponseBody
	public List<Request> getRequestJefeObra(@PathVariable("idUser") Integer id){
		User user = serviceBd.getUserById(id);
		Iterable<Request> requests = serviceBd.findAllRequest();
		List<Request> createdRequests = new ArrayList<>();
		for (Request request:requests){
			if(request.getUser() == user){
				createdRequests.add(request);
			}
		}
		return createdRequests;
		
	}

	@GetMapping("/{idUser}/{state}/approver")
	@ResponseBody
	public List<Request> getRequestAprobador(
			@PathVariable("idUser") Integer id,
			@PathVariable("state") Integer state){
		String nameState;
		switch (state) {
		case 0:
			nameState="Pendiente por revisar";
			break;
		case 1:
			nameState="Aprobado";
			break;
		case 2:
			nameState="Cotizacion";
			break;

		default:
			nameState=null;
			break;
		}
		User user = serviceBd.getUserById(id);
		List<Request> requests = new ArrayList<>();
		//for(UserType rol:user.getRoles()){
			if(user.getRol().getIdUserType() == 1){
				for (Building building:user.getBuildings()){
					for(Request request : building.getRequests()) {
					if (request.getState().equals(nameState)){
						requests.add(request);
					}
					}
				}
			}
		//}
		return requests;
	}

	@GetMapping("/{idUser}/buyer")
	@ResponseBody
	public List<Request> getrequestComprador(@PathVariable("idUser") Integer id){
		User user = serviceBd.getUserById(id);
		List<Request> requestsApprove = new ArrayList<>();
		Iterable<Request> requests = serviceBd.findAllRequest();
		
		//for(UserType rol:user.getRoles()){
			if(user.getRol().getIdUserType() == 3){
				for (Request request:requests){
				
					request.setUser(null);;
					
					if (request.getState().equals("Aprobado")){
						requestsApprove.add(request);
					}
				}
			}
		//}
		return requestsApprove;
	}

	@GetMapping("/attendant/{id}")
	@ResponseBody
	public User getDriverAttendant(@PathVariable("id") Integer id){
		Request request = serviceBd.getRequestById(id);
		User user = new User();
		if(request.getItems().size() > 0){
			user = request.getItems().get(0).getDriver();
			/*for(Item item: request.getItems()){
				EN CASO DE QUE UN PEDIDO TENGA VARIOS CHOFERES
			}*/
		}
		return user;
	}
	
	@PutMapping("/update")
	public Request editRequest(@RequestBody Request request) {
		if(request!=null) {
			return serviceBd.updateRequest(request);
		}
		return null;
		
	}
	
	@DeleteMapping("/delete/{id}")
	public HttpStatus deleteRequest(@PathVariable("id") Integer idRequest) {
		if(serviceBd.deleteRequest(idRequest)) return HttpStatus.OK;
		return HttpStatus.INTERNAL_SERVER_ERROR;
	}

}
