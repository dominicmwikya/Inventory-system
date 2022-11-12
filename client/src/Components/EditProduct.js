import React from 'react'

function EditProduct(props) {
  return (
    <React.Fragment>
        <div className='card '>
                   <div className='card-body'>
                    <form onSubmit={props.updateProduct}>
                    <div className='form-group row'>
                    <input className='form-control' type="hidden" value={props.ProductId} onChange={props.setEditId}/>
                    <div className='col'>
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">Name</span>
                                </div>
                                <input className="form-control" name="Name" value={props.Name} onChange={props.setEditName} />
                            </div> 
                            </div>
                            <div className='col'>
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">SKU</span>
                                </div>
                                <input className="form-control" name="sku"  value={props.sku} onChange={props.setSku} />
                            </div> 
                            </div>
                        </div>
                        <div className='form-group row'>
                            <div className='col'>
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">Customer</span>
                                </div>
                               <select className='form-control' name="category">
                                     <option>category</option>
                               </select>
                            </div>
                            </div>
                            <div className='col'>
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">Price</span>
                                </div>
                                <input type="number" className="form-control" name="price" value={props.price} onChange={props.setEditPrice}  />
                            </div> 
                            </div>
                        </div>
                       
                        <div className='form-group row' style={{marginBottom:'5px'}}>
                            <div className='col'>
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">Qty</span>
                                </div>
                                <input type="number" name="qty" className="form-control" value={props.qty} onChange={props.setQty}  />
                                <div className="input-group-append">
                                    <span className="input-group-text">Pc(s)</span>
                                </div>
                            </div>
                            </div>
                            <div className='col'>
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">Min Qty</span>
                                </div>
                                <input type="number" name="min_qty" className="form-control" value={props.min_qty} onChange={props.setMinQty}  />
                                <div className="input-group-append">
                                    <span className="input-group-text">Pc(s)</span>
                                </div>
                            </div>
                            </div>
                           
                        </div>
                        
                        <div className='form-group row'  style={{marginTop:"20px"}}>
                        <div className='col-md-4'>
                        <button className='btn btn-success' type='submit'> Update</button>
                        </div>
                        </div>
                    </form>
                   </div>
       </div>
    </React.Fragment>
  )
}

export default EditProduct
