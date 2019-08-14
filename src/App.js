import React, {Component} from 'react'
import axios from 'axios'
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import NavBar from './components/NavBar'
import './App.css'
import CONFIG from './App-config'
import UserList from './components/UserList'
import BookListContainer from './components/BookListContainer'
import LoginModal from './components/LoginModal'
import Toaster from './components/Toaster'

  
class App extends Component{
    constructor(){
        super()
        this.state={
            user:{
				_id:"",
				username: "",
				email: "",
				role: "",
				authdata: ""
			},
			login:{
				username:"",
				password:""
			},
			redirect: false
        }

        this.handleLoginChange = this.handleLoginChange.bind(this)
		this.handleLoginSubmit = this.handleLoginSubmit.bind(this)
		this.handleLogout = this.handleLogout.bind(this)

        const localUser = JSON.parse(localStorage.getItem('user'))
		if(localUser){
			this.state.user = {
                username: localUser.username,
                authdata: localUser.authdata,
                _id: localUser._id,
                email: localUser.email,
                role: localUser.role
			}
        }
        
        // Initialize Bootstrap tooltips and popovers
		window.$(function () {
			window.$('[data-toggle="tooltip"]').tooltip()
			window.$('[data-toggle="popover"]').popover()
			window.$('.toast').toast({autohide: true, delay: 5000})
        })
    }

    componentDidMount(){
        this.appToaster = React.createRef()
        this.bookListContainer = React.createRef()
	}

    handleLoginChange(name, value){
        this.setState({
			login: {
				...this.state.login,
				[name]: value
			}
		})
	}

	handleLoginSubmit(e){
		const url = CONFIG.loginUrl
		const username = this.state.login.username
		const password = this.state.login.password
		const authdata = window.btoa(username + ":" + password)

		const requestOptions={ 
			headers: { 'Authorization': 'Basic ' + authdata }
		}

		axios.get(url,requestOptions)
      	.then((response) => {
			//console.log(response)

			const u = response.data
			// store user details and basic auth credentials in local storage 
			// to keep user logged in between page refreshes
			const user = {
				_id:u._id,
				username: u.username,
				email: u.email,
				role: u.role,
				authdata: authdata
			}
            localStorage.setItem('user', JSON.stringify(user));
			this.setState({
				user: user,
				login:{
					username:"",
					password:""
				}
			})
			this.appToaster.current.addToast({message: `Login success!  Welcome ${user.username}`})
			this.bookListContainer.current.getBookList()

      	})
		.catch((error) => {
			this.setState({
				error: true
			})
			console.error(error)
			this.appToaster.current.addToast({message: `Login failed!  Please try again.`})
		});
	}

	handleLogout(){
		this.appToaster.current.addToast({message: `Logged out successfully.`})
		this.setState({
			books:[],
			booksCache:[],
			activeBook: {
				_id: "",
				title:"",
				author: "",
				year: 0,
				status: "none",
				priority: 0,
				googleBooksId:"",
				userid:""
			},
			user:{
				_id:"",
				username:"",
				email: "",
				role: "",
				authdata: ""
			},
			redirect: true
		})
		localStorage.removeItem('user')
	}

	setRedirect() {
		this.setState({
			redirect: true
		})
	}


	renderRedirect(){
		if (this.state.redirect) {
			return <Redirect to='/' />
		}
	}

    

    render(){
        //this.appToaster.current.addToast({message: "Blah!"})
        return(
            <div>
                <NavBar
                    user={this.state.user}
                    handleLogout={this.handleLogout}
                ></NavBar>
                
               
                <LoginModal login={this.state.login} handleChange={this.handleLoginChange} handleSubmit={this.handleLoginSubmit}></LoginModal>
                
                <Router>
                    <Route path="/" exact 
                        render={props => <BookListContainer ref={this.bookListContainer} {...props} user={this.state.user} />}
                    />
                    <Route path="/users/" component={UserList} />
					{this.renderRedirect()}
                </Router>
				<Toaster ref={this.appToaster}></Toaster>

            </div>
            
           
        )
    }

}

export default App

 // <Link to="/users/">Users</Link>