import React, {useState, useEffect} from 'react'
import Layout from './Layout'
import {getProducts} from './apiCore'
import Card from './Card'
import Search from './Search'


const Home=()=> {

    const [productBySell, setProductsBySell] = useState([])
    const [productByArrival, setProductsByArrival] = useState([])
    const [error, setError] = useState(false)

    const loadProductsBySell = ()=>{
        getProducts('sold').then(data=>{
            if(data.error){
                setError(data.error)
            }else{
                setProductsBySell(data)
            }
        })
    }

    const loadProductsByArrival = ()=>{
        getProducts('createdAt').then(data=>{
            if(data.error){
                setError(data.error)
            }else{
                setProductsByArrival(data)
            }
        })
    }

    useEffect(()=>{
        loadProductsByArrival()
        loadProductsBySell()
    }, [])




    return (
        
        
        <Layout title='SHOP-OUR-SHOP' description='Welcome to the Home Page' className="container-fluid">
            <Search/>
            <h2 className="mb-4">New Arrivals</h2>
            <div className="row">                
                {productByArrival.map((product, i)=>(
                    <div key={i} className="col-12 col-md-3 mb-3">
                        <Card  product={product}/>
                    </div>
                
                ))}
            </div>



            <h2 className="mb-4">Best Sellers</h2>
            <div className="row">               
            {productBySell.map((product, i)=>(
            <div key={i} className=" col-12 col-md-4 mb-3">
                <Card  product={product}/>
            </div>
            ))}
            </div> 
           
            
{/* 
            {JSON.stringify(productByArrival)}
            <hr/>
            {JSON.stringify(productBySell)} */}
        </Layout> 
        
    )
}

export default Home
