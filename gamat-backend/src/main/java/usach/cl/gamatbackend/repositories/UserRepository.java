package usach.cl.gamatbackend.repositories;

import usach.cl.gamatbackend.entities.User;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User, Integer> {
	 User findByEmail(String email);
}
