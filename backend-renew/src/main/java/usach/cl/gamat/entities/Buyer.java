package usach.cl.gamat.entities;

import javax.persistence.*;

@Entity
@DiscriminatorValue("Buyer")
public class Buyer extends User{

}
