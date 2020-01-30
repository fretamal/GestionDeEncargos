package usach.cl.gamat.repositories;

import org.springframework.data.repository.CrudRepository;
import usach.cl.gamat.entities.Approver;

public interface ApproverRepository extends CrudRepository<Approver, Integer> {
}
