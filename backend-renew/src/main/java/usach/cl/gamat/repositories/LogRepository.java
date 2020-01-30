package usach.cl.gamat.repositories;

import org.springframework.data.repository.CrudRepository;
import usach.cl.gamat.entities.Log;

public interface LogRepository extends CrudRepository<Log, Integer> {
}
