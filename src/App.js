import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navi from './Components/Navig';
import Footer from './Components/Footer';
import SignUp from './Components/SignUp';
import PrivateComponent from './Components/PrivateComponent';
import Login from './Components/Login';
import AddProduct from './Components/AddProduct';
import ProductList from './Components/ProductsList';
import UpdateProduct from './Components/UpdateProduct';
import ProductListCopy from './Components/ProductListcopy';





function App() {
  return (
    <div className="App">
      
      <Navi/>
     
      <Routes>

        <Route element={<PrivateComponent/>}>
        <Route path='/' element={<ProductList/>}></Route>

        {/* <Route path='/' element={<ProductListCopy/>}></Route>
        button */}

        <Route path='/add' element={<AddProduct/>}></Route>
        <Route path='/update/:id' element={<UpdateProduct/>}></Route>
        <Route path='/logout' element={<h1>logout Products Listing Component</h1>}></Route>
        <Route path='/profile' element={<h1>profile Products Listing Component</h1>}></Route>
        </Route>

       <Route path='/signup' element={<SignUp/>}/> 
       <Route path='/login' element={<Login/>}/>       
       </Routes>
      
       
      
      <Footer/>
      
      
      
      </div>
  );
}

export default App;
