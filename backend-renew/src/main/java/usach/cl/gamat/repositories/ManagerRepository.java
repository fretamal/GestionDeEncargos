package usach.cl.gamat.repositories;

import org.springframework.data.repository.CrudRepository;
import usach.cl.gamat.entities.Manager;

public interface ManagerRepository extends CrudRepository<Manager, Integer> {
}
