import React, {Component} from 'react'
import axios from 'axios'
import './App.css'
import NavBar from './components/NavBar'
import BookList from './components/BookList'
import BookEditModal from './components/BookEditModal'
import YesNoModal from './components/YesNoModal'
import LoginModal from './components/LoginModal'
import CONFIG from './App-config'

class App extends Component {

	constructor(){
		super()
		this.state={
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
			modalMode:"edit",
			searchTerm:"",
			yesNoModal:{
				text:'Do you really want to delete '
			},
			googleBooksData: {},
			statusFilter: "none",
			priorityFilter: "none",
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
			}
		}

		this.handleListItemClick = this.handleListItemClick.bind(this)
		this.handleEditModalChange = this.handleEditModalChange.bind(this)
		this.handleEditModalSave = this.handleEditModalSave.bind(this)
		this.handleSearchClick = this.handleSearchClick.bind(this)
		this.handleSearchChange = this.handleSearchChange.bind(this)
		this.deleteActiveBook = this.deleteActiveBook.bind(this)
		this.handleNewClick = this.handleNewClick.bind(this)
		this.handleGoogleLookup = this.handleGoogleLookup.bind(this)
		this.handleGoogleBookSelect = this.handleGoogleBookSelect.bind(this)
		this.handleSelectChange = this.handleSelectChange.bind(this)
		this.handleStatusFilterChange = this.handleStatusFilterChange.bind(this)
		this.handlePriorityFilterChange = this.handlePriorityFilterChange.bind(this)
		this.handleLoginChange = this.handleLoginChange.bind(this)
		this.handleLoginSubmit = this.handleLoginSubmit.bind(this)
		this.handleLogout = this.handleLogout.bind(this)

		const localUser = JSON.parse(localStorage.getItem('user'))
		if(localUser) {
			this.state.user = localUser
		}
		
