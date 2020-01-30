import React, { Component } from 'react';
import ListUser from './ListUser';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import AddUser from './AddUser';
import AddIcon from '@material-ui/icons/Add';
import { Button } from 'reactstrap';
import Spinner from '../../components/UI/Spinner';
import ListBuildingApprover from './ListBuildingApprover';

class Users extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openModal: false,
            name: '',
            email: '',
            password: '',
            rol: 0,
            roles: [
                'Manager'
                , 'Approver',
                'Buyer',
                'Driver'],
            rSelected: 1,
            // list approver
            openBuildings: false,
            checksApprover:[],
            approverActual:0,
            companySelect:0,
            buildingSelect:0


        }
        this.toggleModal = this.toggleModal.bind(this)
        this.toggleListBuilding=this.toggleListBuilding.bind(this)
        this.handlerOnAddUser = this.handlerOnAddUser.bind(this)
        this.handlerOnChangeForm = this.handlerOnChangeForm.bind(this)
        this.onRadioBtnClick = this.onRadioBtnClick.bind(this)
        this.handlerOnDeleteUser = this.handlerOnDeleteUser.bind(this)
        this.handlerOnListBuilding= this.handlerOnListBuilding.bind(this)
        this.handlerOnChangeCheck=this.handlerOnChangeCheck.bind(this)
        this.handlerOnAssignBuilding=this.handlerOnAssignBuilding.bind(this)


    }

    onRadioBtnClick(rSelected) {
        this.setState({ rSelected })
    }

    handlerOnAddUser() {
        let newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            role: this.state.roles[this.state.rol]

        }
        if (newUser.role === 'Manager') 
            newUser.building=this.props.buildings[this.state.buildingSelect];
        if (newUser.role === 'Approver') 
            newUser.company=this.props.companies[this.state.companySelect] ;
        console.log(newUser)

        this.props.onAddUser(newUser)

        this.setState({
            name: '',
            email: '',
            password: '',
            rol: '',
            openModal: false,
          

        })
    }

    toggleListBuilding(idCompany){
        this.setState({
            openBuildings: !this.state.openBuildings,
            approverActual:0,
            
        })

    }

    handlerOnListBuilding(idCompany,indiceUser){

        this.props.onFetchBuildings(idCompany)
        let check=this.props.buildings.map(buil=>{
            let indice = this.props.users[indiceUser].buildings.findIndex( 
                building=> building.idBuilding === buil.idBuilding )
                if(indice>-1) {console.log("true"); return true }
                
                return false;
        })
      
        console.log(check)
        this.setState({
            openBuildings:true,
            checksApprover:check,
            approverActual:indiceUser
        })

    }

    handlerOnChangeCheck(e,i){
       
        const check= e.target.checked
      
        let newChecked= [...this.state.checksApprover]
       
        newChecked[i]=check;
       
        this.setState({
            checksApprover:newChecked
        })
    }
    
    handlerOnAssignBuilding(){
        let userUpdate= {...this.props.users[this.state.approverActual]}
        userUpdate.buildings=this.props.buildings.filter((build,i)=>this.state.checksApprover[i])
        console.log(userUpdate)
        this.props.onAssingApprover(userUpdate);
        this.setState({
            openBuildings:false,
            approverActual:0,
            // checksApprover:[]
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

    handlerOnDeleteUser(idUser){
        const res= window.confirm("¿Esta seguro de que desea eliminar este usuario?")
        res && (this.props.onDeleteUser(idUser));
    }
    componentDidMount() {
        this.props.onFetchUsers();
    }
    render() {

        return (
            <div className="container">
                {/* <div className="col-md-11 d-flex justify-content-center">

                    <ButtonGroup>
                        <Button color="primary" onClick={() => this.onRadioBtnClick(1)} active={this.state.rSelected === 1}>Usuarios Gamat</Button>
                        <Button color="primary" onClick={() => this.onRadioBtnClick(2)} active={this.state.rSelected === 2}>Usuarios Externos</Button>

                    </ButtonGroup>
                </div> */}
               
                <div>
                    <div className="d-flex mb-3">
                        <h3>Lista de usuarios</h3>
                        <button className="btn btn-success ml-3" onClick={this.toggleModal}>Agregar <AddIcon /> </button>
                    </div>

                    <AddUser
                        name={this.state.name}
                        email={this.state.email}
                        password={this.state.password}
                        rol={this.state.rol}
                        roles={this.state.roles}
                        onChangeForm={this.handlerOnChangeForm}
                        onAddUser={this.handlerOnAddUser}
                        open={this.state.openModal}
                        toggle={this.toggleModal}
                        companies={this.props.companies}
                        companySelect={this.state.companySelect}
                        buildings={this.props.buildings}
                        buildingSelect={this.state.buildingSelect}
                        loadingBuilding={this.props.loadingBuilding}
                        />
                </div>

                <ListBuildingApprover
                    open={this.state.openBuildings}
                    toggle={this.toggleListBuilding}
                    buildings={this.props.buildings}
                    checks={this.state.checksApprover}
                    onChangeCheck={this.handlerOnChangeCheck}
                    onSaveBuildings={this.handlerOnAssignBuilding}
                    loadingBuilding={this.props.loadingBuilding}
                />
                    
                {this.props.loading ? <Spinner /> :
                    <ListUser 
                    users={this.props.users}
                    onDelete={this.handlerOnDeleteUser} 
                    onListBuilding={this.handlerOnListBuilding}
                    />
                }
            </div>
        );
    }
}



const mapStateToProps = state => {
    return {
        users: state.user.users,
        loading: state.user.loading,
        buildings: state.building.buildings,
        loadingBuilding: state.building.loadingBuilding,
        companies: state.building.companies

    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchUsers: () => dispatch(actions.fetchUsers()),
        onAddUser: (newUser) => dispatch(actions.addUser(newUser)),
        onDeleteUser: (idUser) => dispatch(actions.deleteUser(idUser)),
        onFetchBuildings: (idCompany)=> dispatch(actions.fetchBuildings(idCompany)),
        onAssingApprover: (approver) => dispatch(actions.updateAssingApprover(approver)),
        onFecthCompanies: () => dispatch(actions.fetchCompanies())


    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Users);

