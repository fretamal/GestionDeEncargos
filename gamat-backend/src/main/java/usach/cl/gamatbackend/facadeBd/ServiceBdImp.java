package usach.cl.gamatbackend.facadeBd;

import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import usach.cl.gamatbackend.entities.*;
import usach.cl.gamatbackend.repositories.*;
import usach.cl.gamatbackend.services.RequestService;

import javax.validation.constraints.Null;


@Service
public class ServiceBdImp implements IServiceBd {
	
	//conexion repositorios
	@Autowired
	private RequestRepository requestRepository;
	
	@Autowired
	private ItemRepository itemRepository;
	
	@Autowired
	private DistributorRepository distributorRepository;
	
	@Autowired
	private ItemStateRepository itemStateRepository;
	
	@Autowired
	private BuildingRepository buildingRepository;
	
	@Autowired
	private UserRepository userRepository;

	@Autowired
	private BudgetStateRepository budgetStateRepository;

	@Autowired
	private BudgetRepository budgetRepository;
	
	
	
	// operaciones Request
	
	@Override
	public Request getRequestById(Integer id) {
		// TODO Auto-generated method stub
		return requestRepository.findById(id).orElse(null);
	}
	
	
	@Override
	public List<Request> findRequestByState(String state, Integer idAprobador, Integer idBuilding) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Iterable<Request> findAllRequest() {
		// TODO Auto-generated method stub
		return requestRepository.findAll();
	}

	@Override
	public Request saveRequest(Request request) {
		// TODO Auto-generated method stub
		
		return requestRepository.save(request);
	}

	@Override
	public Request updateRequest(Request newRequest) {
		// no recuerdo si actualia automaticamente
		return requestRepository.save(newRequest);
		
	}

	@Override
	public boolean deleteRequest(Integer idRequest) {
		Request request = requestRepository.findById(idRequest).orElse(null);
		requestRepository.delete(request);
		return true;
	}

	//Building
	@Override
	public Building getBuildingById(Integer idBuilding) {
		// TODO Auto-generated method stub
		return buildingRepository.findById(idBuilding).orElse(null);
	}

	@Override
	public List<Building> getAllBuilding() {
		// TODO Auto-generated method stub
		return   (List<Building>) buildingRepository.findAll();
	}

	@Override
	public List<Request> getRequestOfBuilding(Integer id) {
		Building building = buildingRepository.findById(id).orElse(null);
		// TODO Auto-generated method stub
		return (List<Request>) building.getRequests();
	}

	@Override
	public Building saveBuilding(Building building) {
		// TODO Auto-generated method stub
		return buildingRepository.save(building);
	}

	@Override
	public Building updateBuilding(Building building) {
		// TODO Auto-generated method stub
		return buildingRepository.save(building);
	}

	@Override
	public boolean deleteBuilding(Integer idBuilding) {
		// TODO Auto-generated method stub
		Building building = buildingRepository.findById(idBuilding).orElse(null);
		if(building != null) {
			buildingRepository.delete(building);
			return true;
			
		}
		return false;
	}
	
	// Item

	@Override
	public Item updateItem(Item item) {
		// TODO Auto-generated method stub
		return itemRepository.save(item);
	}

	@Override
	public boolean deleteItem(Integer iDitem) {
		// TODO Auto-generated method stub
		Item item= itemRepository.findById(iDitem).orElse(null);
		if(item != null) {
			itemRepository.delete(item);
			return true;
		}
		return false;
	}

	
	// Distributor
	
	@Override
	public Set<Distributor> getDistributor() {
		// TODO Auto-generated method stub
		return (Set<Distributor>) distributorRepository.findAll();
	}

	@Override
	public Distributor createDistributor(Distributor distributor) {
		// TODO Auto-generated method stub
		return distributorRepository.save(distributor);
	}

	@Override
	public Distributor updateDistributor(Distributor distributor) {
		// TODO Auto-generated method stub
		return distributorRepository.save(distributor);
	}

	@Override
	public boolean deleteDistributor(Integer idDistributor) {
		// TODO Auto-generated method stub
		Distributor distributor = distributorRepository.findById(idDistributor).orElse(null);
		if(distributor != null) {
			distributorRepository.delete(distributor);
			return true;
		}
		return false;
	}

	
	//ItemState
	
	@Override
	public List<ItemState> getItemStates() {
		// TODO Auto-generated method stub
		return (List<ItemState>) itemStateRepository.findAll();
	}

	@Override
	public ItemState createItemState(ItemState itemState) {
		// TODO Auto-generated method stub
		return itemStateRepository.save(itemState);
	}

	@Override
	public ItemState updateItemState(ItemState itemState) {
		// TODO Auto-generated method stub
		return itemStateRepository.save(itemState);
	}

	@Override
	public boolean deleteItemState(Integer idItemState) {
		// TODO Auto-generated method stub
		ItemState itemState = itemStateRepository.findById(idItemState).orElse(null);
		if(itemState != null) {
			itemStateRepository.delete(itemState);
			return true;
		}
		return false;
	}


	
	//User 
	
	@Override
	public User getUserById(Integer idUser) {
		// TODO Auto-generated method stub
		return userRepository.findById(idUser).orElse(null);
	}

	
	//BudgetState


	@Override
	public BudgetState getBudgetStateById(Integer idBudgetState) {
		return budgetStateRepository.findById(idBudgetState).orElse(null);
	}

	//Budget

	@Override
	public List<Budget> findAllBudget() {
		return (List<Budget>) budgetRepository.findAll();
	}

	@Override
	public Budget findBudgetById(Integer id) {
		return budgetRepository.findById(id).get();
	}

	@Override
	public Budget saveBudget(Budget budget) {
		return budgetRepository.save(budget);
	}

	@Override
	public boolean deleteBudget(Integer id) {
		Budget budget = budgetRepository.findById(id).orElse(null);
		budgetRepository.delete(budget);
		return true;
	}


}
