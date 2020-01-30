package usach.cl.gamatbackend.entities;

import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.PrePersist;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonIgnore;



@Entity
@Table(name="request")
public class Request {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int idRequest;
	
	@NotNull
	private String state;
	
	private String observation;
	
	
	private int totalPrice;

	private int shippingPrice;
	
	
	private int administrationPrice;
	
	@Temporal(TemporalType.DATE)

	private Date date;
	
	@Temporal(TemporalType.DATE)
	
	private Date expiration;

	private String payCondition;

	
	private int totalWeight;
	
//	@JsonIgnore
	@ManyToOne(fetch=FetchType.LAZY)
	@JoinColumn(name="user_id")
	private User user;
	
	@JsonIgnore
	@ManyToOne(fetch=FetchType.LAZY)
	@JoinColumn(name="building_id")
	private Building building;
	
	
	@OneToMany(fetch=FetchType.LAZY,cascade=CascadeType.ALL)
	@JoinColumn(name="item_id")
	private List<Item> items;
	
	
	
	@PrePersist
	public void Prepersit(){
		
		date=new Date();
	}

	public int getIdRequest() {
		return idRequest;
	}

	public void setIdRequest(int idRequest) {
		this.idRequest = idRequest;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public String getObservation() {
		return observation;
	}

	public void setObservation(String observation) {
		this.observation = observation;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public List<Item> getItems() {
		return items;
	}

	public void setItems(List<Item> items) {
		this.items = items;
	}

	public Building getBuilding() {
		return building;
	}

	public void setBuilding(Building building) {
		this.building = building;
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

	public Date getExpiration() {
		return expiration;
	}

	public void setExpiration(Date expiration) {
		this.expiration = expiration;
	}

	public String getPayCondition() {
		return payCondition;
	}

	public void setPayCondition(String payCondition) {
		this.payCondition = payCondition;
	}

	public int getTotalWeight() {
		return totalWeight;
	}

	public void setTotalWeight(int totalWeight) {
		this.totalWeight = totalWeight;
	}
	
	
	

	
	
	

}
