import React, { useState,useEffect } from 'react'
import axios from 'axios'
import swal from 'sweetalert'
import ProductTable from '../Components/ProductTable'
import AddProductform from '../Components/AddProductform'
import { Modal } from "react-bootstrap";
import 'font-awesome/css/font-awesome.min.css';
import SaleProduct from '../Components/SaleProduct'
import EditProduct from '../Components/EditProduct';
import "jquery/dist/jquery.min.js";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import "datatables.net-buttons/js/dataTables.buttons.js";
import "datatables.net-buttons/js/buttons.colVis.js";
import "datatables.net-buttons/js/buttons.flash.js";
import "datatables.net-buttons/js/buttons.html5.js";
import "datatables.net-buttons/js/buttons.print.js";
import $ from "jquery";
function Products() {
    const[products, setProduct]=useState([])
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [addshow, setAddShow]=useState(false)
    const handleModalFormClose = () => setAddShow(false);
    const handleModalFormShow = () => setAddShow(true);
    const [editshow, setEditShow] = useState(false);
    const handleEdit = () => setEditShow(true);
    const handleEditClose=()=>setEditShow(false)
    const [Name, setName]=useState('')
    const[Product_id, setId]=useState('')
    const[ProductId, setEditId]=useState('')
    const[units, setUnit]=useState('')
    const[qty, setQty]=useState(0)
    const[min_qty, setMinQty]=useState(0)
    const[total, setTotal]=useState(0)
    const[balance, setBalance]=useState(0)
    const[editprice, setEditPrice]=useState(0)
    const[sku, setSku]=useState('')
    const[productvalues, setProductValues]=useState({
      product_name:'',
      product_category:'',
      product_sku:'',
      product_price:'',
      product_brand:'',
      product_min_qty:'',
      product_unit:'',
      product_qty:'',
      product_status:'',
      product_desc:''
  })
    var date = new Date();
    var formatedDate = `${date.getMonth()+1}-${date.getDate()}-${date.getFullYear()}`
    const[Sale_Date, setSaleDate]=useState(formatedDate)
    useEffect(()=>{
          handleData()
       },[])
     
      const handleData=()=>{
           setTimeout(()=>{
            axios.get("http://localhost:5000/products", {
              headers:{userToken:localStorage.getItem("Token")}
            }).then((response)=>{
               if(response.data.error){
                console.log(response.data.error)
                    swal(response.data.error, {icon:'warning'})
               }else{
                setProduct(response.data)
                if (!$.fn.DataTable.isDataTable("#table")) {
                  $(function () {
                    setTimeout(function () {
                      $("#table").DataTable({
                        pagingType: "full_numbers",
                        pageLength: 10,
                        processing: true,
                        dom: "Bfrtip",
                        retrieve: true,
                        select: {
                          style: "single",
                        },
            
                        buttons: [
                          {
                            extend: "pageLength",
                            className: "btn btn-secondary bg-secondary",
                          },
                          {
                            extend: "copy",
                            className: "btn btn-secondary bg-secondary",
                          },
                          {
                            extend: "csv",
                            className: "btn btn-secondary bg-secondary",
                          },
                          {
                            extend: "print",
                            customize: function (win) {
                              $(win.document.body).css("font-size", "10pt");
                              $(win.document.body)
                                .find("table")
                                .addClassName("compact")
                                .css("font-size", "inherit");
                            },
                            className: "btn btn-secondary bg-secondary",
                          },
                        ],
            
                        fnRowCallback: function (
                          nRow,
                          aData,
                          iDisplayIndex,
                          iDisplayIndexFull
                        ) {
                          var index = iDisplayIndexFull + 1;
                          $("td:first", nRow).html(index);
                          return nRow;
                        },
            
                        lengthMenu: [
                          [10, 20, 30, 50, -1],
                          [10, 20, 30, 50, "All"],
                        ],
                        columnDefs: [
                          {
                            targets: 0,
                            render: function (data, type, row, meta) {
                              return type === "export" ? meta.row + 1 : data;
                            },
                          },
                        ],
                      });
                    }, 5);
                  });
                }
               }
           })
           },10)
      }
       const delete_product=(id)=>{
        swal({
          title: "Are you sure?",
          text: "Once deleted, you will not be able to recover this product!",
          icon: "warning",
          buttons: true,
          dangerMode: true,
        })
        .then((confirmDelete) => {
          if (confirmDelete) {
            axios.delete(`http://localhost:5000/products/delete/${id}`,{
              headers:
              {
                userToken: localStorage.getItem("Token")
              }
            }).then((response)=>{
                if(response.data){
                  swal(`Poof! ${response.data}`, {
                    icon: "success",
                  });
                  handleData()
                } else{
                  swal("Sorry! Failed to delete the product",{
                    icon:'warning',
                  })
                }
            })
          } else {
            swal("Your product record is safe!");
          }
        });
      }
      const handleSale=(e)=>{
        e.preventDefault()
       axios.post("http://localhost:5000/sales/create",{ Customer_Name:values.Customer_Name,
                  Quantity:values.Quantity, 
                  saleprice:values.saleprice,total:total, amount:values.amount, 
                  balance:balance, ProductId:Product_id, 
                  Status:values.Status, Sale_Date:Sale_Date
        },
        {
          headers:{userToken:localStorage.getItem("Token")}
        }
        ).then((response)=>{
          if(response.data.error){
              swal(response.data.error,{icon:"warning"})
          }if(response.data){
            swal(response.data,{icon:'success'})
            alert(response.data)
            setId('')
            setBalance('')
            setTotal('')
            setBalance('')
            setValues({
             Quantity:0,
             saleprice:0,
             amount:0,
             Customer_Name:'',
             Status:'',
             discount:0,
            })
            setQty('')
            handleData()
            handleClose()
           
          }else{
            swal("Something went wrong", {icon:'warning'})
          }
      })

      }
      const onSale= async (p_id)=>{
             await axios.get(`http://localhost:5000/products/${p_id}` ,{
              headers:
              {
                userToken: localStorage.getItem("Token")
              }
            }).then((result)=>{
              console.log(result)
                if(result.data[0]){
                    const data=result.data[0]
                    setName(data.Name)
                    setId(data.id)
                    setUnit(data.unit)
                    setQty(data.qty)
                    handleShow()
                }else{
                     console.log(result.error)
                }
             })
      }
      const edit_product=async(id)=>{
        await axios.get(`http://localhost:5000/products/${id}` ,{
          headers:
          {
            userToken: localStorage.getItem("Token")
          }
        }).then((result)=>{
            if(result.data[0]){
                const data=result.data[0]
                handleEdit()
                setQty(data.qty)
                setName(data.Name)
                setMinQty(data.min_qty)
                setEditPrice(data.price)
                setSku(data.sku)
                setEditId(data.id)
            }else{
                 console.log(result.error)
            }
         })
      }
      const create_product=()=>{
        handleModalFormShow()
      }
      const updateProduct=(e)=>{
        e.preventDefault()
           axios.put(`http://localhost:5000/products/update`,{
            Product_Name:Name,
            id: ProductId,
            product_sku:sku,
            product_price:editprice,
            product_quantity:qty,
            minimum_quantity:min_qty
           },
           {
            headers:
            {
              userToken: localStorage.getItem("Token")
            }
           }).then((resp)=>{
              if(resp.data.error){
                 swal(resp.data.error, {icon:'warning'})
              }else{
                swal(resp.data, {icon:'success'})
                handleEditClose()
                handleData()
              }
           })
      }
      const[values, setValues]=useState({
        Quantity:0,
        saleprice:0,
        amount:0,
        Customer_Name:'',
        Status:'',
        discount:0,
   })
      const value_handler=(e)=>{
        let name= e.target.name;
        let value= e.target.value;
        const newValues = {
            ...values,
            [name]: value
        }
        setValues(newValues)
        calc_total(newValues)
    }
    const productInput_handler=(e)=>{
      let name= e.target.name;
      let value= e.target.value;
      const newValues = {
          ...productvalues,
          [name]: value
      }
      setProductValues(newValues)
     
  }
const calc_total = (newValues) => {
        const { Quantity, saleprice, amount} = newValues;
        const newTotal=   Quantity * saleprice
        setTotal(newTotal)
        const newBalance= newTotal- amount
        setBalance(newBalance)
        console.log(newValues)
    }  
    const createProductSubmit=(e)=>{
      e.preventDefault()
      axios.post('http://localhost:5000/products/create', productvalues, {
        headers:{userToken:localStorage.getItem("Token")}
      }).then((response)=>{
         if(response.data.error){
                swal(response.data.error, {icon:"warning"})
         }else{
          swal(response.data, {icon:"success"})
          setProductValues({ product_name:'',product_category:'', product_sku:'', product_price:'',
           product_brand:'', product_min_qty:'', product_unit:'', product_qty:'', product_status:'', product_desc:''})
          handleModalFormClose()
          handleData()
         }
      })
    }
  return (
    <div className='container'>
        <div className='row'>
        <Modal show={addshow}  onHide={handleModalFormClose} size='lg'>
        <Modal.Header closeButton style={{backgroundColor:"#008080"}}> 
          <Modal.Title>Add Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddProductform 
                 value_handler={productInput_handler}
                 handleSubmit={createProductSubmit}
          />
        </Modal.Body>
        <Modal.Footer> </Modal.Footer>
       </Modal>
        <Modal show={editshow}  onHide={handleEditClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditProduct 
                 Name={Name}
                 setEditName={(e)=>setName(e.target.value)}
                 setEditId={(e)=>setEditId(e.target.value)} 
                 setQty={(e)=>setQty(e.target.value)}
                 qty={qty}
                 min_qty={min_qty}
                 setMinQty={(e)=>setMinQty(e.target.value)}
                 setEditPrice={(e)=>setEditPrice(e.target.value)}
                 price={editprice}

                 sku={sku}
                 setSku={(e)=>setSku(e.target.value)}
                 updateProduct={updateProduct}
                 ProductId={ProductId}
          />
        </Modal.Body>
        <Modal.Footer> </Modal.Footer>
       </Modal>
        <Modal show={show} onHide={handleClose} style={{maxWidth: '500vw'}}>
        <Modal.Header closeButton>
          <Modal.Title>Sale Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <SaleProduct 
               Name={Name}
              units={units}
              qty={qty}
              value_handler={value_handler}
              handleClose={handleClose}
              setName={(e)=>setName(e.target.value)}
              setId={(e)=>setId(e.target.value)}
              setUnit={(e)=>setUnit(e.target.value)}
              setQty={(e)=>setQty(e.target.value)}
              handleSale={handleSale}
              total={total}
              setTotal={setTotal}
              balance={balance}
              setBalance={setBalance}
              Sale_Date={Sale_Date}
              setSaleDate={(e)=>setSaleDate(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer> </Modal.Footer>
       </Modal>
            <div className='col' style={{marginTop:'20px'}}>
             
              <div className='card'>
                <div className='card' style={{height:'50px'}}>
                <div className='card-title' style={{marginLeft:'900px' }}> <button className='btn btn-primary' onClick={create_product}>CREATE PRODUCT</button></div>
                  <div className='card-body'>
                     {/* <div className='col-md-4'><input type="search" className='form-control'/>Search</div> */}
                  </div>
                </div>
                <div className='card-body'>
                 <div className='card'>
                    <div className='card-body'>
                          <ProductTable products={products}
                      delete_product={(id)=>delete_product(id)}
                      onSale={(id)=>onSale(id)}
                      onEdit={(id)=>edit_product(id)}
                  />
                    </div>
                 </div>
                </div>
              </div>
            </div>
        </div>
    </div>
  )
}
export default Products
