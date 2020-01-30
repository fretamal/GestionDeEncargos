package usach.cl.gamatbackend.services;

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

import usach.cl.gamatbackend.entities.Item;
import usach.cl.gamatbackend.facadeBd.IServiceBd;


@CrossOrigin
@RestController
@RequestMapping("/items")
public class ItemService {
	@Autowired
	private IServiceBd serviceBd;
	
	@PutMapping
	@ResponseBody
	public Item updateItem(@RequestBody Item item) {
		if( item != null)
			return serviceBd.updateItem(item);
		return null;
	}
	
	@DeleteMapping
	@ResponseBody
	public HttpStatus deleteItem(@PathVariable("id") Integer idItem) {
		if(serviceBd.deleteItem(idItem))
			return HttpStatus.OK;
		return HttpStatus.INTERNAL_SERVER_ERROR;
	}

}
