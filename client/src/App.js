import './App.css';
import Home from './pages/Home';
import Register from './pages/Register';
import Sales from './pages/Sales';
import Products from './pages/Products';
import Purchases from './pages/Purchases'
import Login from './pages/Login';
import Suppliers from './pages/suppliers';
import Dashboard from './pages/Dashboard';
import ProductCategories from './pages/ProductCategories'
import CreateUser from './pages/CreateUser';
import Navbar  from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container';
import NavDropdown from 'react-bootstrap/NavDropdown'
import Nav from 'react-bootstrap/Nav';
import {AuthContext} from './Context/AuthContext'
import {BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom'
import {useState, useEffect} from 'react'
import axios from 'axios';
function App() {
const[authState, setAuthState]=useState({
  username:'', id:0, status:false, role:"",
})
useEffect(()=>{
  axios.get('http://localhost:5000/users/auth',{
    headers:{
      userToken:localStorage.getItem("Token")
    }
  }).then((respo)=>{
    if(respo.data.error){
      setAuthState({...authState, status:false})
    }else{
      setAuthState({
        username:respo.data.username, id:respo.data.id,role:respo.data.role, status:true
      })
    }
  });
},[])
const logout=()=>{
  localStorage.removeItem("Token")
  setAuthState({
    username:'',id:0, role:'', status:false
  })
}
  return (
    <div className="App">
      <AuthContext.Provider value={{authState, setAuthState}}>
      <Router>
        <Navbar collapseOnSelect expand="lg" style={{backgroundColor:'#008080', color:'white'}} className='navbar d-flex flex-row reverse' sticky='top'>
              <Container fluid>
              <Navbar.Brand as={Link} to='/'>PD Electronics</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                  <Nav className="mr-auto nav">
                      {!authState.status ?(
                         <>
                         <Link to='/login'  className='link login'>Login</Link>
                         <Link to='/register'  className='link'>Users</Link>
                      </>
                      ): 
                      <>
                    <Link to='/home' className='link'>Home</Link>
                    <Link to='/createuser'  className='link'>Register</Link>
                    <Link to='/products'  className='link'>Products</Link>
                    <Link to='/purchases'  className='link'>Purchases</Link>
                    <Link to='/sales'  className='link'>Sales</Link>
                    <Link to='/suppliers'  className='link'>suppliers</Link>
                    <Link to='/purchases' className='link'>Product Category</Link>
                    <NavDropdown title="user Profile" id="collasible-nav-dropdown" className='dropdown'>
                        <NavDropdown.Item> <button onClick={logout}>Logout</button></NavDropdown.Item>
                        <NavDropdown.Item>{authState.username}</NavDropdown.Item>
                        <NavDropdown.Item >{authState.role}</NavDropdown.Item>
                    </NavDropdown>
                      </>     
                      }
                  </Nav>
                </Navbar.Collapse>
              </Container>
            </Navbar>
            <Routes>
              <Route path='/' element={<Dashboard/>}/>
              <Route path='/home' element={<Home/>}/>
              <Route path='/createuser' element={<CreateUser/>}/>
              <Route path='/register' element={<Register/>}/>
              <Route path='/sales' element={<Sales/>}/>
              <Route path='/products' element={<Products/>}/>
              <Route path='/suppliers' element={<Suppliers />}/>
              <Route path='/category' element={<ProductCategories/>}/>
              <Route path='/purchases' element={<Purchases/>}/>
              <Route path='/login' element={<Login/>}/>
            </Routes>
        </Router>
      </AuthContext.Provider>
        
    </div>
  );
}

export default App;
