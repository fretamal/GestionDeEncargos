package usach.cl.gamatbackend.services;

import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import usach.cl.gamatbackend.entities.User;
import usach.cl.gamatbackend.repositories.UserRepository;

@CrossOrigin
@RestController
@RequestMapping("/users")
public class UserService {

    @Autowired
    private UserRepository userRepository;

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
        return userRepository.save(resource);
    }

}
