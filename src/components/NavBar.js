import React, {Component} from 'react'

class NavBar extends Component{
    constructor(props){
        super(props)
       
        this.handleLogout = this.handleLogout.bind(this)
    }

    handleLogout(){
        this.props.handleLogout()
    }

    render(){
        const username = this.props.user.username || ""
        //const navbarStyle = {backgroundColor: "#ccd3d6"}
        return (
        <nav className="navbar sticky-top navbar-expand-lg navbar-dark bg-dark" >  {/*  style={navbarStyle}   */} 
                <span className="navbar-brand mb-0 h1"><i className="fas fa-book"></i> Funky Books</span>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                
    
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <a className="nav-link" href="/">My BookList</a>
                    </li>
                    
                    {
                        this.props.user.role === "admin" ?
                            <li className="nav-item">
                                <a className="nav-link" href="/users">Users</a>
                            </li>
                        : <span></span>
                    }
                   
                        
                        
                    </ul>
                    <div className="ml-4 mr-2">
                    {   username === "" ? 
                        <button type="button" className="btn btn-primary btn-sm" data-toggle="modal" data-target=".login-modal">Login</button> : 
                        <div className="row"><div className="mr-1 d-flex flex-column justify-content-center text-light">{username}</div><button type="button" className="btn btn-secondary btn-sm" onClick={this.handleLogout}>Logout</button> </div> 
                    }
                    </div>
                  
                      
                </div> 
            </nav>
        )
    }
   
}

export default NavBar