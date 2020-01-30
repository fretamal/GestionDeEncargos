package usach.cl.gamat.entities;


import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;

@Entity
@Table(name="Distributors")
public class Distributor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idDistributor;

    @NotNull
    private String name;

    @NotNull
    private String address;

    private String schedule;
    private String observation;

    @Column(name="create_at")
    @Temporal(TemporalType.TIMESTAMP)
    private Date date;

    @PrePersist
    public void Prepersit(){

        date=new Date();
    }

    public int getIdDistributor() {
        return idDistributor;
    }

    public void setIdDistributor(int idDistributor) {
        this.idDistributor = idDistributor;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
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

    public String getSchedule() {
        return schedule;
    }

    public void setSchedule(String schedule) {
        this.schedule = schedule;
    }

    public String getObservation() {
        return observation;
    }

    public void setObservation(String observation) {
        this.observation = observation;
    }
}
