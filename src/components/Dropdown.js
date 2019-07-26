import React from 'react'

function renderItems(items=[], activeItem, changeHandler){
    return(
        items.map((item, index)=>{
            return(
                <div 
                    className={item.value === activeItem ? "dropdown-item active" : "dropdown-item"} 
                    key={index}
                    data-value={item.value}
                    onClick={((e)=>{changeHandler(e.target.getAttribute("data-value"))})}
                >
                    {item.name}
                </div>
            )
        })
    )
}

function Dropdown(props){
    // expecting props.items = array of objects with name and value, and activeItem = name of activeItem
    let iconIndicator = props.activeItem === "none" ? "fas fa-filter mr-1" : "fas fa-filter mr-1 text-warning"
    return(
        <div className="dropdown">
            <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <span><i className={iconIndicator}></i>{props.buttonText}</span>
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
               {renderItems(props.items, props.activeItem, props.changeHandler)}
            </div>
        </div>
    )
}

export default Dropdown