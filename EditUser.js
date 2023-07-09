import axios from 'axios';
import React, {useEffect, useState }from 'react'
import {Link,useNavigate, useParams } from 'react-router-dom';

export default function EditUser() {
    let navigate=useNavigate()
    const{id}=useParams()
   const [user,setUser]=useState({
     firstname:"",
     lastname:"",
     email:"",
     mobile:""
   })
   const{firstname,lastname,email,mobile}=user
   const onInputChange=(e)=>{
    setUser({...user,[e.target.name]:e.target.value});
   };
  useEffect(()=>{
    loadUser()
  }, [])

    const onSubmit=async(e)=>{
       e.preventDefault();
       await axios.put(`http://localhost:8080/users/${id}`,user)
       navigate("/")
    };
    const loadUser=async ()=>{
        const result=await axios.get(`http://localhost:8080/users/${id}`)
        setUser(result.data)
    }
  return (
    <div className="container">
      <div className='row'>
        <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
         <h2 className='text-center m-4'> Edit Employee</h2>
         
         <form onSubmit={(e)=>onSubmit(e)}>
         <div className="mb-3">
            <label htmlFor='Name' className='form-label'>First Name</label>
            <input type={"text"} className='form-control' placeholder='Enter your first name'name="firstname"value={firstname}onChange={(e)=>onInputChange(e)}/>
         </div>
         <div className="mb-3">
            <label htmlFor='Name' className='form-label'>Last Name</label>
            <input type={"text"} className='form-control' placeholder='Enter your last name'name="lastname"value={lastname}onChange={(e)=>onInputChange(e)}/>
         </div>
         <div className="mb-3">
            <label htmlFor='Name' className='form-label'>Email</label>
            <input type={"text"} className='form-control' placeholder='Enter your email'name="email"value={email}onChange={(e)=>onInputChange(e)}/>
         </div>
         <div className="mb-3">
            <label htmlFor='Name' className='form-label'>Mobile</label>
            <input type={"text"} className='form-control' placeholder='Enter your mobile'name="mobile"value={mobile}onChange={(e)=>onInputChange(e)}/>
         </div>
         <button type="submit" className='btn btn-outline-primary'>submit</button>

         <button type="submit" className='btn btn-outline-danger mx-2'>Cancel</button>
         </form>
     </div>
    </div>
    </div>
  )
}
