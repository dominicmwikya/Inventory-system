import axios from 'axios'
import React, { Component } from 'react'
import Table from 'react-bootstrap/esm/Table'

export default class Userlist extends Component {
    constructor(props){
        super(props)
        this.state={
            userList:[]
        }
    }
  componentDidMount(){
    this.get_users()
  }
  get_users=()=>{
    axios.get('http://localhost:5000/users',{headers:{userToken:localStorage.getItem('Token')}}).then((users)=>{
        this.setState({
            userList:users.data
        })
        console.log(this.state.userList)
    })
}
table_data=()=>{
    return  this.state.userList && this.state.userList.map((user, index) => {
        return (
            <>
             <tr key={user.id}>
              <td>{index+1}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
             </tr>
            </>
        )

    })
}
  render() {
    return (
      <div>
          <Table className='table table-bordered '>
            <thead>
              <tr>
                <th>#</th>
                <th>username</th>
                <th>Email</th>
                <th>User Role</th>
              </tr>
            </thead>
            <tbody>
            {
            this.table_data()
            }
            </tbody>
          </Table>
      </div>
    )
  }
}
