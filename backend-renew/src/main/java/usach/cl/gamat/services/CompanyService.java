package usach.cl.gamat.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import usach.cl.gamat.entities.Company;
import usach.cl.gamat.facadeBD.IServiceBD;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/companies")
public class CompanyService {
    @Autowired
    private IServiceBD serviceBD;

    @GetMapping("/")
    @ResponseBody
    public List<Company> getAll(){return serviceBD.findAllCompany();}

    @PostMapping("/create")
    @ResponseBody
    public Company create(@RequestBody Company resource){return serviceBD.createCompany(resource);}
    
    @DeleteMapping("/{id}")
    @ResponseBody
     public HttpStatus deleteCompany(@PathVariable("id")Integer id) {
    	Company company = serviceBD.findCompanyById(id);
    	if(serviceBD.deleteCompany(company)) return HttpStatus.OK;
    		
    	return HttpStatus.INTERNAL_SERVER_ERROR;
    }

}
