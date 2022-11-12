import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import swal from 'sweetalert';
const Adduser = (props) => {
 const  navigate=useNavigate()
  const formik = useFormik({
    initialValues: {username: '',email: '',password:'',rpassword:'',role:''
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .max(15, 'Must be 15 characters or less')
        .required('Required'),
      email: Yup.string().email('Invalid email address').required('Required'),
      password:Yup.string().min(4, "password must be atleast 4 characters").max(8,'password must be maximum of 8 characters').required("Required field"),
      rpassword:Yup.string().oneOf([Yup.ref("password"), null],"passwords must match").required("password must match"),
      role:Yup.string().required("Please select user role")
    }),
    onSubmit: values => {
      axios.post('http://localhost:5000/users/create',values, 
      // {headers:{
      //   userToken:localStorage.getItem('Token')
      // }}
      ).then((response)=>{
        if(response.data.error){
            swal('Failed!', response.data.error, "warning")
        } else{
          swal("Good job!", "User Successfuly created!", "success").then(()=>{
            navigate('/createuser')
          })
        }
      })
    },
  });
  return (
    <>
     <div className='card' style={{marginTop:'30px'}}>
       <div className="card-header text-center " style={{fontFamily:'Sans-Serif', textTransform:'uppercase', fontSize:'1.5rem'}}>
       User Signup form
        </div>
         <div className='card-body' style={{backgroundColor:'#F8F8F8'}}>
         <div className='card' >
          <div className='card-body'>
            <form onSubmit={formik.handleSubmit} className="userform" style={{marginLeft:"0px",paddingLeft:"0px"}}>
              <div className='form-group row'>
                  <div className='col'>
                  <div className="input-group mb-3">
                      <div className="input-group-prepend  col-sm-4">
                          <span className="input-group-text">User Name</span>
                      </div>
                    <input id="firstName" name="username"  className='form-control' type="text" onChange={formik.handleChange} 
                     onBlur={formik.handleBlur} value={formik.values.username}/> 
                  </div> 
                  </div>
              </div>
              {formik.touched.username && formik.errors.username ? (<div className='error' style={{color:'red',marginLeft:'200px'}}>{"Username  "+formik.errors.username}</div>  ) : null}
              <div className='form-group row'>
                  <div className='col'>
                  <div className="input-group mb-2">
                      <div className="input-group-prepend  col-sm-4">
                          <span className="input-group-text">User Email: </span>
                      </div>
                      <input id="email" name="email" className='form-control' type="email"   onChange={formik.handleChange} onBlur={formik.handleBlur}value={formik.values.email}/>
                  </div> 
                  </div>
              </div>
              {formik.touched.email && formik.errors.email ? (<div className='error' style={{color:'red',marginLeft:'200px'}}>{"Email "+formik.errors.email}</div> ) : null}
              <div className='form-group row'>
                  <div className='col'>
                  <div className="input-group mb-3">
                      <div className="input-group-prepend  col-sm-4">
                          <span className="input-group-text">User Type: </span>
                      </div>
                      <select className='form-control' name="role" id="role" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.role} >
                        <option value=''>User Role</option>
                        <option value="Admin">Admin</option>
                        <option value="Sales">Sales</option>
                        <option value="Marketers">Marketers</option>
                      </select> 
                  </div> 
                  </div>
              </div>
              {formik.touched.role && formik.errors.role ? (<div className='error' style={{color:'red',marginLeft:'200px'}}>{formik.errors.role}</div>  ) : null}
              <div className='form-group row'>
                  <div className='col'>
                  <div className="input-group mb-3">
                      <div className="input-group-prepend  col-sm-4">
                          <span className="input-group-text">password: </span>
                      </div>
                    <input id="password" name="password" className='form-control' type="password" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} />
                  </div> 
                  </div>
                 
              </div>
              {formik.touched.password && formik.errors.password ? ( <div className='error' style={{color:'red',marginLeft:'200px'}}>{formik.errors.password}</div>) : null}
              <div className='form-group row'>
                  <div className='col'>
                  <div className="input-group mb-3">
                      <div className="input-group-prepend  col-sm-4">
                          <span className="input-group-text">password: </span>
                      </div>
                   <input id="rpassword" name="rpassword" className='form-control' type="password" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.rpassword}/>
                  </div> 
                  </div>
              </div>
              {formik.touched.rpassword && formik.errors.rpassword ?(<div className='error' style={{color:'red',marginLeft:'200px'}}>{formik.errors.rpassword}</div>  ) : null}
               <button className='btn btn-success btn-sm' style={{width:'100px', float:'right', marginLeft:'auto', marginRight:'0px'}}>ADD USER</button>
               {/* <button className="btn btn-danger btn-md center-block app-button" onClick={props.close} style={{width:"18%",height:"40px", border:'2px'}}>Cancel  </button> */}
            </form> 
          </div>
        </div>  
         </div>
       </div>
    </>
  );
};
export default Adduser;