import React, {Component} from 'react'
import Dropdown from './Dropdown'
import CONFIG from '../App-config';


class NavBar extends Component{
    constructor(props){
        super(props)
        this.handleSearchChange = this.handleSearchChange.bind(this)
        this.handleSearchClick = this.handleSearchClick.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleStatusFilterChange = this.handleStatusFilterChange.bind(this)
        this.handlePriorityFilterChange = this.handlePriorityFilterChange.bind(this)
        this.handleLogout = this.handleLogout.bind(this)
    }

    handleSearchChange(e){
        const value = e.target.value
        this.props.handleSearchChange(value)
    }
    handleSearchClick(){
        this.props.handleSearchClick()
    }
    handleSubmit(e){
        this.props.handleSearchClick()
        e.preventDefault()
    }
    handlePriorityFilterChange(e){
        this.props.handlePriorityFilterChange(e)
    }
    handleStatusFilterChange(e){
        //console.log(e)
        this.props.handleStatusFilterChange(e)
    }

    handleLogout(){
        this.props.handleLogout()
    }

    render(){
        const username = this.props.user.username || ""
        //const navbarStyle = {backgroundColor: "#ccd3d6"}
        return (
        <nav className="navbar sticky-top navbar-expand-lg navbar-light bg-light" >  {/*  style={navbarStyle}   */} 
                <span className="navbar-brand mb-0 h1"><i className="fas fa-book"></i> Funky Books</span>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="ml-4 mr-2">
                    {   username === "" ? 
                        <button type="button" className="btn btn-outline-primary btn-sm" data-toggle="modal" data-target=".login-modal">Login</button> : 
                        <div className="row"><div className="mr-1 d-flex flex-column justify-content-center">{username}</div><button type="button" className="btn btn-outline-secondary btn-sm" onClick={this.handleLogout}>Logout</button> </div> 
                    }
                </div>
    
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        
                        
                    </ul>
                  
                        <div className="mr-1">
                            <Dropdown 
                                items={CONFIG.statusOptions}
                                activeItem={this.props.statusFilter}
                                buttonText="Status"
                                changeHandler={this.handleStatusFilterChange}
                            ></Dropdown>
                        </div>
                        <div className="mr-1">
                            <Dropdown 
                                items={CONFIG.priorityOptions}
                                activeItem={this.props.priorityFilter}
                                buttonText="Stars"
                                changeHandler={this.handlePriorityFilterChange}
                            ></Dropdown>
                        </div>
                       
                    <form className="form-inline my-2 my-lg-0" onSubmit={this.handleSubmit}>
                        <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" value={this.props.searchTerm} onChange={this.handleSearchChange} />
                        <button className="btn btn-outline-success my-2 my-sm-0" type="button" onClick={this.handleSearchClick}>Search</button>
                    </form>
                </div> 
            </nav>
        )
    }
   
}

export default NavBar