package usach.cl.gamatbackend.services;

import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import usach.cl.gamatbackend.entities.Distributor;
import usach.cl.gamatbackend.facadeBd.IServiceBd;

@CrossOrigin
@RestController
@RequestMapping("/distributors")
public class DistributorService {
	
	@Autowired
	private IServiceBd serviceBd;
	
	@GetMapping
	@ResponseBody
	public Set<Distributor> getAll(){
		return serviceBd.getDistributor();
	}
	
	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
	public Distributor createDistributor(@RequestBody Distributor distributor) {
		if(distributor!=null)
			return serviceBd.createDistributor(distributor);
		return null;
	}
	
	@PutMapping
    @ResponseBody
	public Distributor updateDistributor(@RequestBody Distributor distributor) {
		if(distributor != null)
			return serviceBd.updateDistributor(distributor);
		return null;
		
	}
	
	@DeleteMapping("/{id}")
	@ResponseBody
	public HttpStatus deleteDistributor(@PathVariable("id") Integer idBuilding) {
		if(serviceBd.deleteBuilding(idBuilding))
			return HttpStatus.OK;
		return HttpStatus.INTERNAL_SERVER_ERROR;
	}
	
	

}
