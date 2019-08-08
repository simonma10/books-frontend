import React, { Component } from 'react'


class Stars extends Component{

    constructor(props){
        super(props)
        this.state={
            bookId: props.bookId,
            starsFromProps: props.priority,
            starsTemp: 0
        }
        this.handleMouseOver = this.handleMouseOver.bind(this)
        this.handleMouseOut = this.handleMouseOut.bind(this)
        this.handleClick = this.handleClick.bind(this)
    }

    componentDidMount(){
        this.setState({
            starsTemp: this.state.starsFromProps
        })
    }

    emptyStar(){
        return (
            <i className="far fa-star"></i>
        )
    }
       
    filledStar(){
        return (
            <i className="fas fa-star"></i>
        )
    }
    
    
    numToArray(n, nmax=5){
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

    handleMouseOver(index){
        this.setState({
            starsTemp: index + 1
        })
    }

    handleMouseOut(){
        this.setState({
            starsTemp: this.state.starsFromProps
        })
    }

    handleClick(index){
        this.props.handleStarClick(index + 1, this.state.bookId)
        this.setState({
            starsFromProps: index + 1,
            starsTemp: index + 1
        })
    }
    
    render(){
        let a = this.numToArray(this.state.starsTemp)
        return(
            <div className="row text-warning">
                {a.map((b, index)=>{
                    return (
                        <span
                            key={index}
                            onMouseOver={()=>this.handleMouseOver(index)}
                            onMouseOut={()=>{this.handleMouseOut()}}
                            onClick={()=>this.handleClick(index)}
                        >
                            {b === 1 ? <span>{this.filledStar()}</span> : <span>{this.emptyStar()}</span>}
                        </span>
                    )
                })}
            </div>
        )
    }
}


export default Stars