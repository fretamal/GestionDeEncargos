package usach.cl.gamatbackend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import usach.cl.gamatbackend.entities.*;
import usach.cl.gamatbackend.facadeBd.IServiceBd;
import usach.cl.gamatbackend.repositories.BudgetRepository;
import usach.cl.gamatbackend.repositories.ItemRepository;
import usach.cl.gamatbackend.repositories.UserRepository;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/budgets")
public class BudgetService {

    @Autowired
    private BudgetRepository repository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ItemRepository itemRepository;

    @Autowired
    private IServiceBd serviceBd;

    @RequestMapping(value = "/", method = RequestMethod.GET)
    @ResponseBody
    public Iterable<Budget> getAllBudgets(){
        return repository.findAll();
    }
    
    @GetMapping("/{id}")
    @ResponseBody
    public  Budget getBudgetById(@PathVariable Integer id){
        return serviceBd.findBudgetById(id);
    }

    //Comprador ve las cotizaciones aprobadas
    @RequestMapping(value = "/approved", method = RequestMethod.GET)
    @ResponseBody
    public List<Budget> getApprovedBudgets(){
        Iterable<Budget> budgets = repository.findAll();
        List<Budget> approved = new ArrayList<Budget>();
        for (Budget budget: budgets) {
            if(budget.getBudgetState().getIdBudgetState() == 2){
                approved.add(budget);
            }
        }
        return approved;
    }

    //Cotizaciones pendientes
    @GetMapping("/pending")
    @ResponseBody
    public List<Budget> getPendingBudgets(){
        Iterable<Budget> budgets = serviceBd.findAllBudget();
        List<Budget> pendingBudgets = new ArrayList<>();
        for (Budget budget:budgets){
            if(budget.getBudgetState().getIdBudgetState() == 1){
                pendingBudgets.add(budget);
            }
        }
        return pendingBudgets;
    }

    @RequestMapping(value = "/create/{idUser}", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    public Budget createRequest(@RequestBody Budget resource, @PathVariable("idUser") Integer idUser) {
        if(resource != null) {
            User user = serviceBd.getUserById(idUser);
            BudgetState state = serviceBd.getBudgetStateById(1); //Pendiente
            resource.setBudgetState(state);
            resource.getRequest().setState("Cotizacion");
            resource.setUser(user);
            return repository.save(resource);
        }
        return null;

    }

    //asignar chofer a items
    @RequestMapping(value = "/driver/{id}", method = RequestMethod.PUT)
    @ResponseBody
    public void sendBudget(@PathVariable("id") Integer id, @RequestBody Budget budget){
        Request request = budget.getRequest();
        List<Item> items = request.getItems();
        for(Item item:items){
            item.setDriver(userRepository.findById(id).get());
            itemRepository.save(item);
        }
    }

    @RequestMapping(value = "/accept/{id}", method = RequestMethod.PUT)
    @ResponseBody
    public void approveBudget(@PathVariable("id") Integer id){
        Budget budget = serviceBd.findBudgetById(id);
        BudgetState state = serviceBd.getBudgetStateById(2);//Aprobado
        budget.setBudgetState(state);
        serviceBd.saveBudget(budget);
    }

    @DeleteMapping("/delete/{id}")
    @ResponseBody
    public HttpStatus deleteBudget(@PathVariable("id") Integer id){
        if(serviceBd.deleteBudget(id)) return HttpStatus.OK;
        return HttpStatus.INTERNAL_SERVER_ERROR;
    }
}
