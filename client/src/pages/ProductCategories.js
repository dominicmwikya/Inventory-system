import React, { Component } from 'react'
import { Table } from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal'
import axios from 'axios'
import 'font-awesome/css/font-awesome.min.css';

export default class ProductCategories extends Component {
    constructor(props){
        super(props)
       this.state={
            categories:[],
            show:false,
            hide:false
       }
    }
    componentDidMount(){
       axios.get("http://localhost:5000/category").then((response)=>{
        const data=response.data
        this.setState({
            categories:data
        })
       })
    }
    category_modal=()=>{
        this.setState({show:true})
    }
    hide_modal=()=>{
        this.setState({
            hide:true
        })
    }
  render() {
    return (
      <div className='container'>
        <div className='row'>
            <Modal show={this.state.show} onHide={this.hide_modal()}>
              <Modal.Header>ADD CATEGORY</Modal.Header>
              <Modal.Body>
                <div className='card'>
                    <div className='card-body'>
                        <form>
                            <div className='card'>
                                <div className='card-body'>
                                   <div className='form-group row'>
                                     <div className='col-md-4'>
                                     <label> Name
                                        <input className='form-control' name='Category_Name'/>
                                      </label>
                                     </div>
                                     <div className='col-md-4'>
                                     <label> CODE
                                        <input className='form-control' name='code'/>
                                   </label>
                                     </div>
                                   </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
              </Modal.Body>
            </Modal>
            <div className='col-md-8' style={{marginTop:"20px"}}>
                <button onClick={this.category_modal}>Create Category</button>
             <div className='card'>
                <div className='card-title'>CATEGORY LIST</div>
                <div className='card-body'>
                <Table  striped bordered hover size="md">
                   <thead>
                     <tr>
                        <th>#</th>
                        <th>Category Name</th>
                        <th>Category Code</th>
                        <th>Description</th>
                        <th colSpan={3}>Action</th>
                     </tr>
                   </thead>
                   <tbody>
                      {
                        this.state.categories.map((category)=>{
                            return(
                                <tr key={category.id}>
                                    <td>{category.id}</td>
                                    <td>{category.Name}</td>
                                    <td>{category.code}</td>
                                    <td>{category.Description}</td>
                                    <td><button className='btn btn-danger btn-sm'><i className="fa fa-trash"></i></button></td>
                                    <td><button className='btn btn-primary btn-sm'><i className="fa fa-edit"></i></button></td>
                                </tr>
                            )
                        })
                      }
                   </tbody>
                </Table>
                </div>
             </div>
            </div>
        </div>
      </div>
    )
  }
}
