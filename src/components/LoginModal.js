import React from 'react'


function LoginModal(props){
    return (
        <div className="modal fade login-modal" tabIndex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
            <div className="modal-dialog">
               

                <div className="modal-content">

                <form>

                    <div className="modal-header">
                        <h5>Login</h5>
                    </div>
    
                    <div className="modal-body">
                     
                            <div className="form-group">
                                <label htmlFor="inputUsername">Username</label>
                                <input type="text" className="form-control" id="inputUsername" aria-describedby="usernameHelp" placeholder="Enter username"
                                    value={props.login.username} name="username" onChange={function(e) { props.handleChange(e.target.name, e.target.value)}  } />
                            </div>
                            <div className="form-group">
                                <label htmlFor="inputPassword">Password</label>
                                <input type="password" className="form-control" id="inputPassword" placeholder="" 
                                    value={props.login.password} name="password" onChange={function(e) { props.handleChange(e.target.name, e.target.value) } } />
                            </div>
                            
                            
                    </div>
                
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                        <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={props.handleSubmit}>Submit</button>
                    </div>
                    </form>
                </div>
                
            </div>
        </div>
    )
}

export default LoginModal