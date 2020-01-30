package usach.cl.gamat.repositories;

import org.springframework.data.repository.CrudRepository;
import usach.cl.gamat.entities.Item;

public interface ItemRepository extends CrudRepository<Item, Integer> {
}
