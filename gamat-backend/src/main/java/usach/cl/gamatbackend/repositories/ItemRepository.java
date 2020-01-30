package usach.cl.gamatbackend.repositories;

import usach.cl.gamatbackend.entities.Item;
import org.springframework.data.repository.CrudRepository;

public interface ItemRepository extends CrudRepository<Item,Integer> {
}