import React, { Component } from 'react'
import Addusermodal from '../Components/Addusermodal'
export default class CreateUser extends Component {
    constructor(props){
        super(props)
        this.state={
          salesList: [],
          show:false,
          value:'',
        }
      }
   showModal=()=>{
        this.setState({
          show: !this.state.show
        });
      }
    hideModal=()=>{
        this.setState({show:false})
      }
  render() {
    return (
      <div>
       <Addusermodal 
        onClose={this.hideModal}
        show={this.state.show}
        />
  <button className='btn btn-primary'>Add User</button>
      </div>
    )
  }
}
