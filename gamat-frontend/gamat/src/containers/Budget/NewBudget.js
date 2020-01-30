import React, { Component } from 'react';
import {Button} from 'reactstrap';
// import { requests } from '../../requests.json';
import axios from 'axios';
import { connect } from 'react-redux';
// import ItemRow from './ItemRow';
import * as actions from '../../store/actions/index';
import TableItem from './TableItem';
import SeeBudgetforItem from './SeeBudgetforItem';
import ResumeBudget from './ResumeBudget';
import AddItemtoBudget from './AddItemtoBudget';
import EditRequestInfo from './EditRequestInfo';
import EditBudgetInfo from './EditBudgetInfo';
import { Link, Redirect } from 'react-router-dom';




class NewBudget extends Component {


    /* El formato de la vista NewBudget es.
            Componentes ItemRows -> Cada fila tiene los elementos de las requests.
                                 -> Cada ItemRows tiene dos botones. Crear y Ver.
            El boton Crear abre el componente AddItemtoBudget.
            El boton Ver abre el componente SeeBudgetForItem.
    
            El hijo ItemRows recoge de buena manera el state de AddItemtoBudget,
            y al recibirlo, envia inmediatamente los datos a la vista NewBudget. 
            Eso si, faltaria implementar que cada ItemRow tiene una Key. y que no 
            se sobreescribe, si no se que se agrega una.  
    */

    constructor(props) {
        super(props);
        this.state = {
            items: [],
            requestActual:{},
            indiceRequest: 0,
            openColapse: false,
            openAddItem: false,
            indiceItem: 0,
            indiceSeeItem:0,
            editItems:[],
            // esto se cambiara si es que se elimina la tabla
            estados:[
                {
                    idItemState:7,
                    name:"cotizado"
                },
                {
                    idItemState:2,
                    name:"pendiente"
                },
                {
                    idItemState:3,
                    name:"pendiente de entrega"
                },
                
            ],

            // budgetItem: {
            price: 0,
            totalprice: 0,
            weight: 0,
            measure: "",
            totalweight: 0,
            provider: '',
            estado: 0,
            comments: '',
            // },
            //Deberian todos los elementos de una budget
            date: '',
            expiration: '',
            payCondition:'',
            hora:'00:00',
            totalWeight: 0,
            total_price: 0,
            administration_price: 0,
            shipping_price: 0,
            true_price: 0,
            openEditInfo:false,
            openEditRequestInfo:false


        };

        this.addItemHandler = this.addItemHandler.bind(this);
        this.calculatePrices = this.calculatePrices.bind(this);
        // this.collapseHandler = this.collapseHandler.bind(this);
        this.toggleAddItem = this.toggleAddItem.bind(this);
        this.toggleSeeItem = this.toggleSeeItem.bind(this);
        this.handlerSeeItem = this.handlerSeeItem.bind(this);
        this.handlerOpenAddItem = this.handlerOpenAddItem.bind(this);
        this.inputHandler = this.inputHandler.bind(this);
        this.sendBudget= this.sendBudget.bind(this);
        this.editBudget= this.editBudget.bind(this);
        this.editRequest= this.editRequest.bind(this);
        this.toggleInfo=this.toggleInfo.bind(this);
        this.toggleRequestInfo=this.toggleRequestInfo.bind(this);

    }

    //Cuando monta el DOM, entonces deberia realizar esto
    componentDidMount() {
        //Carga los elementos de una request
        // this.props.onFetchRequest();
        if(this.props.match.params.update === "notf"){
            // console.log("vengo de notificacion");
            this.props.onFetchRequests(this.props.userId, this.props.userType, 0);
        }

        let indiceRequest = this.props.requests.findIndex(
            (req) => req.idRequest == this.props.match.params.idRequest);
            console.log("REQUEST",this.props.requests[indiceRequest])
            
            if(this.props.requests[indiceRequest].state === 'Cotizacion' ||
            this.props.requests[indiceRequest].state === 'Autorizada'){
               
                let itemsActuales = this.props.requests[indiceRequest].items.map(item => ({ ...item}))
                let editItems=this.props.requests[indiceRequest].items.map(item=>true)
                this.setState({
                    items: itemsActuales,
                    indiceRequest: indiceRequest,
                    editItems:editItems,
                    total_price:this.props.requests[indiceRequest].totalPrice,
                    shipping_price:this.props.requests[indiceRequest].shippingPrice,
                    administration_price:this.props.requests[indiceRequest].administrationPrice,
                    totalWeight:this.props.requests[indiceRequest].totalWeight,
                    payCondition:this.props.requests[indiceRequest].payCondition,
                    expiration:this.props.requests[indiceRequest].expirationBudget

                })
        
            }
            else{

                let itemsActuales = this.props.requests[indiceRequest].items.map(item => ({ ...item,totalWeight:0,totalPrice:0}))
                let editItems=this.props.requests[indiceRequest].items.map(item=>false)
                this.setState({
                    items: itemsActuales,
                    indiceRequest: indiceRequest,
                    editItems:editItems
                })
                
            }
    }

