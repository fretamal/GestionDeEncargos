package usach.cl.gamat.repositories;

import org.springframework.data.repository.CrudRepository;
import usach.cl.gamat.entities.Driver;

public interface DriverRepository extends CrudRepository<Driver, Integer> {
}
