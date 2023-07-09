import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom';

export default function Home() {
    const [users,setUsers]=useState([])

    const{id}=useParams()

    useEffect(()=>{
        loadUsers();
    }, []);
    const loadUsers= async()=>{
        const result=await axios.get("http://localhost:8080/users")
        setUsers(result.data);
    }
    const delectUser= async(id)=>{
        await axios.delete(`http://localhost:8080/users/${id}`)
        loadUsers()
    }
  return (
    <div className='container'>
        <div className='py-4'>
        <table className="table border shadow">
  <thead>
    <tr>
      <th scope="col">Id</th>
      <th scope="col">FirstName</th>
      <th scope="col">LastName</th>
      <th scope="col">Email</th>
      <th scope="col">Mobile</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
    {
        users.map((user,index)=>(
     <tr>
      <th scope="row" key={index}>{index+1}</th>
      <td>{user.firstname}</td>
      <td>{user.lastname}</td>
      <td>{user.email}</td>
      <td>{user.mobile}</td>
      <td>
        <Link className='btn btn-success mx-2' 
        to={`/edituser/${user.id}`}
        >Edit</Link>
        <button className='btn btn-danger mx-2'
        onClick={()=>delectUser(user.id)}
        >Delete</button>
      </td>
    </tr> 
        ))
        }
    </tbody>
      </table>
        </div>
         </div>
  );
}
