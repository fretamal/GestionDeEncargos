package usach.cl.gamat.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import usach.cl.gamat.entities.Item;
import usach.cl.gamat.facadeBD.IServiceBD;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/items")
public class ItemService {
    @Autowired
    private IServiceBD serviceBd;

    @GetMapping("/")
    @ResponseBody
    public List<Item> getAllItem(){return serviceBd.findAllItem();}

    @PutMapping
    @ResponseBody
    public Item updateItem(@RequestBody Item item) {
        if( item != null)
            return serviceBd.updateItem(item);
        return null;
    }

    @DeleteMapping("/{idItem}")
    @ResponseBody
    public HttpStatus deleteItem(@PathVariable("id") Integer idItem) {
        if(serviceBd.deleteItem(idItem))
            return HttpStatus.OK;
        return HttpStatus.INTERNAL_SERVER_ERROR;
    }

}

