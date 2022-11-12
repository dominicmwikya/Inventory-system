import React, { Component } from 'react'
import  Modal from 'react-bootstrap/Modal';
import AddPurchasesform from './AddPurchasesform';
import axios from 'axios'
export default class AddpurchasesModal extends Component {
  constructor(props){
    super(props)
    this.state={
      supplierList:[],
      productList:[],
      product:'',
      supplier:'',
      purchase_date:"",
      quantity:'',
      status:'',
      sale_price:"",
      total:"",
      price:"",
    }
  }
  get_products=()=>{
    axios.get("http://localhost:5000/products", {
      headers:{userToken:localStorage.getItem("Token")}
    }).then((response)=>{
        if(response.data.error){
          alert(response.data.error)
        }else{
          this.setState({
            productList:response.data
          })
        }
    })
  }
  get_suppliers=()=>{
    axios.get("http://localhost:5000/supplier/get",{headers:{
      userToken:localStorage.getItem('Token')
  }}).then((response)=>{
      this.setState({
        supplierList:response.data
      })
  })
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
 axios.post("http://localhost:5000/purchases/create",{
  product:this.state.product,
  purchase_date:this.state.purchase_date,
  supplier:this.state.supplier,
  quantity:this.state.quantity,
  status:this.state.status,
  sale_price:this.state.sale_price,
  total:this.state.total,
  price:this.state.price

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
  componentDidMount(){
    this.get_suppliers()
    this.get_products()
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
          <Modal show={this.props.show}  size='lg' style={{marginTop:'50px'}}>
            <Modal.Header><h3>Purchases</h3></Modal.Header>
                <Modal.Body>
                    <AddPurchasesform 
                    supplierlist={this.state.supplierList}
                    productList={this.state.productList}
                    onDatachange={this.onDatachange}
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
