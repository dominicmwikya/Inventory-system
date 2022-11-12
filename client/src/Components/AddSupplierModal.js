import React, { Component } from 'react'
import  Modal from 'react-bootstrap/Modal';
import AddSupplierForm from './AddSupplierForm';
import axios from 'axios'
export default class AddSupplierModal extends Component {
    constructor(props){
        super(props)
        this.state={
            name:'',
            phone:'',
            address:''
        }
    }
    onDatachange=(e)=>{
        const name=e.target.name;
        const value=e.target.value;
        this.setState({
            [name]:value
        })
    }
    submitForm=(e)=>{
        e.preventDefault()
       axios.post("http://localhost:5000/supplier/create",{
        name:this.state.name,
        phone:this.state.phone,
        address:this.state.address
       },{headers:{
          userToken:localStorage.getItem('Token')
        }}).then((res)=>{
       if(res.data.error){
        console.log(res.data.error)
       }else{
        console.log(res.data)
       }
       })

      }
    onClose = e => {
        this.props.show = false;
      };
  render() {
    if(!this.props.show){
        return null;
    }
    return (
      <div>
          <Modal show={this.props.show}  size='md' style={{marginTop:'50px'}}>
            <Modal.Header><h3>New Supplier!</h3></Modal.Header>
                <Modal.Body>
                    <AddSupplierForm onDatachange={this.onDatachange}
                    submitForm={this.submitForm}
                
                     />
                     <button className="btn btn-danger btn-md center-block app-button" onClick={this.props.onClose}
                      style={{width:"14%",height:"33px", border:'2px', marginTop:"2px", marginLeft:'340px',borderRadius:"5px",}}>Cancel  </button>
                </Modal.Body>
               
            </Modal>
      </div>
    )
  }
}
