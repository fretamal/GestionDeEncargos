package usach.cl.gamat.repositories;

import org.springframework.data.repository.CrudRepository;
import usach.cl.gamat.entities.Company;

public interface CompanyRepository extends CrudRepository<Company, Integer> {
}
