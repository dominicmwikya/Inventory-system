import React, { Component } from 'react'
import SubmitButton from '../Buttons/SubmitButton'
export default class AddPurchasesform extends Component {
    constructor(props){
        super(props)
        this.state={
            suppliers:this.props.supplierlist,
            products:this.props.productList,
        }
    }
  render() {
    return (
      <div>
        <form  onSubmit={this.props.submitForm}>
        <div className='form-group row'>
        <div className='col'>
                <div className="input-group mb-2">
                    <div className="input-group-prepend col-sm-5">
                        <span className="input-group-text">Date</span>
                    </div>
                   <input type="date" className='form-control' name='purchase_date'  onChange={this.props.onDatachange}/>
                </div> 
            </div>
            <div className='col'>
                <div className="input-group mb-2">
                    <div className="input-group-prepend col-sm-5">
                        <span className="input-group-text">Supplier</span>
                    </div>
                    <select className='form-control' name='supplier' onChange={this.props.onDatachange}>
                       <option>Choose  Supplier</option>
                       {this.state.suppliers.map(supplier=>{
                        return (
                            <>
                            <option value={supplier.id} >{supplier.name}</option>
                            </>
                        )
                      })}
                    </select>
                </div> 
            </div>
        </div>
        <div className='form-group row'>
            <div className='col'>
                <div className="input-group mb-2">
                    <div className="input-group-prepend col-sm-5">
                        <span className="input-group-text">Product</span>
                    </div>
                    <select className='form-control' name='product'  onChange={this.props.onDatachange}>
                      <option>Select Product</option>
                      {this.state.products.map(product=>{
                        return (
                            <>
                            <option value={product.id} >{product.Name}</option>
                            </>
                        )
                      })}
                    </select>
                </div> 
            </div>
            <div className='col'>
                <div className="input-group mb-2">
                    <div className="input-group-prepend col-sm-5">
                        <span className="input-group-text">Quantity</span>
                    </div>
                   <input type="number" className='form-control' name='quantity'  onChange={this.props.onDatachange}/>
                </div> 
            </div>
        </div>
      
      
        <div className='form-group row'>
        <div className='col'>
                <div className="input-group mb-2">
                    <div className="input-group-prepend col-sm-5">
                        <span className="input-group-text">price</span>
                    </div>
                   <input type="number" className='form-control' name='price'  onChange={this.props.onDatachange}/>
                </div> 
            </div>
            <div className='col'>
                <div className="input-group mb-2">
                    <div className="input-group-prepend col-sm-5">
                        <span className="input-group-text">Total</span>
                    </div>
                   <input type="number" className='form-control' name='total'  onChange={this.props.onDatachange}/>
                </div> 
        </div>
        </div>
        
        <div className='form-group row'>
        <div className='col'>
                <div className="input-group mb-2">
                    <div className="input-group-prepend col-sm-5">
                        <span className="input-group-text">Sale Price</span>
                    </div>
                <input type="number" className='form-control' name='sale_price' onChange={this.props.onDatachange}/>
                </div> 
         </div>
        <div className='col'>
                <div className="input-group mb-2">
                    <div className="input-group-prepend col-sm-5">
                      
                    </div>
                 <select className='form-control' name='status' onChange={this.props.onDatachange}>
                    <option>Select Payment Status</option>
                    <option>Completed</option>
                    <option>Pending</option>
                    <option>Incomplete</option>
                 </select>
                </div> 
         </div>
        </div>
            <div className='form-group row'>
            <SubmitButton className="btn btn-primary" type="submit" value="add purchases"/>
            </div>
        </form>
      </div>
    )
  }
}
