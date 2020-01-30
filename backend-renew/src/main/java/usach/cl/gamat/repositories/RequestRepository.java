package usach.cl.gamat.repositories;

import org.springframework.data.repository.CrudRepository;
import usach.cl.gamat.entities.Request;

public interface RequestRepository extends CrudRepository<Request, Integer> {
}
