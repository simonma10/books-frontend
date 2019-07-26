import React, {Component} from 'react'
import CONFIG from '../App-config'
import GoogleBooksList from './GoogleBooksList'

class BookEditModal extends Component {

    constructor(props){
        super(props)
        this.handleChange = this.handleChange.bind(this)
        this.handleSave = this.handleSave.bind(this)
        this.handleGoogleLookup = this.handleGoogleLookup.bind(this)
        this.handleGoogleBookSelect = this.handleGoogleBookSelect.bind(this)
    }

    handleChange(e){
        let name = e.target.name
        let value = e.target.value
        this.props.handleChange(name, value)
    }

    handleSave(){
        this.props.handleSave()
    }

    handleGoogleLookup(){
        this.props.handleGoogleLookup()
    }

    handleGoogleBookSelect(id){
        this.props.handleGoogleBookSelect(id)
    }

    render(){
        const b = this.props.book
        let modalTitle = "Edit Book"
        if(this.props.mode==="new"){
            modalTitle = "New Book"
        }
        return(
            
            <div className="modal fade" id={CONFIG.modalName} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-xl" role="document">
                    <div className="modal-content">

                        <form>

                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">{modalTitle}</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>

                            <div className="modal-body">

                                <div className="row">
                                    <div className="form-group col">
                                        <div className="input-group">
                                            <div className="input-group-prepend">
                                                <label htmlFor="bookTitle"><span id="titleHelp" className="input-group-text">Book Title</span></label>
                                            </div>

                                            <input type="text" className="form-control" id="bookTitle" aria-describedby="titleHelp" placeholder="Book Title" name="title" value={b.title} onChange={this.handleChange}/>

                                            <div className="input-group-append">
                                                <button type="button" className="btn btn-primary mb-3" onClick={this.handleGoogleLookup}>Google</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group col">
                                        <div className="input-group">
                                            <div className="input-group-prepend">
                                                <label htmlFor="bookAuthor"><small id="authorHelp" className="input-group-text">Author</small></label>
                                            </div>
                                            <input type="text" className="form-control" id="bookAuthor" aria-describedby="authorHelp" placeholder="Author" name="author" value={b.author} onChange={this.handleChange}/>
                                        </div>
                                    </div>
                                </div>  

                               
                                <div className="row">
                                    <div className="form-group col">
                                        <div className="input-group">
                                            <div className="input-group-prepend">
                                                <label htmlFor="bookStatus"> <small id="statusHelp" className="input-group-text">Status</small></label>
                                            </div>
                                            <input type="text" className="form-control" id="bookStatus" aria-describedby="statusHelp" placeholder="Status" name="status" value={b.status} onChange={this.handleChange}/>
                                        </div>
                                    </div>
                                    <div className="form-group col">
                                        <div className="input-group">
                                            <div className="input-group-prepend">

                                                <label htmlFor="bookYear"> <small id="yearHelp" className="input-group-text">First published</small></label>
                                            </div>
                                            <input type="text" className="form-control" id="bookYear" aria-describedby="yearHelp" placeholder="Year" name="year" value={b.year} onChange={this.handleChange}/>
                                        </div>                                       
                                    </div>
                                    <div className="form-group col">
                                        <div className="input-group">
                                            <div className="input-group-prepend">
                                                <label htmlFor="bookPriority"> <small id="priorityHelp" className="input-group-text">Priority</small></label>
                                            </div>
                                            <input type="text" className="form-control" id="bookPriority" aria-describedby="priorityHelp" placeholder="Priority" name="priority" value={b.priority} onChange={this.handleChange}/>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <GoogleBooksList books={this.props.googleBooksData} handleGoogleBookSelect={this.handleGoogleBookSelect}></GoogleBooksList>
                                </div>
                            </div>

                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                                <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.handleSave}>Save changes</button>
                            </div>

                        </form>
                           
                    </div>
				</div>
			</div>
        )
    }

}

export default BookEditModal
