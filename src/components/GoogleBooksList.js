import React from 'react'

function renderSpinner(){
	return (
		<div className="text-center mt-3">
			<div className="spinner-border text-secondary" role="status">
				<span className="sr-only">Loading...</span>
			</div>
		</div>
	)
}

function renderBookList(props){
	return (
		<div>
			{props.books.length > 0 ?
					<table className="table table-hover">
						<thead>
							<tr>
								<th scope="col">Title</th>
								<th scope="col">Subtitle</th>
								<th scope="col">Author(s)</th>
								<th>?</th>
								
							</tr>
						</thead>

						<tbody>
							{props.books.map((book, index)=>{
								return (
									<tr key={index}>
										<th scope="row"><small>{book.title}</small></th>
										<td><small>{book.subtitle}</small></td>
										<td><small>{book.authors ? book.authors.join() : ""}</small></td>
										<td>
											<span className="text-secondary" onClick={function(){ props.handleGoogleBookSelect(book.googleBooksId)}}>
												<i className="fas fa-arrow-circle-right"></i>
											</span>
										</td>
									</tr>
								)
							})}

						</tbody>
					</table>
				:
					<span></span>
				}


		</div>
	)
}


function GoogleBooksList(props){

    return(
       <div>

		   {props.isGoogleLoading ? <div>{renderSpinner() }</div> : <div>{ renderBookList(props) }</div>}

		 </div>
    )
}

export default GoogleBooksList