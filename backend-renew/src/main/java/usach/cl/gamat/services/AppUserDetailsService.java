package usach.cl.gamat.services;

import java.util.Collections;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import usach.cl.gamat.entities.User;
import usach.cl.gamat.repositories.UserRepository;

import java.util.Collections;

@Service
public class AppUserDetailsService implements UserDetailsService{
    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

        User user = userRepository.findByEmail(email);
        if (user == null) {
            throw new UsernameNotFoundException("User '" + email + "' not found");
        }

        return org.springframework.security.core.userdetails.User
                .withUsername(email)
                .password(user.getPassword())
                .authorities(Collections.emptyList())
                .accountExpired(false)
                .accountLocked(false)
                .credentialsExpired(false)
                .disabled(false)
                .build();

    }

}
