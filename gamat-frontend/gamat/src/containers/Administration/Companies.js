import React, { Component } from 'react';
import ListCompany from './ListCompany';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import AddCompany from './AddCompany';
import AddBuilding from './AddBuilding';
import AddIcon from '@material-ui/icons/Add';
import Spinner from '../../components/UI/Spinner';
import ListBuilding from './ListBuilding';
// import { Disposable } from 'rx';

class Companies extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openModalComp: false,
            openModalBuild:false,
            openListBuilding: false,
            nameCompany: '',
            nameBuilding: '',
            addressBuilding: '',
            companyActual:0

        }

        this.toggleModal = this.toggleModal.bind(this)
        this.toggleModalBuild= this.toggleModalBuild.bind(this)
        this.toggleListBuilding= this.toggleListBuilding.bind(this)
        this.handlerOnAddCompany = this.handlerOnAddCompany.bind(this)
        this.handleOnDeleteCompany=this.handleOnDeleteCompany.bind(this)
        this.handlerOnAddBuilding = this.handlerOnAddBuilding.bind(this)
        this.handleOnDeleteBuilding= this.handleOnDeleteBuilding.bind(this)
        this.handlerOnChangeForm = this.handlerOnChangeForm.bind(this)
        this.handlerOnListBuilding= this.handlerOnListBuilding.bind(this)
        this.onRadioBtnClick = this.onRadioBtnClick.bind(this)

    }

    onRadioBtnClick(rSelected) {
        this.setState({ rSelected })
    }

    handlerOnAddCompany() {
        let newCompany = {
            name: this.state.nameCompany,
        }
        console.log("new",newCompany)
        this.props.onAddCompany(newCompany)

        this.setState({
            nameCompany: '',
            openModal: false
        })
    }

    handlerOnAddBuilding(){
        let newBuilding ={
            name: this.state.nameBuilding,
            address: this.state.addressBuilding
        }
        this.props.onAddBuilding(newBuilding,this.state.companyActual)
        
        this.setState({
            openListBuilding: false
        })
    }

    handlerOnChangeForm(e) {
        const value = e.target.value;
        const name = e.target.name;
        this.setState({
            [name]: value
        })
    }

    

    toggleModal() {

 

            this.setState({
                openModal: !this.state.openModal,
                nameCompany:''
                
            })
        
    }

    toggleModalBuild (idCompany){
        if(idCompany){
            this.setState({
                companyActual:idCompany
            })
        }
        this.setState({
            openModalBuild: !this.state.openModalBuild,
            nameBuilding:'',
            addressBuilding:''

        })
    }

    toggleListBuilding(){
        this.setState({
            openListBuilding: !this.state.openListBuilding
        })
    }
    componentDidMount() {
        this.props.onFetchCompanies();
        
    }

    handlerOnListBuilding(idCompany){
        this.props.onFetchBUildings(idCompany)
        this.setState({
            openListBuilding: true,
            companyActual:idCompany
        })

    }

    handleOnDeleteCompany(idCompany){
        const res= window.confirm("¿Esta seguro de que desea eliminar esta compañia?")
        res && (this.props.onDeleteCompany(idCompany));
    }

    handleOnDeleteBuilding(idBuilding){
        let res= window.confirm("¿Esta seguro de que desea eliminar esta obra?")
        res && (this.props.onDeleteBuilding(idBuilding,this.state.companyActual));

    }
    render() {

        return (
            <div className="container">
                <div>
                    <div className="d-flex mb-3">
                        <h3>Lista de empresas</h3>
                        <button className="btn btn-success ml-3" onClick={this.toggleModal}>Agregar <AddIcon /> </button>
                    </div>

                    <AddCompany
                        name={this.state.nameCompany}
                       
                        onChangeForm={this.handlerOnChangeForm}
                        onAddCompany={this.handlerOnAddCompany}
                        open={this.state.openModal}
                        toggle={this.toggleModal}
                        />

                    
                </div>
                    
                {this.props.loading ? <Spinner /> :
                    <ListCompany  
                        companies={this.props.companies}
                        toggle={this.toggleModalBuild}
                        onListBuilding={this.handlerOnListBuilding}
                        onDelete={this.handleOnDeleteCompany}

                    />
                }
                <ListBuilding
                    open={this.state.openListBuilding}
                    toggle={this.toggleListBuilding}
                    buildings={this.props.buildings}
                    loading={this.props.loadingBuilding}
                    onDelete={this.handleOnDeleteBuilding}
                />
                <AddBuilding
                        name={this.state.nameBuilding}
                        address={this.state.addressBuilding}
                        onChangeForm={this.handlerOnChangeForm}
                        open={this.state.openModalBuild}
                        toggle={this.toggleModalBuild}
                        onAddBuilding={this.handlerOnAddBuilding}
                        />
            </div>
        );
    }
}



const mapStateToProps = state => {
    return {
        loading: state.building.loading,
        companies:state.building.companies,
        buildings:state.building.buildings,
        loadingBuilding:state.building.loadingBuilding
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchCompanies: ()=> dispatch(actions.fetchCompanies()),
        onAddCompany: (newCompany)=> dispatch(actions.addCompany(newCompany)),
        onDeleteCompany :(idCompany) => dispatch(actions.deleteCompany(idCompany)),
        onFetchBUildings: (idCompany) => dispatch(actions.fetchBuildings(idCompany)),
        onAddBuilding: (newBuilding,idCompany) => dispatch(actions.addBuilding(newBuilding,idCompany)),
        onDeleteBuilding: (idBuilding,idCompany) => dispatch(actions.deleteBuilding(idBuilding,idCompany))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Companies);

