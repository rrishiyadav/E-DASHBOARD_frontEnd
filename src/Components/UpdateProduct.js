import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function UpdateProduct() {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState('');
    const [company, setCompany] = useState('');
    const params = useParams();
    const navigate = useNavigate();

    useEffect(()=>{
            // console.log(params)
            getApiProduct();
    },[]);

    const getApiProduct= async(id)=>{
        // console.log(params)
        let updateResult = await fetch(`http://localhost:5000/product/${params.id}`);
        updateResult = await updateResult.json();
        setName(updateResult.name);
        setPrice(updateResult.price);
        setCategory(updateResult.category);
        setCompany(updateResult.company)
    }

    const addProduct = async(id) => {
        // console.log(name, price, category, company)
        let adupResult = await fetch(`http://localhost:5000/product/${params.id}`,{
            method:"PUT",
            body:JSON.stringify({name,price,category,company}),
            headers:{
                'Content-Type':'application/json'
            }
        });
        adupResult = await adupResult.json();
        console.log("result",adupResult)
        navigate('/')
        
    }
    return (
        <div className="product">
            <h2>Update_Product</h2>
            <input type="text" className="inputBox"
                value={name} onChange={(e) => setName(e.target.value)}
                placeholder="Enter Product Name" />


            <input type="text" className="inputBox"
                value={price} onChange={(e) => setPrice(e.target.value)}
                placeholder="Enter Product Price" />


            <input type="text" className="inputBox"
                value={category} onChange={(e) => setCategory(e.target.value)}
                placeholder="Enter Product Category" />



            <input type="text" className="inputBox"
                value={company} onChange={(e) => setCompany(e.target.value)}
                placeholder="Enter Product Company" />



            <button className="addButton" onClick={addProduct}>Update</button>
        </div>

    )

}