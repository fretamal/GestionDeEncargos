package usach.cl.gamat.entities;

import com.fasterxml.jackson.annotation.*;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "item")
public class Item {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idItem;

    @NotNull
    private String name;
    @NotNull
    private String state;
    private boolean urgency;

    private String description;
    private int price;
    private long totalPrice;
    private int weight;
    private int totalWeight;
    private String observation;
    private String comment;
    @Column(name = "measure")
    @ColumnDefault("'gramos'")
    private String measure;

    @NotNull
    private int quantity;

//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name ="user_id")
//    private Driver driver;

//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "distributor_id")
//    private Distributor distributor;
    
    private String distributor;

    public int getIdItem() {
        return idItem;
    }

    public void setIdItem(int idItem) {
        this.idItem = idItem;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
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

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    public long getTotalPrice() {
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

    public String getObservation() {
        return observation;
    }

    public void setObservation(String observation) {
        this.observation = observation;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

//    public Driver getDriver() {
//        return driver;
//    }
//
//    public void setDriver(Driver driver) {
//        this.driver = driver;
//    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

	public String getDistributor() {
		return distributor;
	}

	public void setDistributor(String distributor) {
		this.distributor = distributor;
	}

//    public Distributor getDistributor() {
//        return distributor;
//    }
//
//    public void setDistributor(Distributor distributor) {
//        this.distributor = distributor;
//    }


    public String getMeasure() {
        return measure;
    }

    public void setMeasure(String measure) {
        this.measure = measure;
    }
    
}
