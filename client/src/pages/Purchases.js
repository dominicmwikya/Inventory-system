import axios from 'axios'
import React, { Component } from 'react'
import AddpurchasesModal from '../Components/AddpurchasesModal'
export default class Purchases extends Component {
    constructor(props){
        super(props)
        this.state={
            show:false,
            purchasesList:[]
        }
    }
    componentDidMount(){
      axios.get("http://localhost:5000/purchases/get",{headers:{
        userToken:localStorage.getItem('Token')
      }}).then((response)=>{
        if(response.data.error){
          console.log(response.data.error)
        }else{
          this.setState({
            purchasesList:response.data
          })
          console.log(this.state.purchasesList)
        }
      })
    }
    // purchasesTable=()=>{
    //   return this.state.purchasesList.map((purchase,index)=>{
    //     return (
    //       <>
    //       <tr key={purchase.id}>
    //          <td>{index+1}</td>
            
    //       </tr>
    //       </>
    //     )
    //   })
    // }
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
           <div className='col-md-8 '>
           <AddpurchasesModal show={this.state.show} onClose={this.hideModal}  />
        <button className='btn btn-primary' onClick={this.showModal} style={{borderRadius:"5px",paddingTop:'1px',marginBottom:'10px'}}>New Purchase</button>
           </div>
        </div>
      </div>
     
      </>
    )
  }
}
