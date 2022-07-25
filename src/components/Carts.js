import React, { useEffect, useState,useRef} from 'react'
import AuthService from "../services/auth.service";
import axios from 'axios';
import authHeader from '../services/auth-header';


const Carts = () => {
const currentUser = AuthService.getCurrentUser();
const [myUser,setMyUser]=useState([])
const[prodId,setproId]=useState(0);
const[cartsId,setCartsId]=useState(0);
const [isSending, setIsSending] = useState(null);
const didMount = useRef(false);
const [total,setTotal]=useState(0);
const data={};
 



 useEffect(()=>{
  axios.put(`http://localhost:8080/cart/${cartsId}/rep/${prodId}`,data,{headers:authHeader()})
  .then((res)=>{
      console.log(res);
      
  })
 
 },[prodId])


 useEffect(()=>{
  axios.get(`http://localhost:8080/user/${currentUser.id}`,{headers:authHeader()})
  .then((response)=>{
    console.log("produ in my user")
   setMyUser(response.data.cart.products);
   setCartsId(response.data.cart.cartId);
   setTotal(response.data.cart.cartTotal);
   console.log(response.data.cart);
  })
  .catch(err=>{
    console.log(err) 
      
    })
  },[])

  //  for Ordering products

  useEffect(() => {

      if(didMount.current){
  
  console.log(myUser);

     axios.post(`http://localhost:8080/admin/${currentUser.id}/products`,myUser,{header:authHeader()})
    .then((response)=>{
      console.log("data sent to api");
    })

  }

  else{didMount.current=true}
  }, [isSending]) // update the callback  if the state changes



 
const cartData=myUser.map(p=>
        
  <li key={p.productId}> <p>Product Name : {p.productName}  <br/>
                            Prize : ₹ {p.prize}            </p>
  <button  onClick={()=>(setproId(p.productId))}>Remove</button> <br/><br/>
  </li>
    
  )

 

  return (
    <div className="container">
      <header className="">
        <h3>
          <strong>{currentUser.username}</strong> 
        </h3>
      </header>
     
     
     
      
      <h3>Products In Cart</h3>
      <ul>
      {cartData}

      </ul>
      {total>0 && <p>Total : {total}</p>
      }
      <div>{cartData.length!=0&&<input type="button"  
         value="Place Order" onClick={()=>{setIsSending((p)=>!p)}} />}</div>
      </div>
  );
};

export default Carts;