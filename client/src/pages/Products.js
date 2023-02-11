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
import { ProductAPI } from '../APIs/ProductAPI'
import { SalesAPI } from '../APIs/SalesAPI'
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
      product_name:'', product_category:'', product_sku:'', product_price:'',product_brand:'',
      product_min_qty:'', product_unit:'',product_qty:'',product_status:'',product_desc:''
  })
    var date = new Date();
    var formatedDate = `${date.getMonth()+1}-${date.getDate()}-${date.getFullYear()}`
    const[Sale_Date, setSaleDate]=useState(formatedDate)
    useEffect(()=>{
          handleData()
       },[])

      const handleData=()=>{
           setTimeout(()=>{
            ProductAPI.getAll().then((data)=>{
              setProduct(data)
            })
           },4)
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
            ProductAPI.delete_product(id).then((response)=>{
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
        const data={Customer_Name:values.Customer_Name,Quantity:values.Quantity, saleprice:values.saleprice,
                    total:total, amount:values.amount, balance:balance, ProductId:Product_id, Status:values.Status,
                    Sale_Date:Sale_Date}
      SalesAPI.create(data).then((response)=>{
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
            ProductAPI.get(p_id).then((result)=>{
              const data=result.data[0];
              console.log(data)
              setName(data.Name)
              setId(data.id)
              setUnit(data.unit)
              setQty(data.qty)
              handleShow()
             })
      }
      const edit_product=(id)=>{
        ProductAPI.get(id).then((result)=>{
          const data=result.data[0]
          if(data){ 
            setQty(data.qty)
            setName(data.Name)
            setMinQty(data.min_qty)
            setEditPrice(data.price)
            setSku(data.sku)
            setEditId(data.id)
            handleEdit()
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
        const data={  Product_Name:Name,
          id: ProductId,
          product_sku:sku,
          product_price:editprice,
          product_quantity:qty,
          minimum_quantity:min_qty}
          ProductAPI.update(data).then((resp)=>{
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
