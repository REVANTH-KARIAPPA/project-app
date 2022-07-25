import axios from "axios";
import React, { useState, useEffect } from "react";
import authHeader from "../services/auth-header";


const BoardAdmin = () => {
  const [content, setContent] = useState({
    productName:"",prize:0,img:""
      
    
  });
  
  
  
  
  function handleChange(event){
    setContent((prevData)=>{
      return{
        ...prevData,
        [event.target.name]:event.target.value
      }
    })
    
  }
  
   

  
  
  function handleSubmit(event){
    event.preventDefault()
    axios.post(`http://localhost:8080/admin/create`,content,{headers:authHeader()})
    .then((response)=>{
    console.log("data sent");
     
    })
    .catch(err=>{
      console.log(err); 
        
      })
    console.log(content);

  }
  

  return (
    <div className="container">
      <h2>Add Products</h2>
      <form onSubmit={handleSubmit}>
      <div>
         <br/> Product Name<br/>
          <input type="text" onChange={handleChange} name="productName" value={content.name} />
         </div>
         
         <div>
         <br/> Prize<br/>
          <input type="text" onChange={handleChange} name="prize" value={content.prize}/>
         </div>
         <div>
         <br/>Image<br/>
          <input type="text" onChange={handleChange} name="img"  value={content.img}/>
         </div>
         
         
         <button>Submit</button>
      </form>



    </div>
  );
};

export default BoardAdmin;
