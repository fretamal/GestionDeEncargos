package usach.cl.gamatbackend.entities;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Set;

import javax.persistence.*;
import javax.validation.constraints.*;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
@Table(name = "UserType")
public class UserType implements Serializable{

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id", unique = true)
	private int idUserType;
	
	@NotNull
	@Column(name = "name")
	private String name;
	
	@Column(name="create_at")
	@Temporal(TemporalType.TIMESTAMP)
	private Date date;


	@JsonIgnore
	@OneToMany(fetch=FetchType.EAGER,mappedBy="rol")
	private List<User> usuarios = new ArrayList<>();
//	private Set<User> usuarios;
/*Por si acaso
	@ManyToMany(fetch = FetchType.LAZY,
			cascade = {
					CascadeType.PERSIST,
					CascadeType.MERGE
			},
			mappedBy = "roles")
	
	private Set<User> users;*/

	public int getIdUserType() {
		return idUserType;
	}

	public void setIdUserType(int idUserType) {
		this.idUserType = idUserType;
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
/*
	public Set<User> getUsers() {
		return users;
	}

	public void setUsers(Set<User> users) {
		this.users = users;
	}*/
	

	@PrePersist
	public void Prepersit(){
		
		date=new Date();
	}

	public List<User> getUsuarios() {
		return usuarios;
	}

	public void setUsuarios(List<User> usuarios) {
		this.usuarios = usuarios;
	}
}
