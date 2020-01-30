package usach.cl.gamat.services;

import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import usach.cl.gamat.entities.*;
import usach.cl.gamat.facadeBD.IServiceBD;
import usach.cl.gamat.facadeBD.ServiceBdImp;
import usach.cl.gamat.repositories.DriverRepository;
import usach.cl.gamat.repositories.UserRepository;

import java.util.List;
import java.util.Set;

@CrossOrigin
@RestController
@RequestMapping("/users")
public class UserService {

    @Autowired
    private IServiceBD serviceBdImp;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private DriverRepository driverRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @RequestMapping(value = "/", method = RequestMethod.GET)
    @ResponseBody
    public Iterable<User> getAllUsers(){
        return userRepository.findAll();
    }

    @RequestMapping(value="/login", method = RequestMethod.POST)
    @ResponseBody
    public Object autentificar(@RequestBody String json) throws JSONException {
        JSONObject response = new JSONObject(json);
        String email= response.getString("email");
        String password=response.getString("password");

        User user=userRepository.findByEmail(email);

        if(user==null || !user.getPassword().equals(password)) {
            return HttpStatus.NOT_FOUND;
        }

        return user;
    }

    @RequestMapping(value = "/{id}")
    @ResponseBody
    public User findOne(@PathVariable("id") Integer Id){
        return userRepository.findById(Id).get();
    }

    @RequestMapping(method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    public User create(@RequestBody User resource){
        resource.setPassword(passwordEncoder.encode(resource.getPassword()));
        return userRepository.save(resource);
    }

    @RequestMapping(method = RequestMethod.POST, value = "/createManager")
    @ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    public User createManager(@RequestBody Manager resource){
        resource.setPassword(passwordEncoder.encode(resource.getPassword()));
        return serviceBdImp.saveManager(resource);
    }

    @RequestMapping(method = RequestMethod.POST, value = "/createApprover")
    @ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    public User createApprover(@RequestBody Approver resource){
        resource.setPassword(passwordEncoder.encode(resource.getPassword()));
        return serviceBdImp.saveApprover(resource);
    }
    
    @PutMapping("/assingApprover")
    
    public HttpStatus assingApprover(@RequestBody Approver resource){
    	System.out.println("llegue");
       for (Building build : resource.getBuildings()) {
    	   build.setApprover(resource);
    	   serviceBdImp.saveBuilding(build);
    	   System.out.println("uodate");
		
	}
        return HttpStatus.OK;
    }


    @RequestMapping(method = RequestMethod.POST, value = "/createDriver")
    @ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    public User createDriver(@RequestBody Driver resource){
        resource.setPassword(passwordEncoder.encode(resource.getPassword()));
        return serviceBdImp.saveDriver(resource);
    }

    @RequestMapping(method = RequestMethod.POST, value = "/createBuyer")
    @ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    public User createBuyer(@RequestBody Buyer resource){
        resource.setPassword(passwordEncoder.encode(resource.getPassword()));
        return serviceBdImp.saveBuyer(resource);
    }

    @PutMapping(value = "/{id}/edit")
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public void update(@RequestBody User resource, @PathVariable Integer id){
        User user = serviceBdImp.getUserById(id);
        user.setPassword(passwordEncoder.encode(resource.getPassword()));
        userRepository.save(user);
    }

    //Get Drivers
    @GetMapping("/drivers")
    @ResponseBody
    public Iterable<Driver> getDrivers(){
        return driverRepository.findAll();
    }
    
    @DeleteMapping("/{id}")
    @ResponseBody
    public void deleteUser(@PathVariable("id")Integer id) {
    	User user= serviceBdImp.getUserById(id);
    	serviceBdImp.deleteUser(user);
    }

}
