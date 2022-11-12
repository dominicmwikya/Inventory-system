import React, { Component } from 'react'
import 'font-awesome/css/font-awesome.min.css';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import dateFormat from 'dateformat';
import Table from 'react-bootstrap/Table'
import "jquery/dist/jquery.min.js";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import "datatables.net-buttons/js/dataTables.buttons.js";
import "datatables.net-buttons/js/buttons.colVis.js";
import "datatables.net-buttons/js/buttons.flash.js";
import "datatables.net-buttons/js/buttons.html5.js";
import "datatables.net-buttons/js/buttons.print.js";
import $ from "jquery";
import swal from 'sweetalert';
import ModalEdit from '../Components/Modal'
export default class Saleslist extends Component {
  constructor(props){
    super(props)
    this.state={
      salesList: [],
      show:false,
      value:'',
      customer_Name:"",
      product_Quantity:'',
      Amount_Paid:'',
      Total_Cost:"",
      customer_Balance:"",
      id:''
    }
  }
   onChange=(event)=>{
       const target=event.target;
       const value=target.value;
       const name=target.name;
       this.setState({
        [name]:value
       })
   }
  showModal=()=>{
    this.setState({
      show: !this.state.show
    });
  }
  hideModal=()=>{
    this.setState({show:false})
  }
  edit=(id)=>{
      axios.get(`http://localhost:5000/sales/${id}`,{
        headers:{ userToken:localStorage.getItem("Token")}
      }).then((result)=>{
         if(result.data.error){
           swal(result.data.error,{icon:"warning"})
         }else{
          this.showModal()
          this.setState({
            customer_Name:result.data.Customer_Name,
            Amount_Paid:result.data.amount,
            Total_Cost:result.data.total,
            id:result.data.id,
            customer_Balance:result.data.balance
          })
         }
      })
  }
  delete=(id)=>{
    axios.delete(`http://localhost:5000/sales/delete/${id}`,{
      headers:{ userToken:localStorage.getItem("Token")}
    }).then((respos)=>{
      if(respos){
        console.log(respos)
        // this.show_items_after_change()
      }
    })
  }
  show_items_after_change=()=>{
    setTimeout(()=>{
      axios.get("http://localhost:5000/sales", {
        headers:{userToken:localStorage.getItem("Token")}
      })
      .then((response)=>{
          if(response.data.error){
             swal(response.data.error, {icon:'warning'})
          }else{
            console.log(response.data)
            this.setState({salesList:response.data});
            if (!$.fn.DataTable.isDataTable("#table")) {
              $(function () {
                setTimeout(function () {
                  $("#table").DataTable({
                    pagingType: "full_numbers",
                    pageLength: 10,
                    processing: true,
                    retrieve: true,
                    dom: "Bfrtip",
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
     }, 2) 
  }
  componentDidMount(){
     this.show_items_after_change()
}
  showTable = () => {
    try {
      return  this.state.salesList && this.state.salesList.map((item, index) => {
        return (
            <tr key={item.id}>
                <td className="text-xs font-weight-bold">{index +1}</td>
                <td  className="text-xs font-weight-bold">{dateFormat(item.Sale_Date,"dd-mm-yyyy")}</td>
                <td  className="text-xs font-weight-bold">{item.Customer_Name}</td>
                <td  className="text-xs font-weight-bold">{item.Product.Name}</td>
                <td  className="text-xs font-weight-bold">{item.Quantity}</td>
                <td  className="text-xs font-weight-bold">{item.total}</td>
                <td  className="text-xs font-weight-bold">{item.amount}</td>
                <td  className="text-xs font-weight-bold">{item.balance}</td>
                <td  className="text-xs font-weight-bold">{item.Status}</td>
                <td className="text-xs font-weight-bold"> 
                  <button className='btn btn-success btn-sm'  onClick={e=>{ this.edit(item.id);}}><i className="fa fa-edit"></i></button>
                </td>
                <td className="text-xs font-weight-bold"><button className='btn btn-danger btn-sm' onClick={()=>this.delete(item.id)} ><i className="fa fa-trash"></i></button></td>
               
            </tr>
            );
      });
    } catch (e) {
      alert(e.message);
    }
  };
  render() {
    return (
      <>
        <div className='row'>
          <div className='col-md-12'>
          <ModalEdit show={this.state.show} 
               onClose={this.hideModal}
               customer_Name={this.state.customer_Name}
               balance={this.state.customer_Balance}
               amount={this.state.Amount_Paid}
               total={this.state.Total_Cost}
               id={this.state.id}
               onChange={this.onChange}
               />
            <div className='card'>
              <div className='card-body'>
              <Table striped bordered hover size="md" id='table'>
                <thead className='table-light'>
                    <tr>
                        <th>NO.</th>
                        <th>Date</th>
                        <th>Customer Name</th>
                        <th>Product Name</th>
                        <th>Quantity</th>
                        <th>Total  cost</th>
                        <th>Amount paid</th>
                        <th>Amount due</th>
                        <th>Payment status </th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                {this.showTable()}         
                </tbody>
              </Table>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
}
