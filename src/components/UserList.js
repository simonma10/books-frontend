import React, {Component} from 'react'
import axios from 'axios'
import CONFIG from '../App-config'
import UserEdit from './UserEdit'

class UserList extends Component {
    constructor(props){
        super(props)
        const user = JSON.parse(localStorage.getItem('user'))
        this.state={
            users:[],
            isUsersLoading: false,
            user: user,
            editUser: {
                _id: "",
                username: "",
                password: "",
                email: "",
                role: "",
                active: true
            },
            mode: ""
        }

        this.handleEditClick = this.handleEditClick.bind(this)
        this.handleEditChange = this.handleEditChange.bind(this)
        this.handleEditSubmit = this.handleEditSubmit.bind(this)
    }

    componentDidMount(){
        if (this.state.user === null){
            console.log('user not loaded')
        }
        this.getUsers()
    }

    getRequestOptions(){
        const authdata = this.state.user.authdata
		return {
			headers: { 'Authorization': 'Basic ' + authdata }
        }
    }

    getUsers(){
		this.setState({ ...this.state, isUsersLoading: true} ) 
        const url = CONFIG.usersUrl
        const requestOptions = this.getRequestOptions()
        axios.get(url, requestOptions)
      		.then((response) => {
        	this.setState({
				users: response.data,
				isUsersLoading: false
            })
      	})
		.catch((error) => {
			console.log(error)
			this.setState({
				error: true,
				isUsersLoading: false
			})
		});
    }
    
    updateUser(user){
        const url = CONFIG.usersUrl
        axios.patch(url, user, this.getRequestOptions())
      		.then((response) => {
        	if (response.status === 200){
				console.log("User updated successfully")
				this.getUsers()
			}
      	})
		.catch((error) => {
			console.log("Error updating user")
		});
    }

    deleteUser(user){
        console.log('deleteUser', user)
		const url = CONFIG.usersUrl + "?id=" + user._id
		
		axios.delete(url, this.getRequestOptions())
      		.then((response) => {
        	if (response.status === 200){
				console.log("User deleted successfully")
				this.getUsers()
			}
      	})
		.catch((error) => {
			console.log(error)
		})
    }

    createUser(user){
		const url = CONFIG.usersUrl
		
		axios.post(url, user, this.getRequestOptions())
      		.then((response) => {
        	if (response.status === 200){
				console.log(user.username, "created successfully")
				//this.toaster.current.addToast({message: `User added: '${user.username}'`})
				this.getUsers()
			}
      	})
		.catch((error) => {
			console.log(error)
		})
    }
    
    toggleActive(user){
        let updateUser = user
        updateUser.active = !updateUser.active
        this.updateUser(updateUser)
    }
    
    handleEditClick(user){
        if (user === "New"){
            this.setState({
                editUser: {
                    _id: "",
                    username: "",
                    password: "",
                    email: "",
                    role: "",
                    active: true
                },
                mode: "New"
            })
        } else {
            this.setState({
                editUser: user,
                mode: "Edit"
            })
        }
        
    }

    handleEditChange(name, value){
        this.setState({
            editUser:{
                ...this.state.editUser,
                [name]: value
            }
        })
        //console.log(name, value)

    }
    handleEditSubmit(){
        //console.log('update User:\n', this.state.editUser)
        if (this.state.mode === "New"){
            this.createUser(this.state.editUser)
        } else {
            this.updateUser(this.state.editUser)
        }
        
    }

    renderUserList(){
        if(this.state.users.length > 0){
            return this.state.users.map((u, index)=>[
                
                <div className="row mb-2" key={index}>
                    <div className="col-3">{u.username}</div>
                    <div className="col-5">{u.email}</div>
                    <div className="col-1">{u.role}</div>
                    <div className="col-1">
                        <button className="btn btn-primary btn-sm" 
                            data-toggle="modal"
                            data-target=".user-edit-modal"
                            onClick={()=>this.handleEditClick(u)}
                        >
                            <span>EditUser</span>
                        </button>
                    </div>
                    <div className="col-1">
                        <button 
                            className="btn btn-warning btn-sm"
                            onClick={()=>{this.toggleActive(u)}}
                        >
                            {u.active ? <span>Deactivate</span> : <span>Activate</span>}
                        </button>
                    </div>
                    
                    <div className="col-1">
                        <button 
                            className="btn btn-danger btn-sm"
                            onClick={()=>{this.deleteUser(u)}}
                        >Delete</button>
                    </div>
                </div>
           ]
               
           )
        }
    }

    renderSpinner(){
        return (
            <div className="text-center mt-3">
                <div className="spinner-border text-secondary" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        )
    }

    render(){
        return(
            <div>
                <nav className="navbar sticky-top navbar-expand-lg navbar-light bg-light" >  {/*  style={navbarStyle}   */} 
                    <span className="navbar-brand mb-0 h1">Users</span>
                </nav>
                <div className="row justify-content-center">
                   
                    <div className="col-11">
                        
                        <div className="row">
                            <div className="col-3"><strong>Username</strong></div>
                            <div className="col-5"><strong>Email</strong></div>
                            <div className="col-1"><strong>Role</strong></div>
                            <div className="col-3 text-center"><strong>Actions</strong></div>
                        </div>
                        <hr></hr>
                    </div>
                    <div className="col-11">
                        { this.state.isUsersLoading ? this.renderSpinner() :  this.renderUserList()}
                    </div>
                    <UserEdit
                        user={this.state.editUser}
                        handleChange={this.handleEditChange}
                        handleSubmit={this.handleEditSubmit}
                        mode={this.state.mode}
                    ></UserEdit>
                   
                </div>
               
                    <div className="row justify-content-center">
                       
                        <div className="col-11 justify-content-end">
                            <hr></hr>
                            <button 
                                className="btn btn-success btn-sm"
                                data-toggle="modal"
                                data-target=".user-edit-modal"
                                onClick={()=>{this.handleEditClick("New")}}
                            >New User</button>
                        </div>

                    </div>
                    
            </div>
        )
    }
}

export default UserList