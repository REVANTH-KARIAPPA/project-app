import axios from "axios";
import React, { useEffect, useState } from "react";
import AuthService from "../services/auth.service";
import authHeader from "../services/auth-header";

const Profile = () => {
  const currentUser = AuthService.getCurrentUser();
  const [orders,setOrders]=useState([]);
  const [delId,setDelId]=useState(null);
  const [total,setTotal]=useState(0);
  useEffect(()=>{
    axios.get(`http://localhost:8080/user/${currentUser.id}`,{headers:authHeader()})
    .then((response)=>{
      
     setOrders(response.data.orders);
     
     console.log(response.data.orders);
     
     
    
    })
    .catch(err=>{
      console.log(err) 
        
      })
  },[])
 useEffect(()=>{
  axios.delete(`http://localhost:8080/order/${delId}/user/${currentUser.id}`,{headers:authHeader()})
    .then((response)=>{
      
     console.log("delete request sent");
     
    
    })
    .catch(err=>{
      console.log(err) 
        
      })
 },[delId])

 const orderData =  orders.map((item,index)=>(
  <div key={index}>
   <h4>Order Id = {item.orderId}</h4>
    {
      item.products.map((c,i)=>(
        <li key={i}>
          <p> Product Name : {c.productName} <br/>Prize : ₹ {c.prize} </p>     

        </li> 
      ))
    }
    <p>Total : {item.orderTotal}</p>
    <button onClick={()=>(setDelId(item.orderId))}>Cancel Order</button>
  </div>
))
  
  return (
    <div className="container">
      <header className="jumbotron">
        <h3> <strong>Profile </strong> <br/>
          Name : {currentUser.username}
        </h3>
      </header>
     
      <p>
        <strong>Id:</strong> {currentUser.id}
      </p>
      <p>
        <strong>Email:</strong> {currentUser.email}
      </p>
      <strong>Authorities:</strong>
      <ul>
        {currentUser.roles &&
          currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
      </ul>
      <h3>Your Orders</h3>
      <ul>
         {orderData}
         
         


           </ul>

    </div>
  );
};

export default Profile;