    toggleInfo(){
        this.setState({
            openEditInfo:!this.state.openEditInfo
        })
    }

    toggleRequestInfo(){
        this.setState({
            openEditRequestInfo:!this.state.openEditRequestInfo
        })
    }
    handlerSeeItem(index){
        this.setState({
            indiceSeeItem:index,
            openColapse: true
        })
    }

    inputHandler(e) {

        let multiplicacion;
        const { value, name } = e.target;
        const indice = this.state.indiceItem;
        console.log("llegueeeee")
        if (name === 'price') {
            let valueInt= parseInt(value);
            console.log(typeof valueInt);
            isNaN(valueInt) && (valueInt=0);
    
            this.setState({
                [name]: valueInt,
                preciototal: valueInt*this.state.items[indice].quantity
            })
        }
        else if(name === 'weight'){
            let valueInt= parseInt(value);
            console.log(typeof valueInt);
            isNaN(valueInt) && (valueInt=0)
            this.setState({
                [name]: valueInt,
                pesototal: valueInt*this.state.items[indice].quantity
            })
        }
        else {
            console.log(name,value)
            this.setState({
                [name]: value
            })
        }


    }

    handlerOpenAddItem(index) {       
        // console.log("abirnedo item",index)
        this.setState({ indiceItem: index }, ()=>{this.toggleAddItem()})
    }

    /* Esta función deberia agregar a la budget los valores de cada item!*/
    addItemHandler(item) {
        // console.log('en addItemHandles en NB:', item)
        //Aqui se deberia hacer append

        let copiaItem = this.state.items.map(item=>({...item}))
        
        const i= this.state.indiceItem;
        console.log("agregando en item",i)
        copiaItem[i].price= this.state.price;
        copiaItem[i].totalPrice= this.state.preciototal;
        copiaItem[i].weight=this.state.weight;
        copiaItem[i].totalWeight=this.state.pesototal;
        copiaItem[i].comment=this.state.comments;
        copiaItem[i].distributor= this.state.provider;
        copiaItem[i].itemState=this.state.estados[this.state.estado]
        let editItems= [...this.state.editItems]
        editItems[i]=true;

        this.setState({
            items: copiaItem,
            editItems:editItems
        }, () => {
            this.calculatePrices()
            this.toggleAddItem();});
        
    }

    toggleAddItem() {
        this.setState({
            openAddItem: !this.state.openAddItem,
            
        }, ()=>{
            if(!this.state.openAddItem){
                this.setState({
                    price:0,
                    preciototal:0,
                    weight:0,
                    pesototal:0,
                    comments:0,
                    provider:'',
                    indiceItem:0
                })
            }

            else if (this.state.editItems[this.state.indiceItem]){
                let item = this.state.items[this.state.indiceItem]
                this.setState({
                    price:item.price,
                    preciototal:item.totalPrice,
                    weight:item.weight,
                    pesototal:item.totalWeight,
                    comments:item.comment,
                    provider:item.distributor,
                    
                })
            }
        })
    }

    toggleSeeItem() {
        this.setState({
            openColapse: !this.state.openColapse
        })
    }

    calculatePrices() {
        console.log("Entro a calculatePrices en NB");
        console.log("Largo de items: ", this.state.items.length);
        var preciototal = 0;
        var pesototal = 0;
        for (var i = 0; i < this.state.items.length; i++) {
            preciototal += this.state.items[i].totalPrice
            pesototal += this.state.items[i].totalWeight
        }
        pesototal = pesototal / 1000;
        console.log(preciototal)
        console.log(pesototal)
        //Calculo la sumatoria (VALOR NETO)
        //Aqui calculo todos los valores que van en budget
        this.setState({
            totalWeight: pesototal,
            total_price: preciototal,
            //El precio de despacho sera un 10% del precio total.
            shipping_price: preciototal * 0.1,
            //El precio de administracion sera un 1% del precio total.
            administration_price: preciototal * 0.01,
            //El VALOR TOTAL sera el precio total + un 19% (IVA)
            true_price: preciototal + (preciototal * 0.19)
        });


    }

