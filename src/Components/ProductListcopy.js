import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

export default function ProductListCopy() {
    const [ProductCopy, setProductCopy] = useState([]);
    const navigate = useNavigate();


    console.log("data", ProductCopy)

    const getProductsCopy = async () => {
        let getResult = await fetch('http://localhost:5000/products', {
            headers: {
                authorication: JSON.parse(localStorage.getItem('token'))
            }
        });
        getResult = await getResult.json();
        setProductCopy(getResult)

    }
    useEffect(() => {
        getProductsCopy()
    }, []);

    const dltCpy = async (id) => {
        //   console.log(id)
        let dltresult = await fetch(`http://localhost:5000/producte/${id}`, {
            method: "DELETE"
        });
        dltresult = await dltresult.json()
        // console.log("Dl",dltresult)
        if (dltresult) {
            getProductsCopy()
        }
    }

    const updcpy = (id) => {
        // console.log("cpoy")
        navigate(`/update/${id}`)
    }

    const searchHandle = async (event) => {
        //   console.log(event.target.value)
        let key = event.target.value;
        if (key) {
            let searchResult = await fetch(`http://localhost:5000/search/${key}`);
            searchResult = await searchResult.json();
            if (searchResult) {
                setProductCopy(searchResult)
            }
        }
        else {
            getProductsCopy();
        }

    }

    return (
        <div className="product-list container">
            <h2>Product_List_Copy</h2>
            {/* <br></br> */}
            <input type="text" placeholder="serch" className="srco" onChange={searchHandle} />
            {/* <br></br><br></br> */}
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>S.no.</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Category</th>
                        <th>Company</th>
                        <th>Optione</th>
                    </tr>
                </thead>
                <tbody>
               
                    {
                        ProductCopy.length>0 ? 
                        ProductCopy.map((data, index) => {
                            return <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{data.name}</td>
                                <td>{data.price}</td>
                                <td>{data.category}</td>
                                <td>{data.company}</td>
                                <td>
                                    <button onClick={() => dltCpy(data._id)}>Delete</button> &nbsp;
                                || &nbsp;
                                    <button onClick={() => updcpy(data._id)}>Update</button>
                                </td>

                            </tr>
                        })
                        : <h1 style={{color:"red"}}>Not Match</h1>
                       
                        }

                </tbody>
            </table>
        </div>
    )
}