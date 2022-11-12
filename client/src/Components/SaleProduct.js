import React from 'react'
function SaleProduct(props) {
  return (
    <div>
       <div className='card '>
                   <div className='card-body'>
                    <form onSubmit={props.handleSale}>
                    <div className='form-group row'>
                            <div className='col'>
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"> {props.Name}</span>
                                </div>
                            </div>
                            </div>
                            <div className='col'>
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">Available Qty</span>
                                </div>
                                <input className="form-control" name="units" value={props.qty}  onChange={props.setQty}  readOnly/>
                            </div> 
                            </div>
                     </div>
                        <div className='form-group row'>
                            <div className='col'>
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">Customer</span>
                                </div>
                                <input className='form-control ' type="text" name="Customer_Name"  onChange={props.value_handler} placeholder='Enter Customer Name'/> 
                            </div>
                            </div>
                            <div className='col'>
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">Date</span>
                                </div>
                                <input type="date" required className="form-control" name="Sale_Date" value={props.Sale_Date} onChange={props.setSaleDate}  />
                            </div> 
                            </div>
                        </div>
                       
                        <div className='form-group row' style={{marginBottom:'5px'}}>
                            <div className='col'>
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">Qty</span>
                                </div>
                                <input type="number" name="Quantity" className="form-control"   onChange={props.value_handler} required/>
                                <div className="input-group-append">
                                    <span className="input-group-text">Pc(s)</span>
                                </div>
                            </div>
                            </div>
                            <div className='col'>
                            <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">Price</span>
                                    </div>
                                    <input type="number" className="form-control" name="saleprice" required onChange={props.value_handler} 
                              />
                                    <div className="input-group-append">
                                        <span className="input-group-text">.00</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                          <div className='form-group row'>
                        <div className='col'>
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">Total</span>
                                </div>
                                <input type="number" className="form-control" name='total' value={props.total}onChange={props.setTotal} required />
                                <div className="input-group-append">
                                    <span className="input-group-text">.00</span>
                                </div>
                            </div>
                            </div>
                            <div className='col'>
                            <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">paid</span>
                                    </div>
                                    <input type="number" className="form-control" name="amount" onChange={props.value_handler} required
                                    />
                                    <div className="input-group-append">
                                        <span className="input-group-text">.00</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='form-group row'>
                        <div className='col'>
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">Balance</span>
                                </div>
                                <input type="text" className="form-control"  min='0' name='balance' value={props.balance} onChange={props.setBalance} readOnly/>
                                <div className="input-group-append">
                                    <span className="input-group-text">.00</span>
                                </div>
                            </div>
                            </div>
                        </div>
                        <div className='form-group row' style={{marginTop:"10px"}}>
                        <div className='col'>
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">Discount</span>
                                    </div>
                                    <input type="text" className="form-control" name="discount"  onChange={props.value_handler}/>
                                    <div className="input-group-append">
                                        <span className="input-group-text">%</span>
                                    </div>
                                </div>
                            </div>
                            <div className='col'>
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">Status</span>
                                </div>
                                <select className='form-control' name='Status' onChange={props.value_handler}  required>
                                    <option defaultValue>Payment Status</option>
                                    <option value="Completed">Completed</option>
                                    <option value="Pending">Pending</option>
                                    <option value="Incomplete">Incomplete</option>
                            </select>
                            </div>
                            </div>
                        </div>
                        <div className='form-group row'  style={{marginTop:"20px"}}>
                        <div className='col-md-4'>
                        <button className='btn btn-success' type='submit'>Create Sale</button>
                        </div>
                        </div>
                    </form>
                   </div>
       </div>
    </div>
  )
}
export default SaleProduct
