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
			
					{props.books.map((book, index)=>{
						return (
							<tr key={index}>
								<th scope="row"><small>{book.title}</small></th>
								<td><small>{book.subtitle}</small></td>
								<td><small>{book.authors ? book.authors.join() : ""}</small></td>
								<td>
									<span className="text-secondary" onClick={function(){ props.handleGoogleBookSelect(book.googleBooksId)}}>
										<i class="fas fa-arrow-circle-right"></i>
									</span>
								</td>
						
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