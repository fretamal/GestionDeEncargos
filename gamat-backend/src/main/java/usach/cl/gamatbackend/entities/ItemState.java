package usach.cl.gamatbackend.entities;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.PrePersist;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
@Table(name="item_states")
public class ItemState implements Serializable {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int idItemState;
	
	@NotNull
	private String name;
	
	@Column(name="create_at")
	@Temporal(TemporalType.TIMESTAMP)
	private Date date;

	
	@PrePersist
	public void Prepersit(){
		
		date=new Date();
	}

	public int getIdItemState() {
		return idItemState;
	}

	public void setIdItemState(int idItemState) {
		this.idItemState = idItemState;
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


	
	
}
