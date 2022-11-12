import React, { Component } from 'react'
import  Modal from 'react-bootstrap/Modal';
export default class ModalEdit extends Component {
    onClose = e => {
        this.props.show = false;
      };
    render() {
        if(!this.props.show){
            return null;
        }
        return (
            <div>
                <Modal show={this.props.show}>
                    <Modal.Header>
                        <Modal.Title>Update Sale !</Modal.Title>
                    </Modal.Header>
                  <Modal.Body>
                  <form>
                    
                   <div className='form-group row'>
                    <div className='col-sm-3'><label>Customer</label></div>
                        <div className='col'>
                            <input  className='form-control' type="text" name='customer_Name' value={this.props.customer_Name} onChange={this.props.onChange}/>
                        </div>
                   </div>
                 
                   <div className='form-group row'>
                    <div className='col-sm-3'><label>Total</label></div>
                        <div className='col'>
                        <input  className='form-control' type="hidden" name='id' value={this.props.total} onChange={this.props.onChange}/>
                            <input  className='form-control' type="number" name='Total_Cost' value={this.props.total} onChange={this.props.onChange}/>
                        </div>
                   </div>
                   <div className='form-group row'>
                    <div className='col-sm-3'><label>Amount Paid</label></div>
                        <div className='col'>
                            <input  className='form-control' type="number" name='Amount_Paid' value={this.props.amount} onChange={this.props.onChange}/>
                        </div>
                   </div>
                   <div className='form-group row'>
                    <div className='col-sm-3'><label>Balance</label></div>
                        <div className='col'>
                            <input  className='form-control' type="number" name='customer_Balance'value={this.props.balance} onChange={this.props.onChange}/>
                        </div>
                   </div>
                  <div className='form-group row buttons'>
                        <button className="btn btn-danger btn-md center-block app-button" onClick={this.props.onClose} style={{width:"18%",height:"40px", border:'2px'}}>Cancel  </button>
                        <button className='btn btn-primary btn-md center-block app-button' style={{width:"18%", height:"40px",border:'2px', }}>Update</button>
                       </div>
                  </form>
                  </Modal.Body>
                </Modal>
            </div>
          );
        }
}
