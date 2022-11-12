
import axios from 'axios'
import React, {useEffect, useState} from 'react'
import { useNavigate } from "react-router-dom";
import swal from 'sweetalert';
export default function Home() {
    // const [list, setList]=useState([])
    const [selected, setSelected]=useState('')
    const [startDate, setStartDate]=useState('')
    const[endDate, setEndDate]=useState('')
    const [sales, setSalesData]=useState([])
    const [stock, setStackData]=useState([])
    const [product, setProduct]=useState([])
    const [select, setSelect]=useState('')
//    const [defaut, setDefault]=useState("")
    const[salesTable, showSalesTable]=useState(false)
    const [stockTable, showStockTable]=useState(false)
    const navigate=useNavigate()
    const value_handler=(e)=>{
      let name= e.target.name;
      let value= e.target.value;
      const newValues = {
          ...selected,
          [name]: value
      }
      setSelected(newValues)
   }
  const handleSelectChange=(e)=>{
      setSelect(e.target.value)
  }
   const handleInputChange = (e) => {
      setStartDate(e.target.value)
    }
    const handleEndDateChange=(e)=>{
      setEndDate(e.target.value)
    }
    function formatDate(val) {
      var d = new Date(val),
          month = '' + (d.getMonth() + 1),
          day = '' + d.getDate(),
          year = d.getFullYear();
  
      if (month.length < 2) 
          month = '0' + month;
      if (day.length < 2) 
          day = '0' + day;
  
      return [year, month, day].join('-');
  }
   function formatstartDate(val) {
      var d = new Date(val),
          month = '' + (d.getMonth() + 1),
          day = '' + d.getDate()-7,
          year = d.getFullYear();
  
      if (month.length < 2) 
          month = '0' + month;
      if (day.length < 2) 
          day = '0' + day;
  
      return [year, month, day].join('-');
  }
  const submit_form=(e)=>{
    e.preventDefault()
    axios.post('http://localhost:5000/sales/report',{
        dat:selected,
        start:startDate,
        end: endDate,
        p_data:select
    },{
        headers:{userToken:localStorage.getItem("Token")}
    }).then((response)=>{
        console.log(response.data)
        if(response.data.code===1){
            setSalesData(response.data.Result)
            showSalesTable(true)
            showStockTable(false)
        }if(response.data.code===2){
            setStackData(response.data.Response)
            showStockTable(true)
            showSalesTable(false)
        }
        if(response.data.code===3){
             console.log(response.data.Data)
        }
    })
 }
 const display_sales_data=()=>{
  try {
      return sales.map((item, index) => {
        return (
            <tr key={item.id}>
                <td className="text-xs font-weight-bold">{index +1}</td>
                <td className="text-xs font-weight-bold">{item.Sale_Date}</td>
                <td className="text-xs font-weight-bold">{item.Product.Name}</td>
                <td  className="text-xs font-weight-bold">{item.Quantity}</td>
                <td  className="text-xs font-weight-bold">{item.Amount}</td>
            </tr>
            );
      });
    } catch (e) {
      alert(e.message);
    }
}
const display_stock_data=()=>{
  try {
      return stock.map((item, index) => {
        return (
            <tr key={item.id}>
                <td className="text-xs font-weight-bold">{index +1}</td>
                <td className="text-xs font-weight-bold">{item.Name}</td>
                <td  className="text-xs font-weight-bold">{item.min_qty}</td>
                <td  className="text-xs font-weight-bold">{item.Qty}</td>
                <td  className="text-xs font-weight-bold">{item.status}</td>
            </tr>
            );
      });
    } catch (e) {
      alert(e.message);
    }
}
    useEffect(()=>{
        axios.get("http://localhost:5000/products",{
          headers:{
            userToken:localStorage.getItem("Token")
          }
        }).then((response)=>{
          if(response.data.error){
            // navigate("/login")
            swal("Error", {icon:"warning"})
          }else{
            setStartDate(formatstartDate(new Date()))
            setEndDate(formatDate(new Date()))
            showSalesTable(false)
            showStockTable(false)
            setProduct(response.data)
          }
       
        })
    },[])

  return (
    <div className="container-fluid"  style={{paddingTop:'50px'}}>
    <div className='row'>
        <div className='col-md-5'>
            <form onSubmit={submit_form}>
                <div className="card" style={{backgroundColor:'#E8E8E8'}}>
                        <div className="card-header text-center " style={{fontFamily:'Sans-Serif', textTransform:'uppercase', fontSize:'1.5rem'}}>
                        Report Dashboard
                        </div>
                        <div className="card-body" >
                            <div className="container-fluid" style={{paddingTop:'50px'}}>
                                <div className="row" style={{paddingBottom:'15px'}}>
                                    <div className="col">
                                        <div className="card  h-100">
                                            <div className="card-body">
                                                <div className="row">
                                                <div className='form-group row'>
                                                    <div className='col'>
                                                    <div className="input-group mb-3">
                                                        <div className="input-group-prepend  col-sm-2">
                                                            <span className="input-group-text">Report: </span>
                                                        </div>
                                                        <select className='form-control' name='selected' onChange={value_handler}>
                                                            <option >select Report</option>
                                                            <option value='sales'>Sales</option>
                                                            <option value='stock'>Stock Levels</option>
                                                            <option value='revenue'>Revenue</option>
                                                        </select>
                                                    </div> 
                                                    </div>
                                                </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <div className="card  h-100">
                                            <div className="card-body">
                                                <div className="row">
                                                <div className='form-group row'>
                                                    <div className='col'>
                                                    <div className="input-group mb-3">
                                                        <div className="input-group-prepend  col-sm-4">
                                                            <span className="input-group-text">From: </span>
                                                        </div>
                                                        <input type="date" className='form-control'  name='startDate' value={startDate} onChange={handleInputChange} />
                                                    </div> 
                                                    </div>
                                                    <div className='col'>
                                                    <div className="input-group mb-3">
                                                        <div className="input-group-prepend  col-sm-4">
                                                            <span className="input-group-text">Date: </span>
                                                        </div>
                                                        <input type="date" className='form-control' name='endDate'  value={endDate} onChange={handleEndDateChange}/>
                                                    </div> 
                                                    </div>
                                                </div>
                                                <div className='form-group row'>
                                                    <div className='col'>
                                                    <div className="input-group mb-3">
                                                        <div className="input-group-prepend  col-sm-2">
                                                            <span className="input-group-text">Product:</span>
                                                        </div>
                                                        <select className='form-control' name='select' value={select}onChange={(e)=>handleSelectChange(e)} >
                                                        <option value=''>Select Product </option>
                                                            {product.map((data)=>{
                                                            return(
                                                                <option key={data.id} value={data.id}>{data.Name}</option>
                                                            )
                                                            })}
                                                        </select>
                                                    </div> 
                                                    </div>
                                                </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button className='btn btn-success btn-sm' style={{width:'100px', float:'right', marginLeft:'auto', marginRight:'0px'}}>Generate</button>
                </div>
            </form>
        </div>
        <div className='col'>
            <h3>DATA BOARD</h3>
           <>
           {salesTable  && <div> 
            <table className="table table-bordered align-items-center justify-content-center mb-0" >
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Sale Date</th>
                        <th>Product Name</th>
                        <th>QTY</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody>
                {
               display_sales_data()
             }
                </tbody>
            </table>
            </div>}
            {stockTable  && <div> 
            <table className="table table-bordered align-items-center justify-content-center mb-0" >
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Product Name</th>
                        <th>Min.Qty</th>
                        <th>Availabl.Qty</th>
                        <th>status</th>
                    </tr>
                </thead>
                <tbody>
                {
               display_stock_data()
             }
                </tbody>
            </table>
            </div>}
           </>
        </div>
    </div>
  </div>
  )
}
