import React from 'react'
import CONFIG from '../App-config'
import Stars from './Stars'

function BookListItem(props){

    let b = props.book
    let thumbSrc="http://books.google.com/books/content?id="
    if (b.googleBooksId && b.googleBooksId !== ""){
        thumbSrc += b.googleBooksId
    } else {
        thumbSrc += "ZlU3DwAAQBAJ"
    }
    thumbSrc += "&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"

    // Google's snippet field contains escaped quote characters.  
    // Replace these with apostrophe and speech marks
    let snippet = b.snippet.replace(/&quot;/g, '"')
    snippet = snippet.replace(/&#39;/g, "'")

    return (
        <div className="card">
            {/* card-header: because card-body used for collapse element */}
            <div className="card-header">
                <div className="media">

                    <img 
                        src={thumbSrc}
                        className="mr-2 bl-thumb"
                        alt="book cover"
                    ></img>

                    <div className="media-body">
                        <div className="container-fluid row">

                            {/* Title & Author */}
                            <div className="col-3">
                                <h5 className="mt-0">{b.title || "loading"} </h5>
                                <div className="d-flex flex-row justify-content-between">
                                    <div>{b.author}   <span>{b.year ? <span>({b.year})</span> : <span></span>  }</span></div>
                                </div>
                                
                            </div>
                             {/* end: Title & Author */}
                            
                            <div className="col-6">
                                <p><small>{snippet}</small></p>
                            </div>

                            {/* Action Buttons */}
                            <div className="col-3">
                                <div className="row">
                                    
                                    {/* Status & Stars */}
                                    <div className="col-6">

                                        <div className="mr-1 mb-4"> 
                                            <select value={b.status} onChange={(e)=>{props.selectHandler(e, b._id)}}>
                                                <option value="wishlist">Wishlist</option>
                                                <option value="onOrder">On Order</option>
                                                <option value="purchased">Purchased</option>
                                                <option value="reading">Reading</option>
                                                <option value="read">Read</option>
                                            </select>
                                        </div>

                                        <div className="mr-1 ml-3">
                                            <Stars priority={b.priority}></Stars>
                                        </div>

                                    </div>
                                    {/* end: Status & Stars */}
   
                                    {/* Edit & Delete & details */}
                                    <div className="col-6">
                                        <div className="mr-1 ml-3 mb-3">
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

                                        <div className="">
                                            <button type="button" 
                                                        className="btn btn-link" 
                                                        data-toggle="collapse"
                                                        data-target={"#collapse" + b._id} 
                                            ><small>details...</small>
                                            </button>
                                        </div>
                                    
                                    </div>
                                    {/* end: Edit & Delete & details */}

                                </div>
                                
                            </div>
                            {/* end: Action Buttons */}

                        </div>
                  
                    </div>
                </div>
            </div>

            {/* Collapse Element - contains further details about book */}
            <div className="collapse" id={"collapse" + b._id} data-parent="#accordionList">
                <div className="card-body">
                    <h5>{b.title}{b.subtitle ? <span>: <small>{b.subtitle}</small></span> : <span></span>}</h5>
                    <div>
                        <p>
                            {b.description} 
                        </p>
                        <div className="row">

                        </div>
                        <div>{b.categories ? <span>{b.categories.join()}</span>: <span></span>}</div>
                        <div>{b.pages ? <span>{b.pages}pp</span> : <span></span>  }</div>
                        <div>{b.publisher ? <span>{b.publisher}</span> : <span></span> }</div>
                        <span>{b.isbn13 ? <span>ISBN: {b.isbn13}</span> : <span></span>}</span>
                    </div>
                </div>
            </div>
            
        </div>

    )
}

export default BookListItem

