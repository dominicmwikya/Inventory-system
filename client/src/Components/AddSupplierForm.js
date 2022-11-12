import React, { Component } from 'react'
export default class AddSupplierForm extends Component {
  render() {
    return (
      <div>
        <form onSubmit={this.props.submitForm}>
        <div className='form-group row'>
            <div className='col'>
                <div className="input-group mb-2">
                    <div className="input-group-prepend col-sm-5">
                        <span className="input-group-text">Name</span>
                    </div>
                  <input  className='form-control' type='text' name='name'  onChange={this.props.onDatachange}/>
                </div> 
            </div>
        </div>
      
        <div className='form-group row'>
        <div className='col'>
                <div className="input-group mb-2">
                    <div className="input-group-prepend col-sm-5">
                        <span className="input-group-text">PHone</span>
                    </div>
                   <input type="number" className='form-control' name='phone' onChange={this.props.onDatachange}/>
                </div> 
            </div>
        </div>
        <div className='form-group row'>
        <div className='col'>
                <div className="input-group mb-2">
                    <div className="input-group-prepend col-sm-5">
                        <span className="input-group-text">Address</span>
                    </div>
                   <input type="text" className='form-control' name='address' onChange={this.props.onDatachange}/>
                </div> 
            </div>
        </div>
            <div className='form-group row'>
            <button className='btn btn-primary' type='submit'>Add Supplier</button>
            </div>
        </form>
      </div>
    )
  }
}
