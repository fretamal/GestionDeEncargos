package usach.cl.gamatbackend.repositories;

import org.springframework.data.repository.CrudRepository;

import usach.cl.gamatbackend.entities.Request;



public interface RequestRepository extends CrudRepository<Request,Integer> {
	

}
