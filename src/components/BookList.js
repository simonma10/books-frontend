import React, {Component} from 'react'
import BookListItem from './BookListItem'
import CONFIG from '../App-config'

class BookList extends Component {

    renderBookListItems(){
        if(this.props.books){
            return this.props.books.map((b)=>[
                <BookListItem 
                    book={b}
                    bookUpdatingId={this.props.bookUpdatingId}
                    key={b._id}
                    clickHandler={this.props.clickHandler}
                    selectHandler={this.props.selectHandler}
                    handleStarClick={this.props.handleStarClick}
                ></BookListItem>
           ]
               
           )
        }
    }

    renderSpinner(){
        return (
            <div className="text-center mt-3">
                <div className="spinner-border text-secondary" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        )
    }

    renderBookList(){
        return (
            <div>
                <div className="accordion" id="accordionList">
                    {this.renderBookListItems()}
                </div>
                <div className="d-flex justify-content-end">
                    <div className="mr-2">
                        <span data-toggle="tooltip" data-placement="top" title="new book">
                            <span 
                                className="mr-3 text-success"
                                data-toggle="modal"
                                data-target={"#" + CONFIG.modalName}
                                onClick={()=>{this.props.newHandler()}}
                            >
                                <span style={{fontSize: "1.2em"}}>
                                    <i className="far fa-plus-square"></i>
                                </span>
                                <span className="ml-2">Add</span>
                                

                            </span>
                        </span>
                    </div>
                </div>
            </div>
        )

    }

    render(){
        return (
            <div className="row justify-content-center">
                <div className="col-11">
                    { this.renderBookList() }
                    { this.props.isLoading ? this.renderSpinner() :  <span></span>}
                   
                </div>
            </div>
        )
    }
}

export default BookList
