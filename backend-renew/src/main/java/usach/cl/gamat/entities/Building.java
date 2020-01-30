package usach.cl.gamat.entities;

import com.fasterxml.jackson.annotation.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "building")
//@JsonIdentityInfo(generator= ObjectIdGenerators.PropertyGenerator.class, property="idBuilding")
public class Building {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", unique = true)
    private int idBuilding;
    
    private String name;

    @NotNull
    @Column(name = "address")
    private String address;

    @Column(name="create_at")
    @Temporal(TemporalType.TIMESTAMP)
    private Date date;

    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="company_id")
    private Company company;

    @JsonIgnore
    @OneToMany(mappedBy="building",fetch=FetchType.LAZY,cascade=CascadeType.ALL)
    private List<Request> requests;

    @JsonIgnore
    @ManyToOne(fetch=FetchType.LAZY,cascade=CascadeType.MERGE)
    @JoinColumn(name="user_id")
    private Approver approver;

    @JsonIgnore
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    @OneToMany(mappedBy = "building")
    private List<Manager> manager;

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

    public Approver getApprover() {
        return approver;
    }

    public void setApprover(Approver approver) {
        this.approver = approver;
    }

    public List<Manager> getManager() {
        return manager;
    }

    public void setManager(List<Manager> manager) {
        this.manager = manager;
    }

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
    
    
}
