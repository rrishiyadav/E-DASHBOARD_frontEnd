import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function ProductList() {
    const [products, setProducts] = useState([]);
    // const navigate = useNavigate();
    
    const getProducts= async()=>{
        let getResult =await fetch('http://localhost:5000/products',{
            headers:{
                authorication:JSON.parse(localStorage.getItem('token'))
            }
        });
        getResult = await getResult.json();
        setProducts(getResult)
        
    }
    useEffect(()=>{
        getProducts();
    },[])

   

    // console.log("products :", products);

    const proDeleteButton=async(id)=>{
        // console.log(id)
        let deletResult =await fetch(`http://localhost:5000/producte/${id}`,{
            method:"DELETE",
        });
        deletResult = await deletResult.json();
        // console.log("data",deletResult)
        if(deletResult){
            getProducts();
        }
    }
    // const proUpdateButton=(id)=>{
    //        navigate(`/update/${id}`)
    // }
    const searchHandle=async(event)=>{
    //   console.log(event.target.value)
    let key = event.target.value;
    if(key){
        let searchResult = await fetch(`http://localhost:5000/search/${key}`);
    searchResult = await searchResult.json();
    if(searchResult){
        setProducts(searchResult)
    }
    }
    else{
        getProducts();
    }
    
    }

    return (
        <div className="product-list">
            <h3>ProductList</h3>
            <input type="text" className="search-prodcut-box" placeholder="search product"
            onChange={searchHandle}/>
            <ul>
                <li>S.no</li>
                <li>Name</li>
                <li>Price</li>
                <li>Category</li>
                <li>Company</li>
                <li>Optione</li>
            </ul>
            {
              products.length>0 ?  products.map((item,index) =>
                 
                      <ul key={item._id}>
                        <li>{index+1}</li>
                        <li>{item.name}</li>
                        <li>$ {item.price}</li>
                        <li>{item.category}</li>
                        <li>{item.company}</li>
                        <li>
                            <button onClick={()=>proDeleteButton(item._id)}>Delete</button>
                            {/* <button onClick={()=>proUpdateButton(item._id)}>update</button> */}
                        </li>
                        <Link to={"/update/"+item._id}>Update</Link>
                    </ul>
                )
                :<h2 style={{color:"red"}}>No Result Found..!</h2>
            }
        </div>
    )

}