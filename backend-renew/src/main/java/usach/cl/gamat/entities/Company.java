package usach.cl.gamat.entities;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.Date;
import java.util.List;

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
    
    @JsonIgnore
    @OneToMany(mappedBy="company",fetch=FetchType.LAZY,cascade=CascadeType.ALL)
    private List<Building> buildings;
    
    @JsonIgnore
    @OneToMany(mappedBy="company",fetch=FetchType.LAZY)
    private List<Approver> approvers;

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

	public List<Building> getBuildings() {
		return buildings;
	}

	public void setBuildings(List<Building> buildings) {
		this.buildings = buildings;
	}

	public List<Approver> getApprovers() {
		return approvers;
	}

	public void setApprovers(List<Approver> approvers) {
		this.approvers = approvers;
	}
	
	
    
    
}