package usach.cl.gamat.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import usach.cl.gamat.entities.Distributor;
import usach.cl.gamat.facadeBD.IServiceBD;

import java.util.Set;

@CrossOrigin
@RestController
@RequestMapping("/distributors")
public class DistributorService {

    @Autowired
    private IServiceBD serviceBd;

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