    sendBudget() {
        // if (this.state.items.length === 3) {
        //     window.alert("¡La cotización fue enviada al aprobador!");
        // }
        // else {
        //     window.alert("Faltan elementos por cotizar")
        // }
        let request = {...this.props.requests[this.state.indiceRequest],
            items: this.state.items,
            totalPrice:this.state.total_price,
            shippingPrice:this.state.shipping_price,
            administrationPrice:this.state.administration_price,
            totalWeight:this.state.totalWeight,
            payCondition:this.state.payCondition,
            expirationBudget:this.state.expiration
        }
            

       
        console.log("NEW Budget",request);
        this.props.onBudgetAdded(this.props.userId,request);


    }

    editBudget(){

    }

    editRequest(){

    }

    render() {


        /*Esta función toma los items de los request (que por ahora viene en request.json) 
          los pone en un ItemRow (que entrega una fila) y lo guarda en la variable prueba*/
        return (
            <div>
                <h3>Cotizar solicitud:</h3>
                
                <div className="budget-content" >
                    <div className="budget-table">

                        {this.props.successBudget && <Redirect to='/requests' />}
                        <TableItem
                            items={this.state.items}
                            openAddItem={this.handlerOpenAddItem}
                            onSeeItem={this.handlerSeeItem}
                            editItems={this.state.editItems}
                        />
                        
                        {this.state.items.length > 0  &&
                        <AddItemtoBudget
                            price={this.state.price}
                            preciototal={this.state.preciototal}
                            weight={this.state.weight}
                            measure={this.state.measure}
                            totalWeight={this.state.pesototal}
                            comments={this.state.comments}
                            provider={this.state.provider}
                            estado={this.state.estado}
                            estados={this.state.estados}
                            toggle={this.toggleAddItem}
                            submitHandler={this.addItemHandler}
                            open={this.state.openAddItem}
                            inputHandler={this.inputHandler}
                            quantity={this.state.items[this.state.indiceItem].quantity}
                        />
                        }
                        {/* {this.state.items.length > 0  &&
                        <SeeBudgetforItem
                            // price={this.state.price}
                            // weight={this.state.weight}
                            // provider={this.state.provider}
                            // estado={this.state.estado}
                            // comments={this.state.comments}
                            item={this.state.items[this.state.indiceSeeItem]}
                            estadocolapso={this.state.openColapse}
                        />
                        } */}
                    </div>
                    {/* {this.state.indiceRequest &&  */}
                    
                    <div className="budget-resume">
                        <ResumeBudget
                        request={this.props.requests[this.state.indiceRequest]}
                        totalWeight={this.state.totalWeight}
                        shipping_price={this.state.shipping_price}
                        administration_price={this.state.administration_price}
                        total_price={this.state.total_price}
                        true_price={this.state.true_price}
                        payCondition={this.state.payCondition}
                        expiration={this.state.expiration}
                        hora={this.state.hora}
                        sendBudget={this.sendBudget}
                        onEditRequestInfo={this.toggleRequestInfo}
                        onEditBudgetInfo={this.toggleInfo}
                        />
                        <EditBudgetInfo
                           administrationPrice={this.state.administration_price}
                           shippingPrice={this.state.shipping_price}
                           open={this.state.openEditInfo}
                           onChangeForm={this.inputHandler} 
                           toggle={this.toggleInfo}
                           />
                        <EditRequestInfo 
                            toggle={this.toggleRequestInfo}
                            open={this.state.openEditRequestInfo}
                            onChangeForm={this.inputHandler}
                            payCondition={this.state.payCondition}
                            hora={this.state.hora}
                            expiration={this.state.expiration}
                        />
                        
                    </div>
                </div>
                <Link to={'/requests'}>
                    <Button color="secondary">Volver </Button>
                </Link>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        requests: state.request.requests,
        successBudget:state.request.budgetSuccess,
        loading: state.loading,
        userId:state.login.userId,
       
    userType: state.login.userType,
    };
}
const mapDispatchToProps = dispatch => {
    return {
        onBudgetAdded: (userId,budgetData) => dispatch(actions.addBudget(userId,budgetData)),
        onFetchRequests: (userId, userType, state) => dispatch(actions.fetchRequests(userId, userType, state)),
        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewBudget, axios);
