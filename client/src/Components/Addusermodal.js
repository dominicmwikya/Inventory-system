import React, { Component } from 'react'
import  Modal from 'react-bootstrap/Modal';
import Adduser from './Adduser';
export default class Addusermodal extends Component {
    onClose = e => {
        this.props.show = false;
      };
  render() {
    if(!this.props.show){
        return null;
    }
    return (
      <div>
          <Modal show={this.props.show}  size='md' style={{marginTop:'50px'}}>
                <Modal.Body>
                    <Adduser close={this.onClose} />
                     <button className="btn btn-danger btn-md center-block app-button" onClick={this.props.onClose}
                      style={{width:"14%",height:"33px", border:'2px', marginTop:"2px", marginLeft:'340px',borderRadius:"5px",}}>Cancel  </button>
                </Modal.Body>
               
            </Modal>
      </div>
    )
  }
}
