import React from 'react'


function YesNoModal(props){
    return (
        <div className="modal fade yes-no-modal" tabIndex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-body">
                        <span>{props.msg}</span>
                    </div>
                
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                        <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={props.handleOkClick}>OK</button>
                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default YesNoModal