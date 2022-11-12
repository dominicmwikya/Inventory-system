import React from 'react'
import Table  from 'react-bootstrap/Table';
export default function ProductTable(props) {
  const dataSet= props.products
  const showTable = () => {
    try {
      return dataSet.map((item, index) => {
        return (
            <tr key={item.id}>
                <td className="text-xs font-weight-bold">{index +1}</td>
                <td  className="text-xs font-weight-bold">{item.Name}</td>
                <td  className="text-xs font-weight-bold">{item.sku}</td>
                <td  className="text-xs font-weight-bold">{item.category}</td>
                <td  className="text-xs font-weight-bold">{item.price}</td>
                <td  className="text-xs font-weight-bold">{item.brand}</td>
                <td  className="text-xs font-weight-bold">{item.unit}</td>
                <td  className="text-xs font-weight-bold">{item.qty}</td>
                <td  className="text-xs font-weight-bold">{item.CreatedBy}</td>
                <td  className="text-xs font-weight-bold"><button className='btn btn-success btn-sm' onClick={()=>props.onEdit(item.id)}><i className="fa fa-edit"></i></button></td>
                 <td  className="text-xs font-weight-bold"><button className='btn btn-danger btn-sm' onClick={()=>props.delete_product(item.id)}><i className="fa fa-trash"></i></button></td>
                <td  className="text-xs font-weight-bold"><button className='btn btn-primary btn-sm' onClick={()=>props.onSale(item.id)}><i className="fa fa-shopping-cart" aria-hidden="true"></i></button></td>
            </tr>
            );
      });
    } catch (e) {
      alert(e.message);
    }
  };
  
  return (
    <div className="container">
       <div className='row'>
          <div className='col'>
          <div className="table-responsive p-0 pb-2">
          <Table striped bordered hover size="md"  id="table" className="table table-bordered align-items-center justify-content-center mb-0">
              <thead>
                  <tr>
                      <th className="text-uppercase text-secondary text-sm font-weight-bolder opacity-7 ps-2">S/N</th>
                      <th className="text-uppercase text-secondary text-sm font-weight-bolder opacity-7 ps-2">Name</th>
                      <th className="text-uppercase text-secondary text-sm font-weight-bolder opacity-7 ps-2">SKU</th>
                      <th className="text-uppercase text-secondary text-sm font-weight-bolder opacity-7 ps-2">Category</th>
                      <th className="text-uppercase text-secondary text-sm font-weight-bolder opacity-7 ps-2">PRICE</th>
                      <th className="text-uppercase text-secondary text-sm font-weight-bolder opacity-7 ps-2">BRAND</th>
                      <th className="text-uppercase text-secondary text-sm font-weight-bolder opacity-7 ps-2">UNIT</th>
                      <th className="text-uppercase text-secondary text-sm font-weight-bolder opacity-7 ps-2">Quantity</th>
                      <th className="text-uppercase text-secondary text-sm font-weight-bolder opacity-7 ps-2">CREATED BY</th>
                      <th className="text-uppercase text-secondary text-sm font-weight-bolder opacity-7 ps-2" ></th>
                      <th className="text-uppercase text-secondary text-sm font-weight-bolder opacity-7 ps-2" ></th>
                      <th className="text-uppercase text-secondary text-sm font-weight-bolder opacity-7 ps-2" ></th>
                  </tr>
              </thead>
              <tbody>
                      {showTable()}
              </tbody>
          </Table>
        </div>
          </div>
       </div>
    </div>
  )
}
