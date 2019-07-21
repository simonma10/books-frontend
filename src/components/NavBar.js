import React, {Component} from 'react'

class NavBar extends Component{
    constructor(props){
        super(props)
        this.handleSearchChange = this.handleSearchChange.bind(this)
        this.handleSearchClick = this.handleSearchClick.bind(this)
    }

    handleSearchChange(e){
        const value = e.target.value
        this.props.handleSearchChange(value)
    }
    handleSearchClick(){
        this.props.handleSearchClick()
    }

    render(){
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <span className="navbar-brand mb-0 h1"><i className="fas fa-book"></i> Funky Books</span>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
    
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        
                    </ul>
                    <form className="form-inline my-2 my-lg-0">
                        <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" value={this.props.searchTerm} onChange={this.handleSearchChange} />
                        <button className="btn btn-outline-success my-2 my-sm-0" type="button" onClick={this.handleSearchClick}>Search</button>
                    </form>
                </div> 
            </nav>
        )
    }
   
}

export default NavBar