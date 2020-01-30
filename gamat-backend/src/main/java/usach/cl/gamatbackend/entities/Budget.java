package usach.cl.gamatbackend.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

import java.util.Date;
import java.util.List;

@Entity
@Table(name = "budget")
public class Budget {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id", unique = true)
	private int idBudget;
	
	@Column(name = "totalPrice")
	private int totalPrice;
	
	@Column(name = "shippingPrice")
	private int shippingPrice;
	
	@Column(name = "administrationPrice")
	private int administrationPrice;
	
	@Temporal(TemporalType.DATE)
	@Column(name = "date")
	private Date date;
	
	@Temporal(TemporalType.DATE)
	@Column(name = "expiration")
	private Date expiration;
	
	@Column(name = "payCondition")
	private String payCondition;

	@Column(name = "totalWeight")
	private int totalWeight;

	@ManyToOne(fetch=FetchType.LAZY)
	@JoinColumn(name="budget_state_id")
	private BudgetState budgetState;

	@ManyToOne(fetch=FetchType.LAZY)
	@JoinColumn(name="user_id")
	private User user;

	@ManyToOne(fetch=FetchType.LAZY,cascade=CascadeType.DETACH)
	@JoinColumn(name="request_id")
	private Request request;

	public int getIdBudget() {
		return idBudget;
	}

	public void setIdBudget(int idBudget) {
		this.idBudget = idBudget;
	}

	public int getTotalPrice() {
		return totalPrice;
	}

	public void setTotalPrice(int totalPrice) {
		this.totalPrice = totalPrice;
	}

	public int getShippingPrice() {
		return shippingPrice;
	}

	public void setShippingPrice(int shippingPrice) {
		this.shippingPrice = shippingPrice;
	}

	public int getAdministrationPrice() {
		return administrationPrice;
	}

	public void setAdministrationPrice(int administrationPrice) {
		this.administrationPrice = administrationPrice;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public Date getExpiration() {
		return expiration;
	}

	public void setExpiration(Date expiration) {
		this.expiration = expiration;
	}

	public String getPayCondition() {
		return payCondition;
	}

	public void setWeight(int weight) {
		this.totalWeight = weight;
	}

	public int getWeight() {
		return totalWeight;
	}

	public void setPayCondition(String payCondition) {
		this.payCondition = payCondition;
	}

	public BudgetState getBudgetState() {
		return budgetState;
	}

	public void setBudgetState(BudgetState budgetState) {
		this.budgetState = budgetState;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Request getRequest() {
		return request;
	}

	public void setRequest(Request request) {
		this.request = request;
	}
}
