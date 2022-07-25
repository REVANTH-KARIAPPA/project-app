import React, { useState, useEffect } from "react";
import axios from "axios";

import authHeader from "../services/auth-header";

import "./Products.css"
import AuthService from "../services/auth.service";

const Categories = () => {
  const currentUser = AuthService.getCurrentUser();
  const [category, setCategory] = useState([]);
  const [name,setName]=useState("SUNGLASS");
  const [prodId,setproId]=useState(0);
  const [myCart,setMyCart]=useState([]);

  const data={}
   
 

  const fetchProducts=()=>{
    axios.get(`http://localhost:8080/category/${name}`,{headers:authHeader()})
    .then((response)=>{
      setCategory(response.data.products);
      
    })}
  useEffect(()=>{
   fetchProducts();    
  },[name])
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

  
  console.log(category)


  return (
    <div className="container">

      <button onClick={()=>setName("SUNGLASS")}>SUNGLASS</button>
      <button onClick={()=>setName("COMPUTERGLASS")}>COMPUTERGLASS</button>
      <button onClick={()=>setName("EYEGLASS")}>EYEGLASS</button>
      <button onClick={()=>setName("CONTACTLENSES")}>CONTACT_LENSES</button>
     <div className="product">
     {
        category.map(product=>(
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

export default Categories;