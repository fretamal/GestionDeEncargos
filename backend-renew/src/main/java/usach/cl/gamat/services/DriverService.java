package usach.cl.gamat.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import usach.cl.gamat.entities.Driver;
import usach.cl.gamat.facadeBD.IServiceBD;

import java.util.List;
import java.util.Set;

@CrossOrigin
@RestController
@RequestMapping("/drivers")
public class DriverService {
    @Autowired
    private IServiceBD serviceBD;

    @GetMapping
    @ResponseBody
    public List<Driver> getDrivers(){ return serviceBD.getAllDriver();}

}
