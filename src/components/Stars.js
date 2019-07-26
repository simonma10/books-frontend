import React from 'react'

let emptyStar = (
    <i className="far fa-star"></i>
)
let filledStar = (
    <i className="fas fa-star"></i>
)

function numToArray(n, nmax){
    let res=[]
    for (let i = 1; i < nmax+1; i++){
        if(i <= n){
            res.push(1)
        } else {
            res.push(0)
        }
    }
    return res
}

function Stars(props){
    let a = numToArray(props.priority, 5)
    return(
        <div className="row text-warning">
            {a.map((b, index)=>{
                return b === 1 ? <span key={index}>{filledStar}</span> : <span key={index}>{emptyStar}</span>
            })}

        </div>
    )

}

export default Stars