import React from 'react'

function GoogleBooksList(props){

    return(
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
			
					{props.books.map((book)=>{
						return (
							<tr key={book.googleBooksId}>
								<th scope="row"><small>{book.title}</small></th>
								<td><small>{book.subtitle}</small></td>
								<td><small>{book.authors}</small></td>
								<td><input type="checkbox" className="form-check-input" id={book.googleBooksId} onClick={function(){
									props.handleGoogleBookSelect(book.googleBooksId)
									}} /></td>
						
							</tr>
						)
					})}

				</tbody>
    		</table>
			
		:
			<span>...</span>
		}
			
			
		 </div>
    )
}

export default GoogleBooksList