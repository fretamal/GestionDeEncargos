package usach.cl.gamat.entities;

import com.fasterxml.jackson.annotation.*;

import javax.persistence.*;

import java.util.List;
import java.util.Set;

@Entity
@DiscriminatorValue("Driver")
//@JsonIdentityInfo(generator= ObjectIdGenerators.PropertyGenerator.class, property="idUser")
public class Driver extends User{
    //@JsonManagedReference
	@JsonIgnore
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "driver")
    private List<Request> request;

	public List<Request> getRequest() {
		return request;
	}

	public void setRequest(List<Request> request) {
		this.request = request;
	}

//    public Set<Item> getItems() {
//        return items;
//    }
//
//    public void setItems(Set<Item> items) {
//        this.items = items;
//    }
    
    
}
