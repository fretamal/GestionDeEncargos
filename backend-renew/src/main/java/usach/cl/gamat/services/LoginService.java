package usach.cl.gamat.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import usach.cl.gamat.Config.AccountCredentials;
import usach.cl.gamat.entities.User;
import usach.cl.gamat.repositories.UserRepository;

//@CrossOrigin
//@RestController
//@RequestMapping("/requests")

public class LoginService {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/login")
    public ResponseEntity<String> loginApplication(@RequestBody AccountCredentials accountCredentials) {
    	System.out.println("AAAAAAAAAAAAAAAAAAAAAAAAAAAAa");

        return ResponseEntity.ok().body(accountCredentials.getUsername() + "\n" + accountCredentials.getPassword() + "\n" + "You can access this page");

    }

    @PostMapping("/singup")
    public ResponseEntity<User> singupApplication(@RequestBody User user) {

        User result = userRepository.save(user);

        return ResponseEntity.ok().body(result);

    }

}
