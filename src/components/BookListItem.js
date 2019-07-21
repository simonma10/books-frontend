import React from 'react'
import CONFIG from '../App-config'

function BookListItem(props){

    let b = props.book
    let thumbSrc="http://books.google.com/books/content?id="
    if (b.googleBooksId && b.googleBooksId !== ""){
        thumbSrc += b.googleBooksId
    } else {
        thumbSrc += "ZlU3DwAAQBAJ"
    }
    thumbSrc += "&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"

    return (
        <li className="list-group-item"  >
			<div className="media">
                <img 
                    src={thumbSrc}
                    className="mr-3 bl-thumb"
                    alt="book cover"
                ></img>
                <div className="media-body">
                    <div className="d-flex w-100 justify-content-between">
                        <h5 className="mt-0">{b.title || "loading"} </h5>
                        <div className="d-flex w-25 justify-content-between">
                            <span> {b.status}</span>
                            <span>{b.priority}</span>
                            <div className="mr-1">
                                <span data-toggle="tooltip" data-placement="top" title="edit book">
                                    <span 
                                        style={{fontSize: "1.2em"}}
                                        className="mr-3 text-primary"
                                        data-toggle="modal"
                                        data-target={"#" + CONFIG.modalName}
                                        onClick={()=>{props.clickHandler(b._id)}}
                                    >
                                        <i className="fas fa-edit"></i>
                                    </span>
                                </span>

                                <span data-toggle="tooltip" data-placement="top" title="delete book">
                                    <span
                                        style={{fontSize: "1.2em"}}
                                        className="text-danger"
                                        data-toggle="modal"
                                        data-target=".yes-no-modal"
                                        onClick={()=>{props.clickHandler(b._id)}}
                                    >
                                        <i className="fas fa-trash-alt"></i>
                                    </span>
                                </span>
                                
                                
                            </div>
                            
                        </div>
                    </div>
                   
                    <span>{b.author} <small>{b.year}</small></span>
                </div>
            </div>
        </li>

    )
}

export default BookListItem