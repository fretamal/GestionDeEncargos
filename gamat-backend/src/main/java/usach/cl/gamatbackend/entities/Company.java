package usach.cl.gamatbackend.entities;

import java.util.Date;
import java.util.List;

import javax.persistence.*;
import javax.validation.constraints.*;

@Entity
@Table(name = "company")
public class Company {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id", unique = true)
	private int idCompany;
	
	@NotNull
	@Column(name = "name")
	private String name;
	
	@Column(name="create_at")
	@Temporal(TemporalType.TIMESTAMP)
	private Date date;

//	@OneToMany(fetch=FetchType.LAZY,cascade=CascadeType.ALL)
//	@JoinColumn(name="building_id")
//	private List<Building> buildings;

	public int getIdCompany() {
		return idCompany;
	}

	public void setIdCompany(int idCompany) {
		this.idCompany = idCompany;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	
//	public List<Building> getBuildings() {
//		return buildings;
//	}
//
//	public void setBuildings(List<Building> buildings) {
//		this.buildings = buildings;
//	}

	public void Prepersit(){
		
		date=new Date();
	}
}
