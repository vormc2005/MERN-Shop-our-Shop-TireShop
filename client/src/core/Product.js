import React, {useState, useEffect} from 'react'
import Layout from './Layout'
import {read, listRealted} from './apiCore'
import Card from './Card'



const Product=(props)=> {

    const [product, setProduct]= useState({})
    const [relatedProduct, setRelatedProduct]=useState([])
    const [error, setError]= useState(false)

    const loadingSingleProduct = productId =>{
        read(productId).then(data=>{
            if(data.error){
                setError(data.error)
            }else{
                setProduct(data)
                //fetch related prducts
                listRealted(data._id).then(data=>{
                    if(data.error){
                        setError(data.error)
                    }else{
                        setRelatedProduct(data)
                    }
                })
            }
        })
    }

    useEffect(()=>{
        const productId = props.match.params.productId
        loadingSingleProduct(productId)
    }, [props])

    return (
        <Layout 
        title={product && product.name} 
        description={product && product.description && product.description.substring(0,100)}
        className="container-fluid">
          
            
            <div className="row">

              <div className="col-8">
              {product && product.description &&  <Card product={product} showViewProductButton={false} />}
              </div>
              <div className="col-4">
                  <h4>Related products</h4>
                  {relatedProduct.map((p, i)=>(
                      <div className="mb-3">
                          <Card kei={i} product={p}/>
                      </div>
                  ))}
              </div>
                
                {/* {JSON.stringify(product)} */}
            </div>


        </Layout> 
        
    )
}

export default Product
