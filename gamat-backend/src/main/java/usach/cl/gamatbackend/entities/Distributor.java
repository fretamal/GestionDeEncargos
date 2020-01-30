package usach.cl.gamatbackend.entities;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.PrePersist;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;

@Entity
@Table(name="Distributors")
public class Distributor {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int idDistributor;
	
	@NotNull
	private String name;
	
	@NotNull
	private String address;
	
	@Column(name="create_at")
	@Temporal(TemporalType.TIMESTAMP)
	private Date date;
	
	@PrePersist
	public void Prepersit(){
		
		date=new Date();
	}

	public int getIdDistributor() {
		return idDistributor;
	}

	public void setIdDistributor(int idDistributor) {
		this.idDistributor = idDistributor;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	
}
