package usach.cl.gamatbackend.entities;

import java.util.Date;
import java.util.List;
import java.util.Set;

import javax.persistence.*;
import javax.validation.constraints.*;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
@Table(name = "building")
public class Building {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id", unique = true)
	private int idBuilding;
	
	@NotNull
	@Column(name = "address")
	private String address;
	
	@Column(name="create_at")
	@Temporal(TemporalType.TIMESTAMP)
	private Date date;
	
	@JsonIgnore
	@ManyToOne(fetch=FetchType.LAZY,cascade=CascadeType.ALL)
	@JoinColumn(name="company_id")
	private Company company;
	
	@JsonIgnore
	@OneToMany(mappedBy="building",fetch=FetchType.LAZY,cascade=CascadeType.ALL)
	private List<Request> requests;

	@JsonIgnore
	@ManyToOne(fetch=FetchType.LAZY,cascade=CascadeType.ALL)
	@JoinColumn(name="user_id")
	private User user;
	

	@OneToOne(fetch = FetchType.EAGER,mappedBy="building")
	@JsonIgnore
	private User jefeObra;

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public int getIdBuilding() {
		return idBuilding;
	}

	public void setIdBuilding(int idBuilding) {
		this.idBuilding = idBuilding;
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

	public Company getCompany() {
		return company;
	}

	public void setCompany(Company company) {
		this.company = company;
	}
	

	public List<Request> getRequests() {
		return requests;
	}

	public void setRequests(List<Request> requests) {
		this.requests = requests;
	}

	
	public User getJefeObra() {
		return jefeObra;
	}

	public void setJefeObra(User jefeObra) {
		this.jefeObra = jefeObra;
	}

	@PrePersist
	public void Prepersit(){
		
		date=new Date();
	}
}
