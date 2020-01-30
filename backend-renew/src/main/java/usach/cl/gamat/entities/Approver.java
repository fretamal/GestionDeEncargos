package usach.cl.gamat.entities;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.util.Set;

@Entity
@DiscriminatorValue("Approver")
public class Approver extends User{
    @OneToMany(fetch = FetchType.LAZY)
//    @JsonIgnore	
    private Set<Building> buildings;
    
    @ManyToOne(fetch=FetchType.EAGER)
    @JoinColumn(name="company_id")
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
//    @JsonIgnore
    private Company company;

    public Set<Building> getBuildings() {
        return buildings;
    }

    public void setBuildings(Set<Building> buildings) {
        this.buildings = buildings;
    }

	public Company getCompany() {
		return company;
	}

	public void setCompany(Company company) {
		this.company = company;
	}
    
}
