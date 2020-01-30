package usach.cl.gamatbackend.entities;

import java.util.Date;

import javax.persistence.*;
import javax.validation.constraints.*;

@Entity
@Table(name = "budgetState")
public class BudgetState {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id", unique = true)
	private int idBudgetState;
	
	@NotNull
	@Column(name = "name")
	private String name;
	
	@Column(name="create_at")
	@Temporal(TemporalType.TIMESTAMP)
	private Date date;

	public int getIdBudgetState() {
		return idBudgetState;
	}

	public void setIdBudgetState(int idBudgetState) {
		this.idBudgetState = idBudgetState;
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

	@PrePersist
	public void Prepersit(){
		
		date=new Date();
	}
}
