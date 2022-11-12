import React, { Component,useState,useEffect  } from 'react'
import Addusermodal from '../Components/Addusermodal'
import Userlist from '../Components/Userlist'
export default class CreateUser extends Component {
    constructor(props){
        super(props)
        this.state={
            show:false,
        }
    }
    showModal=()=>{
        this.setState({
            show: !this.state.show
        })
    }
    hideModal=()=>{
        this.setState({show:false})
      }
  render() {
    return (
      <>
      <div className='container' >
        <div className='row'>
           <div className='col-md-6 '>
           <Addusermodal show={this.state.show} onClose={this.hideModal}  />
        <button className='btn btn-primary' onClick={this.showModal} style={{borderRadius:"5px",paddingTop:'1px',marginBottom:'10px'}}>New User</button>
        <Userlist  />
           </div>
        </div>
      </div>
     
      </>
    )
  }
}
