import { QuerySnapshot, collection, getDocs, query } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap'

import { Link, useParams } from 'react-router-dom'
import { db } from '../firebase-config/firebaseConfig'

const DisplayTable = ({ handleOnDelete}) => {
  const [todo, setTodo] = useState([])
  
  const fetchData = async()=>{
      const q = query(collection(db, 'todos'))
      const querySnapshot = await getDocs(q)
      const todosData = []
      querySnapshot.forEach((doc)=>{
          let data = doc.data()
          todosData.push(data)
         
         
         
      })
      setTodo(todosData)
      console.log(todo)
  }
  console.log(todo)
useEffect(()=>{
  fetchData()

},[])
  return (
    <div className="table p-2 ">
        <Table striped bordered hover className='mt-5'>
            
      <thead>
        <tr>
          <th>#</th>
          <th>ToDo</th>
          <th>Date</th>
          <th>Action</th>
          
        </tr>
      </thead>
      <tbody>
        {todo.map((item,i)=>(
           <tr >
             <td>{i+1}</td>
             <td>{item.todo}</td>
             <td>{item.date}</td>
             <td className='text-center'><Link  title='Update' className='m-1' to={`/update/`}><i class="fa-solid fa-pen-to-square"></i></Link><Button title='Delete' onClick={()=>handleOnDelete(item.i)}    variant='danger' className='btn-sm' ><i className="fa-solid fa-trash"></i></Button></td>
           </tr>

        ))}
            

       
       
        
        
      </tbody>
    </Table>
    </div>
    
  )
}

export default DisplayTable
