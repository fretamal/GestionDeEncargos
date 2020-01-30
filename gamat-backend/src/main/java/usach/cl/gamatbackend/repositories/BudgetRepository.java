package usach.cl.gamatbackend.repositories;

import usach.cl.gamatbackend.entities.Budget;
import org.springframework.data.repository.CrudRepository;

public interface BudgetRepository extends CrudRepository<Budget,Integer> {
}
