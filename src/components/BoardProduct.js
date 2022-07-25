import React, { useState, useEffect } from "react";
import axios from "axios";

import authHeader from "../services/auth-header";

import "./Products.css"
import AuthService from "../services/auth.service";

const BoardProduct = () => {
  const currentUser = AuthService.getCurrentUser();
  const [content, setContent] = useState([]);
  const [myCart,setMyCart]=useState([])
  const [prodId,setproId]=useState(0)

  const data={}
   
 

  const fetchProducts=()=>{
    axios.get("http://localhost:8080/api/product/all",{headers:authHeader()})
    .then((response)=>{
      setContent(response.data);
    })}
  useEffect(()=>{
   fetchProducts();    
  },[])

  useEffect(()=>{
    axios.get(`http://localhost:8080/user/${currentUser.id}`,{headers:authHeader()})
    .then((response)=>{
     setMyCart(response.data.cart.cartId);
     
    })
    .catch(err=>{
      console.log(err); 
        
      })
    },[])
   useEffect(()=>{
    axios.put(`http://localhost:8080/cart/${myCart}/product/${prodId}`,data,{ headers: authHeader() })
    .then((response)=>{
      console.log(data);
    })
   },[prodId])


  return (
    <div className="container">
     <div className="product">
      {
        content.map(product=>(
          <div key={product.productId}>
            <img src={product.img} alt=""/> <br/>
            {product.productName}   <br/>
            ₹{product.prize} <br/>
           
            <button onClick={()=>setproId(product.productId)}>Add To Cart</button>
             
            </div>
        ))
      }
      
     </div>
      
      
      
    </div>
  );
};

export default BoardProduct;
