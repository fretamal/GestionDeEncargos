import React from 'react';
import AddItemtoBudget from './AddItemtoBudget';
import SeeBudgetforItem from './SeeBudgetforItem';

class ItemRow extends React.Component {

        
    state = {
        budgetItem: [],
        collapseStatus: false
    }

    displayCollapse = () => {
        console.log(this.props)
        this.props.colapseFunction();
        console.log("Me llamaste de mi papito");

    }

        /* Esta función agrega a la budget (en NewBudget)los valores de cada item!*/
        addItemHandler = (item) => {
            console.log('en addItemHandles en IR:', item)
            
            this.props.onItemHandlerIR(item);    
        }




    render(){
     
    
        
    function printUrgency(dato){
        if(dato === true){
            return "Si";
        }
        return "No";
    }
    
    
    
    

    return (
        
        <tr>
            <th scope="row">{this.props.datosRequest.idItem}</th>
            <td>{this.props.datosRequest.name}</td>
            <td>{this.props.datosRequest.quantity}</td>
            <td>{printUrgency(this.props.datosRequest.urgency)}</td>
            <td>{this.props.datosRequest.description}</td>
            <td>
            <div >
                <AddItemtoBudget cantidad={this.props.datosRequest.quantity} onAddItem={(e) => this.addItemHandler(e)}/> 
                {/*Cuando se crea una budget, deberia poder ver su budget a partir de un botn.*/}
                <SeeBudgetforItem datos={this.state.budgetItem} funcion={this.displayCollapse}></SeeBudgetforItem>
            </div>

            </td>

        </tr>
        
        
        

    );
    }
};
export default ItemRow;