package usach.cl.gamatbackend.entities;

import java.io.Serializable;
import java.util.Date;

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

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table(name="item")
public class Item  implements Serializable{
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long idItem;
	
	@NotNull
	private String name;
	private boolean urgency;
	
	private String description;
	private int price;
	private int totalPrice;
	private int weight;
	private int totalWeight;
	private String observation;
	private String comment;
	
	@NotNull
	private int quantity;

	@ManyToOne(fetch=FetchType.LAZY)
	@JoinColumn(name="user_id")
	private User driver;

//	@ManyToOne(fetch=FetchType.LAZY)
//	@JoinColumn(name="distributor_id")
//	private Distributor distributor;
	
	private String disributor;
	
	
	@ManyToOne(fetch=FetchType.EAGER)
	@JoinColumn(name="item_state_id")
	private ItemState itemState;
	
	
	@Column(name="create_at")
	@Temporal(TemporalType.TIMESTAMP)
	private Date date;
	
	
	
	@PrePersist
	public void Prepersit(){
		
		date=new Date();
	}

	public Long getIdItem() {
		return idItem;
	}

	public void setIdItem(Long idItem) {
		this.idItem = idItem;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public int getPrice() {
		return price;
	}

	public void setPrice(int price) {
		this.price = price;
	}

	public int getQuantity() {
		return quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}

	public User getDriver() {
		return driver;
	}

	public void setDriver(User driver) {
		this.driver = driver;
	}
//
//	public Distributor getDistributor() {
//		return distributor;
//	}
//
//	public void setDistributor(Distributor distributor) {
//		this.distributor = distributor;
//	}

	public ItemState getItemState() {
		return itemState;
	}

	public void setItemState(ItemState itemState) {
		this.itemState = itemState;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	public boolean isUrgency() {
		return urgency;
	}

	public void setUrgency(boolean urgency) {
		this.urgency = urgency;
		
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getObservation() {
		return observation;
	}

	public void setObservation(String observation) {
		this.observation = observation;
	}

	public int getTotalPrice() {
		return totalPrice;
	}

	public void setTotalPrice(long totalPrice) {
		this.totalPrice = totalPrice;
	}

	public int getWeight() {
		return weight;
	}

	public void setWeight(int weight) {
		this.weight = weight;
	}

	public int getTotalWeight() {
		return totalWeight;
	}

	public void setTotalWeight(int totalWeight) {
		this.totalWeight = totalWeight;
	}

	public String getComment() {
		return comment;
	}

	public void setComment(String comment) {
		this.comment = comment;
	}

	public String getDisributor() {
		return disributor;
	}

	public void setDisributor(String disributor) {
		this.disributor = disributor;
	}
	
	
	
	
	
	

}
