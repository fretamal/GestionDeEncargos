package usach.cl.gamatbackend.entities;


import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Date;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "user")
public class User {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id", unique = true)
	private int idUser;
	
	@NotNull
	@Column(name = "email", unique = true)
	private String email;
	
	@NotNull
	@Column(name = "password")
	private String password;
	
	@NotNull
	@Column(name="nombre")
	private String nombre;

	@Column(name="create_at")
	@Temporal(TemporalType.TIMESTAMP)
	private Date date;

	/*Por si acaso
	@ManyToMany(fetch = FetchType.LAZY,cascade = {
			CascadeType.PERSIST,
			CascadeType.MERGE
	})
	@JoinTable(name = "user_has_usertype",
			
			joinColumns = { @JoinColumn(name = "user_id") },
			inverseJoinColumns = { @JoinColumn(name = "userType_id") })
	private Set<UserType> roles;*/
//
//	@ManyToOne(fetch=FetchType.LAZY,cascade=CascadeType.ALL)
//	@JoinColumn(name="userType_id")
//	private UserType rol;
	
//	@JsonBackReference
	@ManyToOne
	@JoinColumn(name="userType_id")
	private UserType rol;

	@JsonIgnore
	@OneToMany(mappedBy="user",fetch=FetchType.LAZY)
	
	private Set<Building> buildings;
	
	@OneToOne
	@JoinColumn(name="building_id")
//	@JsonIgnore
	private Building building;

	@JsonIgnore
	
	@OneToMany(mappedBy="user",fetch=FetchType.LAZY,cascade=CascadeType.ALL)
	private Set<Request> requests;

	public Set<Building> getBuildings() {
		return buildings;
	}

	public void setBuildings(Set<Building> buildings) {
		this.buildings = buildings;
	}

	public Set<Request> getRequests() {
		return requests;
	}

	public void setRequests(Set<Request> requests) {
		this.requests = requests;
	}

	public int getIdUser() {
		return idUser;
	}

	public void setIdUser(int idUser) {
		this.idUser = idUser;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}
/*
	public Set<UserType> getRoles() {
		return roles;
	}

	public void setRoles(Set<UserType> roles) {
		this.roles = roles;
	}
	*/

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public UserType getRol() {
		return rol;
	}

	public void setRol(UserType rol) {
		this.rol = rol;
	}
	
	

	public Building getBuilding() {
		return building;
	}

	public void setBuilding(Building building) {
		this.building = building;
	}

	@PrePersist
	public void Prepersit(){
		
		date=new Date();
	}
}