		/* if(user && user.username !== ""){
			this.setState({
				user: {
					_id: user._id,
					username: user.username,
					email: user.email,
					role: user.role,
					authdata: user.authdata
				}
			})
		} */
	}

	componentDidMount(){
		this.getBookList()
		// Initialize Bootstrap tooltips and popovers
		window.$(function () {
			window.$('[data-toggle="tooltip"]').tooltip()
			window.$('[data-toggle="popover"]').popover()
			window.$('.toast').toast()
		})
	}

	setActiveBook(id){
		let result = this.state.books.filter(book => book._id === id)
		this.setState({
			activeBook: result[0],
			modalMode: "edit"
		})
		//this.getGoogleBooksData(result[0].title)
	}

	async getBookList(q = ""){
		let param = (q === "" ? "" : "?title=" + q )
		const url = CONFIG.baseUrl + param
		const requestOptions = await this.getAuth()
        axios.get(url, requestOptions)
      		.then((response) => {
        	this.setState({
				books: response.data,
				booksCache: response.data
        	})
      	})
		.catch((error) => {
			console.log(error)
			this.setState({
				error: true
			})
		});
	}

	filterBookList(type, value){
		let filteredList=[]
		if (type === "status"){
			if (value === "none"){
				// reset the filtered list
				filteredList = this.state.booksCache
				// reset the value of the other filter
				this.setState({
					priorityFilter: "none"
				})
			} else {
				filteredList = this.state.booksCache.filter(book => book.status === value)
			}
			
		} else if (type === "priority"){
			if (value === "none"){
				filteredList = this.state.booksCache
				// reset the value of the other filter
				this.setState({
					statusFilter: "none"
				})
			} else {
				filteredList = this.state.booksCache.filter(book => book.priority === parseInt(value))
			}
			
		}
		if (filteredList !== []){
			this.setState({
				books: filteredList
			})
		}
	}

	async createBook(book){
		//console.log(book)
		const url = CONFIG.baseUrl
		const requestOptions = await this.getAuth()
		axios.post(url, book, requestOptions)
      		.then((response) => {
        	if (response.status === 200){
				console.log(book.title, "created successfully")
				this.getBookList()
			}
      	})
		.catch((error) => {
			this.setState({
				error: true
			})
		});
	}

	async deleteBook(id){
		const url = CONFIG.baseUrl + "?id=" + id
		const requestOptions = await this.getAuth()
		axios.delete(url, requestOptions)
      		.then((response) => {
        	if (response.status === 200){
				console.log("deleted successfully")
				this.getBookList()
			}
      	})
		.catch((error) => {
			this.setState({
				error: true
			})
		});
	}

	async updateBook(book){
		const url = CONFIG.baseUrl
		const requestOptions = await this.getAuth()
		axios.patch(url, book, requestOptions)
      		.then((response) => {
        	if (response.status === 200){
				console.log(book.title, "updated successfully")
				this.getBookList()
			}
      	})
		.catch((error) => {
			this.setState({
				error: true
			})
		});
	}

	async getGoogleBooksData(title){
		//console.log(book)
		const url = CONFIG.searchUrl + "?q=" + title
		const requestOptions = await this.getAuth()
		axios.get(url, requestOptions)
      		.then((response) => {
				//console.log(response.data)
				this.setState({
					googleBooksData: response.data
			  	})
      	})
		.catch((error) => {
			this.setState({
				error: true
			})
		});

	}

	handleEditModalChange(name, value){
		//console.log('handleEditModalChange: ', name, value)
        this.setState({
			activeBook: {
				...this.state.activeBook,
				[name]: value
			}
		})
	}
	handleEditModalSave(){
		if(this.state.modalMode === "new"){
			this.createBook(this.state.activeBook)
		} else {
			this.updateBook(this.state.activeBook)
		}
		
	}

	handleListItemClick(id){
		this.setActiveBook(id)
	}

	handleSearchChange(value){
		this.setState({
			searchTerm:value
		})
		if (value === "") {
			this.getBookList()
		}
	}

	handleSearchClick(e){
		//console.log('handleSearchClick', this.state.searchTerm)
		this.getBookList(this.state.searchTerm)
	}

	deleteActiveBook(){
		console.log('delete ', this.state.activeBook._id)
		this.deleteBook(this.state.activeBook._id)
	}

	handleNewClick(){
		this.setState({
			modalMode: "new",
			activeBook: {
				id: "",
				title:"",
				author: "",
				year: 0,
				status: "",
				priority: 0,
				userid: this.state.user._id
			},
			googleBooksData: {}
		})
	}
	handleGoogleLookup(){
		this.getGoogleBooksData(this.state.activeBook.title)
	}

	handleGoogleBookSelect(id){
		let filter = this.state.googleBooksData.filter(book => book.googleBooksId === id)
		let f = filter[0]
		let author = f.authors.join()
		this.setState({
			activeBook:{
				...this.state.activeBook,
				googleBooksId: id,
				title: f.title,
				author: author,
				categories: f.categories,
				description: f.description,
				isbn10: f.isbn10,
				isbn13: f.isbn13,
				pages: f.pages,
				publisher: f.publisher,
				snippet: f.snippet,
				subtitle: f.subtitle,
				date: f.date
			}
		})
	}

	async handleSelectChange(e, id){
		//let v = e.target.getAttribute("dataValue")
		let v = e.target.value
		//console.log(v, id)
		for (let i = 0; i < this.state.books.length; i ++){
			if (this.state.books[i]._id === id){
				await this.setActiveBook(id)
				
				await this.setState({
					activeBook: {
						...this.state.activeBook,
						status: v
					}	
				})
				
				await this.updateBook(this.state.activeBook)
				
			}
		}

	}

	handleStatusFilterChange(e){
		this.setState({
			statusFilter: e
		})
		this.filterBookList("status", e)
	}

	handlePriorityFilterChange(e){
		this.setState({
			priorityFilter: e
		})
		this.filterBookList("priority", e)	
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
			this.getBookList()

      	})
		.catch((error) => {
			this.setState({
				error: true
			})
		});
	}

	handleLogout(){
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
			}
		})
		localStorage.removeItem('user')
	}
	
	getAuth(){
		const user = this.state.user
		const requestOptions={ 
			headers: { 'Authorization': 'Basic ' + user.authdata }
		}
		return requestOptions
	}

	render(){
		return (
			<div>
				<NavBar 
					handleSearchClick={this.handleSearchClick} 
					searchTerm={this.state.searchTerm} 
					handleSearchChange={this.handleSearchChange}
					statusFilter={this.state.statusFilter}
					handleStatusFilterChange={this.handleStatusFilterChange}
					priorityFilter={this.state.priorityFilter}
					handlePriorityFilterChange={this.handlePriorityFilterChange}
					user={this.state.user}
					handleLogout={this.handleLogout}
				></NavBar>
				<BookList 
					books={this.state.books}
					clickHandler={this.handleListItemClick}
					selectHandler={this.handleSelectChange}
					newHandler={this.handleNewClick}
				></BookList>
				<BookEditModal
					book={this.state.activeBook}
					handleChange={this.handleEditModalChange}
					handleSave={this.handleEditModalSave}
					mode={this.state.modalMode}
					googleBooksData={this.state.googleBooksData}
					handleGoogleLookup={this.handleGoogleLookup}
					handleGoogleBookSelect={this.handleGoogleBookSelect}
				></BookEditModal>
				<YesNoModal msg={this.state.yesNoModal.text + this.state.activeBook.title + '?'} handleOkClick={this.deleteActiveBook} ></YesNoModal>
				<LoginModal login={this.state.login} handleChange={this.handleLoginChange} handleSubmit={this.handleLoginSubmit}></LoginModal>

				<footer >
					<p></p>
					<p></p>
				</footer>
			</div>
		  );

	}
  
}

export default App;