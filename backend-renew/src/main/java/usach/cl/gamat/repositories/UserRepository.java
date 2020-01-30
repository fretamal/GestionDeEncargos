package usach.cl.gamat.repositories;

import org.springframework.data.repository.CrudRepository;
import usach.cl.gamat.entities.User;

public interface UserRepository extends CrudRepository<User, Integer>{
    User findByEmail(String email);
}
