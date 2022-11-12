import axios from 'axios'
import React, { Component } from 'react'
import AddSupplierModal from '../Components/AddSupplierModal'
export default class Suppliers extends Component {
    constructor(props){
        super(props)
        this.state={
            show:false,
            SuppliersList:[]
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
      componentDidMount(){
        axios.get("http://localhost:5000/supplier/get",{headers:{
            userToken:localStorage.getItem('Token')
        }}).then((response)=>{
            this.setState({
                SuppliersList:response.data
            })
        })
      }
   
     table=()=>{
      return this.state.SuppliersList.map((supplier,index)=>{
        return (
            <>
            {console.log(supplier)}
             <tr key={index}>
                <td>{index+1}</td>
                <td> {supplier.name}</td>
                <td>{supplier.phone}</td>
                <td>{supplier.address}</td>
             </tr>
            </>
        );
      })
     }
  render() {
    return (
        <>
      <div className='container' >
        <div className='row'>
          <div className='col'>
            <div className='card' style={{height:'60px', marginBottom:'15px', marginTop:'20px'}}>
              <div className='card-body'>
              <button className='btn btn-primary' onClick={this.showModal} style={{borderRadius:"5px",paddingTop:'1px',marginBottom:'10px'}}>New Supplier</button>
              </div>
            </div>
          </div>
        </div>
        <div className='row'>
           <div className='col '>
            <div className='card'>
                <div className='card-body'>
                    <table className='table table-bordered'>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Supplier Name</th>
                                <th>Contact</th>
                                <th>Address</th>
                            </tr>
                        </thead>
                        <tbody>
                        {this.table()}
                        </tbody>
                    </table>
                </div>
            </div>
           <AddSupplierModal 
                      show={this.state.show} 
                      onClose={this.hideModal} 
                       />
            
           </div>
        </div>
      </div>
     
      </>
    )
  }
}
