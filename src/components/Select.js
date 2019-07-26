import React from 'react'
import CONFIG from '../App-config'

function Select(props) {
    //let v = props.selectValue
    //let options = props.options
    let changeHandler = props.changeHandler || function(){console.log("missing changeHandler callback for select element")}
    let id = props.id || "select"
    let bookId = props.bookId || 0
    let bookStatus = props.bookStatus || ""

    // populate select element for different status options
    let statusOptions=[]
    let selectedIndex = -1
    for (let i = 0; i < CONFIG.statusOptions.length; i++){
        statusOptions.push(CONFIG.statusOptions[i])
        if (CONFIG.statusOptions[i] === bookStatus){
            selectedIndex = i
        }
    }

    let element = (
        <select 
            className="form-control"
            id={id}
            onChange={(e)=>{changeHandler(e, bookId)}}
        >
            {[statusOptions]}
        </select>
    )
    //element.select.selectedIndex = selectedIndex

    return (
       {element}                         
    )
}


export default Select