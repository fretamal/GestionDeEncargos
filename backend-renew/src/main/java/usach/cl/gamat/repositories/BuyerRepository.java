package usach.cl.gamat.repositories;

import org.springframework.data.repository.CrudRepository;
import usach.cl.gamat.entities.Buyer;

public interface BuyerRepository extends CrudRepository<Buyer, Integer> {
}
