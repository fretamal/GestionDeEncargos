package usach.cl.gamat.facadeBD;

import usach.cl.gamat.entities.*;

import java.util.List;
import java.util.Set;

//interfaz que usa patron facade para manejar acceso a repositorios BD
public interface IServiceBD {

    //operaciones request
    public List<Request> findRequestByState(String state, Integer idAprobador, Integer idBuilding);



    public List<Request> findAllRequest();

    public Request saveRequest(Request request);

    public Request updateRequest(Request newRequest);

    public boolean deleteRequest (Integer idRequest);

    public Request getRequestById(Integer id);

    //budget

    /*public Iterable<Budget> findAllBudget();

    public Budget findBudgetById(Integer id);

    public Budget saveBudget(Budget budget);

    public boolean deleteBudget (Integer id);*/

    //operaciones Building
    public Building getBuildingById(Integer idBuilding);

    public List<Building> getAllBuilding();

    public List<Request> getRequestOfBuilding(Integer id);

    public Building saveBuilding(Building building);

    public Building updateBuilding(Building building);

    public boolean deleteBuilding(Integer idBuilding);


    //operaciones items
    public List<Item> findAllItem();

    public Item saveItem(Item item);

    public Item updateItem(Item item);

    public boolean deleteItem(Integer iDitem);

    // operaciones bistributor

    public Set<Distributor> getDistributor();

    public Distributor createDistributor(Distributor distributor);

    public Distributor updateDistributor(Distributor distributor);

    public boolean deleteDistributor(Integer idDistributor);

    /*// operaciones itemState

    public List<ItemState>getItemStates();

    public ItemState createItemState(ItemState itemState);

    public ItemState updateItemState(ItemState itemState);

    public boolean deleteItemState(Integer idItemState);*/


    // operaciones User

    public User getUserById(Integer idUser);

    public List<User> findAllUsers();

    // operaciones Driver

    public Driver getDriverById(Integer idUser);

    public List<Driver> getAllDriver();

    public Driver saveDriver(Driver driver);

    // operaciones Manager

    public Manager getManagerById(Integer idUser);

    public Manager saveManager(Manager manager);

    // operaciones Approver

    public Approver getApproverById(Integer idUser);

    public Approver saveApprover(Approver approver);

    //Operaciones Buyer

    public Buyer getBuyerById(Integer idUser);

    public Buyer saveBuyer(Buyer buyer);



    // operaciones budgetState

    //public BudgetState getBudgetStateById(Integer idBudgetState);

    //Operaciones Company

    public List<Company> findAllCompany();

    public Company findCompanyById(Integer id);

    public Company createCompany(Company company);



	public List<Building> findAllBuilding();



	public List<Buyer> findAllBuyer();



	public boolean deleteCompany(Company company);

    //Log

    public List<Log> findAllLog();

    public Log findLogById(Integer id);

    public Log saveLog(Log log);

    public boolean deleteLog(int id);

	public void deleteUser(User user);

	// plantillas pdf
	public FilePlantillaPdf findPlantillaById(Integer id);


}