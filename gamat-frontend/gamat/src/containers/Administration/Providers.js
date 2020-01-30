import React, { Component } from 'react';
import ListProvider from './ListProviders';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import AddProvider from './AddProvider';
import AddIcon from '@material-ui/icons/Add';
import { Button } from 'reactstrap';
import Spinner from '../../components/UI/Spinner';

class Providers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openModal: false,
            name: '',
            address: '',
            observation: '',
            schedule: '',

        }
        this.toggleModal = this.toggleModal.bind(this)
        this.handlerOnAddProvider = this.handlerOnAddProvider.bind(this)
        this.handlerOnChangeForm = this.handlerOnChangeForm.bind(this)
        this.handlerOnDeleteProvider = this.handlerOnDeleteProvider.bind(this)

    }


    handlerOnAddProvider() {
        let newProvider = {
            name: this.state.name,
            address: this.state.address,
            observation: this.state.observation,
            schedule: this.state.schedule,
        }

        this.props.onAddProvider(newProvider)

        this.setState({
            name: '',
            address: '',
            observation: '',
            schedule: '',
            openModal: false,
        })
    }
    
    handlerOnChangeForm(e) {
        const value = e.target.value;
        const name = e.target.name;
        if(name==='rol' && (value==1 || value==0)) this.props.onFecthCompanies();
        if(name==='rol' && value == 0) this.props.onFetchBuildings(this.props.companies[0].idCompany);
        if(name==='companySelect' && this.state.rol == 0) this.props.onFetchBuildings(this.props.companies[value].idCompany)
        this.setState({
            [name]: value
        })
    }


    toggleModal() {
        this.setState({
            openModal: !this.state.openModal,
            name:'',
            email:'',
            password:'',
            rol:0
        })
    }

    handlerOnDeleteProvider(idProvider){
        const res= window.confirm("¿Esta seguro de que desea eliminar este proveedor?")
        res && (this.props.onDeleteProvider(idProvider));
    }
    componentDidMount() {
        // this.props.onFetchProvider();
    }
    render() {

        return (
            <div className="container">
                <div>
                    <div className="d-flex mb-3">
                        <h3>Lista de proveedores</h3>
                        <button className="btn btn-success ml-3" onClick={this.toggleModal}>Agregar <AddIcon /> </button>
                    </div>

                    <AddProvider
                        name={this.state.name}
                        address={this.state.address}
                        observation={this.state.observation}
                        schedule={this.state.schedule}
                        onChangeForm={this.handlerOnChangeForm}
                        onAddProvider={this.handlerOnAddProvider}
                        open={this.state.openModal}
                        toggle={this.toggleModal}
                        />
                </div>

                {this.props.loading ? <Spinner /> :
                    <ListProvider 
                    providers={this.props.providers}
                    onDelete={this.handlerOnDeleteProvider} 
                    />
                }
            </div>
        );
    }
}



 const mapStateToProps = state => {
    return {
//         providers: state.provider.providers,
//         loading: state.provider.loading,
    };
};

const mapDispatchToProps = dispatch => {
    return {
//         onFetchProviders: () => dispatch(actions.fetchProviders()),
//         onAddProviderr: (newUser) => dispatch(actions.addUProvider(newUser)),
//         onDeleteProvider: (idUser) => dispatch(actions.deleteUProvider(idUser)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Providers);

