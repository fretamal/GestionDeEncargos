package usach.cl.gamat.entities;

import com.fasterxml.jackson.annotation.*;

import javax.persistence.*;
import java.util.Set;

@Entity
@DiscriminatorValue("Manager")
//@JsonIdentityInfo(generator= ObjectIdGenerators.PropertyGenerator.class, property="idUser")
public class Manager extends User{
    @JsonIgnore
    @OneToMany(mappedBy="manager",fetch= FetchType.LAZY,cascade= CascadeType.ALL)
    private Set<Request> requests;
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    @OneToOne
    @JoinColumn(name = "building_id")
    private Building building;

    public Building getBuilding() {
        return building;
    }

    public void setBuilding(Building building) {
        this.building = building;
    }

    public Set<Request> getRequests() {
        return requests;
    }

    public void setRequests(Set<Request> requests) {
        this.requests = requests;
    }
}
