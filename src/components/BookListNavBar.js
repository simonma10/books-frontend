import React from 'react'
import Dropdown from './Dropdown'
import CONFIG from '../App-config'


function BookListNavBar(props){
    return(
        <nav className="navbar sticky-top navbar-expand-lg navbar-light bg-light" >  {/*  style={navbarStyle}   */} 
        <span className="navbar-brand mb-0 h1">My Booklist</span>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
       

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
                
                
            </ul>
          
                <div className="mr-1">
                    <Dropdown 
                        items={CONFIG.statusOptions}
                        activeItem={props.statusFilter}
                        buttonText="Status"
                        changeHandler={props.handleStatusFilterChange}
                    ></Dropdown>
                </div>
                <div className="mr-1">
                    <Dropdown 
                        items={CONFIG.priorityOptions}
                        activeItem={props.priorityFilter}
                        buttonText="Stars"
                        changeHandler={props.handlePriorityFilterChange}
                    ></Dropdown>
                </div>
               
            <form 
                className="form-inline my-2 my-lg-0" 
                onSubmit={((e)=>{e.preventDefault()}) }
            >
                <input 
                    className="form-control mr-sm-2"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    value={props.searchTerm}
                    onChange={(e)=>props.handleSearchChange(e.target.value)} />
                <button className="btn btn-outline-success my-2 my-sm-0" type="button" onClick={props.handleSearchClick}>Search</button>
            </form>
        </div> 
    </nav>

    )
}

export default BookListNavBar

