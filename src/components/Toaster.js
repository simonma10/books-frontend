import React, { Component } from 'react'

class Toaster extends Component {
    constructor(props){
        super(props)
        this.state={
            toasts:[
                {message: "Welcome to Funky Books! \n New Notifications appear here."},
            ]
        }
        this.removeToast = this.removeToast.bind(this)
    }

    addToast(toast){
        const newToasts = this.state.toasts
        newToasts.push(toast)
        this.setState({
            ...this.state,
            toasts: newToasts
        })
    }

    removeToast(t){
        const newToasts = this.state.toasts.filter((toast)=>{
            return toast.message !== t.message
        })
        this.setState({
            ...this.state,
            toasts: newToasts
        })
    }

    render(){
        const topDivStyle = {
            position: 'fixed',
            top: 60,
            right: 10,
            minHeight: '200px',
        }

        const posDivStyle = {
            position: 'absolute',
            top: 0,
            right: 0
        }

        const toastStyle = {
            width: '250px',
            zIndex: 999
        }

        const callback = this.removeToast
        const {toasts} = this.state

        return (
           
            <div aria-live="polite" aria-atomic="true" style={topDivStyle}>
                <div style={posDivStyle}>
                { toasts.length > 0 ? this.state.toasts.map( (toast, index) => {
                    window.$('.toast').toast('show')
                    window.$('.toast').on('hidden.bs.toast', function () {
                        callback(toast)
                      })
                    return (
                        <div className="toast" style={toastStyle} role="alert" key={index} aria-live="assertive" aria-atomic="true" data-delay="2000">
                            <div className="toast-header bg-light">
                                <strong className="mr-auto">Funky Books</strong>
                                <small>recently</small>
                                <button type="button" className="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="toast-body">
                                {toast.message}
                            </div>
                        </div>
                    )
                }) : ""
                }
                </div>
            </div>
        )
    }
}

export default Toaster