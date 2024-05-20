import React, { useState } from "react";

export default function AddProduct(){
    const[name,setName]=useState("");
    const[price,setPrice]=useState("");
    const[category,setCategory]=useState("");
    const[company,setCompany]=useState("");
    const [error,setErorr]=useState(false)

    const addButton =async()=>{

        if(!name || !price || !category || !company){
            setErorr(true);
            return false;
        }
        const adDA = {name , price , category , company}
        // console.log({"name" : name, "price":price,"category":category,"company":company})
        const userId = JSON.parse(localStorage.getItem("user"))._id;

        let result = await fetch('http://localhost:5000/add-product',{
            method:'post',
            body:JSON.stringify((adDA)),
            headers:{
                'content-Type':'application/json'
            }
        });
        result =await result.json();
        console.log("result",result)
         
       
    }
    
    return(
        <div className="product"> 
            <h2>Add_Product</h2>
            <input type="text" className="inputBox"
            value={name} onChange={(e)=>setName(e.target.value)}
            placeholder="Enter Product Name"/>
            {error && !name && <span className="invalid-input">Enter Valid name..!</span>}

            <input type="text" className="inputBox"
            value={price} onChange={(e)=>setPrice(e.target.value)}
             placeholder="Enter Product Price"/>
             {error && !price && <span className="invalid-input">Enter Valid price..!</span>}

            <input type="text" className="inputBox"
            value={category} onChange={(e)=>setCategory(e.target.value)}
             placeholder="Enter Product Category"/>
            {error && !category && <span className="invalid-input">Enter Valid category..!</span>}


            <input type="text" className="inputBox"
            value={company} onChange={(e)=>setCompany(e.target.value)}
             placeholder="Enter Product Company"/>
            {error && !company && <span className="invalid-input">Enter Valid company..!</span>}


            <button className="addButton" onClick={addButton} >Add Product</button>
        </div>
    )
}