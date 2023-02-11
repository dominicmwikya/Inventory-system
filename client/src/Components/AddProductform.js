import React from 'react'
import SubmitButton from '../Buttons/SubmitButton'
export default function AddProductform(props) {
  return (
    <div>
       <form onSubmit={props.handleSubmit} >
                <div className='card'  style={{ marginBottom:'0px'}}>
                <div className='card-body'>
                    <div className='form-group row'>
                        <div className='col'>
                        <div className="input-group mb-2">
                            <div className="input-group-prepend col-sm-5">
                                <span className="input-group-text">Product Name</span>
                            </div>
                            <input type="text" name="product_name" className='form-control'  onChange={props.value_handler}/>
                        </div> 
                        </div>
                        <div className='col'>
                            <div className="input-group mb-2">
                                <div className="input-group-prepend col-sm-5">
                                    <span className="input-group-text">Product Unit</span>
                                </div>
                                <select className='form-control' name="product_unit"  onChange={props.value_handler}>
                                    <option defaultValue>Select Unit</option>
                                    <option value="piece">Piece</option>
                                    <option value="kg">Kg</option>
                                </select>
                            </div> 
                        </div>
                    </div>
                    <div className='form-group row'>
                        <div className='col'>
                            <div className="input-group mb-2"> 
                                <div className="input-group-prepend col-sm-5">
                                    <span className="input-group-text">Category</span>
                                </div>
                                <select className='form-control' name='product_category' onChange={props.value_handler} >
                                    <option>Select Category</option>
                                    <option>Phones</option>
                                    <option>Tvs</option>
                                    <option>Phone Chargers</option>
                                </select>
                            </div> 
                        </div>
                        <div className='col'>
                            <div className="input-group mb-2"> 
                                <div className="input-group-prepend col-sm-5">
                                    <span className="input-group-text">Brand</span>
                                </div>
                                <select className='form-control' name='product_brand' onChange={props.value_handler} >
                                    <option>Select Brand</option>
                                    <option>Phones</option>
                                    <option>Tvs</option>
                                    <option>Phone Chargers</option>
                                </select>
                            </div> 
                        </div>
                    </div>
                </div>
                </div>
                <div className='card' style={{marginBottom:'2px'}}>
                    <div className='card-body'>
                        <div className='form-group row'>
                        <div className='col'>
                            <div className="input-group mb-2">
                                <div className="input-group-prepend col-sm-4">
                                    <span className="input-group-text">SKU</span>
                                </div>
                                <input type="text" name="product_sku"  className='form-control' onChange={props.value_handler} />
                            </div> 
                        </div>
                        <div className='col'>
                        <div className="input-group mb-2">
                            <div className="input-group-prepend  col-sm-5">
                                <span className="input-group-text">Min Qty</span>
                            </div>
                            <input type="number" name="product_min_qty"  className='form-control' onChange={props.value_handler} />
                        </div> 
                        </div>
                        <div className='col'>
                        <div className="input-group mb-2">
                            <div className="input-group-prepend  col-sm-5">
                                <span className="input-group-text">Qty</span>
                            </div>
                            <input type="number" className='form-control' name="product_qty" onChange={props.value_handler} />
                        </div> 
                        </div>
                        </div>
                    </div>
                </div>
                <div className='card' style={{marginBottom:'2px'}}>
                    <div className='card-body'>
                    <div className='form-group row'>
                        <div className='col'>
                        <div className="input-group mb-2">
                            <div className="input-group-prepend  col-sm-5">
                                <span className="input-group-text">Price</span>
                            </div>
                            <input type="number" name="product_price"   className='form-control' onChange={props.value_handler}/>
                        </div> 
                        </div>
                        <div className='col'>
                        <div className="input-group mb-2">
                            <div className="input-group-prepend  col-sm-5">
                                <span className="input-group-text">Status</span>
                            </div> 
                            <select className='form-control' name="product_status" onChange={props.value_handler} >
                                <option defaultValue>Select status</option>
                                <option value="Available">Available</option>
                                <option value="NotAvailable">Not Available</option>
                            </select>
                        </div> 
                        </div>
                    </div>
                    </div>
                </div>
            
                <div className='card'>
                    <div className='card-body'>
                    <div className='form-group row'>
                        <div className='col'>
                        <div className="input-group mb-2">
                            <div className="input-group-prepend  col-sm-5">
                                <span className="input-group-text">Description</span>
                            </div>
                            <textarea className='form-control' name="product_desc"  onChange={props.value_handler}></textarea>
                        </div> 
                        </div>
                    </div>
                    </div>
                </div>
                <SubmitButton type='submit' className='btn btn-success btn-sm' value="Add Product" />
    </form>
    </div>
  )
}
