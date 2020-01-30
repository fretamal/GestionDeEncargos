package usach.cl.gamat.facadeBD;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import usach.cl.gamat.entities.*;
import usach.cl.gamat.repositories.*;
import java.util.List;
import java.util.Set;

@Service
public class ServiceBdImp implements IServiceBD {

    //conexion repositorios
    @Autowired
    private RequestRepository requestRepository;

    @Autowired
    private ItemRepository itemRepository;

    @Autowired
    private DistributorRepository distributorRepository;

    @Autowired
    private DriverRepository driverRepository;

    @Autowired
    private BuildingRepository buildingRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ApproverRepository approverRepository;

    @Autowired
    private ManagerRepository managerRepository;

    @Autowired
    private BuyerRepository buyerRepository;

    @Autowired
    private CompanyRepository companyRepository;

    @Autowired
    private LogRepository logRepository;
    
    @Autowired
    private FilePlantillaPdfRepository plantillaRepository;



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
    public List<Request> findAllRequest() {
        // TODO Auto-generated method stub
        return (List<Request>) requestRepository.findAll();
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
    public List<Item> findAllItem() {
        return (List<Item>) itemRepository.findAll();
    }

    @Override
    public Item saveItem(Item item) {
        return itemRepository.save(item);
    }

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


    //User

    @Override
    public User getUserById(Integer idUser) {
        // TODO Auto-generated method stub
        return userRepository.findById(idUser).orElse(null);
    }

    @Override
    public List<User> findAllUsers() {
        return (List<User>) userRepository.findAll();
    }

    @Override
    public Driver getDriverById(Integer idUser) {
        return driverRepository.findById(idUser).orElse(null);
    }

    @Override
    public List<Driver> getAllDriver() {
        return (List<Driver>) driverRepository.findAll();
    }

    @Override
    public Driver saveDriver(Driver driver) {
        return driverRepository.save(driver);
    }

    @Override
    public Manager getManagerById(Integer idUser) {
        return managerRepository.findById(idUser).orElse(null);
    }

    @Override
    public Manager saveManager(Manager manager) {
        return managerRepository.save(manager);
    }

    @Override
    public Approver getApproverById(Integer idUser) {
        return approverRepository.findById(idUser).orElse(null);
    }

    @Override
    public Approver saveApprover(Approver approver) {
        return approverRepository.save(approver);
    }

    @Override
    public Buyer getBuyerById(Integer idUser) {
        return buyerRepository.findById(idUser).orElse(null);
    }

    @Override
    public Buyer saveBuyer(Buyer buyer) {
        return buyerRepository.save(buyer);
    }

    @Override
    public List<Company> findAllCompany() {
        return (List<Company>) companyRepository.findAll();
    }

    @Override
    public Company findCompanyById(Integer id) {
        return companyRepository.findById(id).orElse(null);
    }

    @Override
    public Company createCompany(Company company) {
        return companyRepository.save(company);
    }


    @Override
	public List<Building> findAllBuilding() {
		// TODO Auto-generated method stub
		return (List<Building>) buildingRepository.findAll();
	}


	@Override
	public List<Buyer> findAllBuyer() {
		return (List<Buyer>) buyerRepository.findAll();
		
	}


	@Override
	public boolean deleteCompany(Company company) {
		companyRepository.delete(company);
		return true;
	}

    @Override
    public List<Log> findAllLog() {
        return (List<Log>) logRepository.findAll();
    }

    @Override
    public Log findLogById(Integer id) {
        return logRepository.findById(id).orElse(null);
    }

    @Override
    public Log saveLog(Log log) {
        return logRepository.save(log);
    }

    @Override
    public boolean deleteLog(int id) {
        Log log = logRepository.findById(id).orElse(null);
        if(log != null){
            logRepository.delete(log);
            return true;
        }
        return false;
    }


	public void deleteUser(User user) {
		userRepository.delete(user);
		
	}


	@Override
	public FilePlantillaPdf findPlantillaById(Integer id) {
		
		return plantillaRepository.findById(id).orElse(null);
	}


}