import React from 'react'

function UserEdit(props){
    return (
        <div className="modal fade user-edit-modal" tabIndex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                <form>

                    <div className="modal-header">
                        <h5>{props.mode} User</h5>
                    </div>
    
                    <div className="modal-body">
                     
                            <div className="form-group">
                                <label htmlFor="editUserUsername">Username</label>
                                <input type="text" className="form-control" id="editUserUsername" aria-describedby="usernameHelp" placeholder="Enter username"
                                    value={props.user.username} name="username" onChange={function(e) { props.handleChange(e.target.name, e.target.value)}  } />
                            </div>
                            <div className="form-group">
                                <label htmlFor="editUserPassword">Password</label>
                                <input type="password" className="form-control" id="editUserPassword" aria-describedby="usernameHelp" placeholder="Enter password"
                                    value={props.user.password} name="password" onChange={function(e) { props.handleChange(e.target.name, e.target.value)}  } />
                            </div>
                            <div className="form-group">
                                <label htmlFor="editUserEmail">Email</label>
                                <input type="email" className="form-control" id="editUserEmail" placeholder="Email address" 
                                    value={props.user.email} name="email" onChange={function(e) { props.handleChange(e.target.name, e.target.value) } } />
                            </div>
                            <div className="row">
                                <div className="form-group col-8">
                                    <label htmlFor="editUserRole">Role</label>
                                    <select
                                        value={props.user.role || ""}
                                        onChange={(e)=>{props.handleChange(e.target.name, e.target.value)}}
                                        className="form-control"
                                        id="editUserRole"
                                        name="role"
                                    >
                                        <option value="guest">Guest</option>
                                        <option value="user">User</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                    
                                </div>
                                <div className="form-group form-check col-4">

                                    
                                    <input type="checkbox" className="form-check-input" id="editUserActive" 
                                     checked={props.user.active} name="active" onChange={function(e) { props.handleChange(e.target.name, !props.user.active) } } />
                                    <label className="form-check-label" htmlFor="editUserActive">Active</label>


                                </div>

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

export default UserEdit