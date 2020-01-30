package usach.cl.gamatbackend.services;

import java.util.List;
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
import org.springframework.web.bind.annotation.RestController;

import usach.cl.gamatbackend.entities.ItemState;
import usach.cl.gamatbackend.facadeBd.IServiceBd;

@CrossOrigin
@RestController
@RequestMapping("/item-states")
public class ItemStateService {
	
	@Autowired
	private IServiceBd serviceBd;
	
	@GetMapping
	public List<ItemState> getAll(){
		return serviceBd.getItemStates();
	}
	
	@PostMapping
	public ItemState createItemState(@RequestBody ItemState itemState) {
		if(itemState!=null)
			return serviceBd.createItemState(itemState);
		return null;
	}
	
	@PutMapping
	public ItemState updateItemState(@RequestBody ItemState itemState) {
		if(itemState != null)
			return serviceBd.updateItemState(itemState);
		return null;
	}
	
	@DeleteMapping("/id")
	public HttpStatus deleteItemState(@PathVariable("id") Integer idItemState) {
		if(serviceBd.deleteItemState(idItemState))
			return HttpStatus.OK;
		return HttpStatus.INTERNAL_SERVER_ERROR;
	}

}
