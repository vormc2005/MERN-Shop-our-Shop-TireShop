import React, {useState} from 'react'
import Layout from '../core/Layout'
import {isAuthenticated} from '../auth/index'
import {Link} from 'react-router-dom'
import {createCategory} from './apiAdmin'




const AddCategory=()=> {

    const [name, setName] = useState('')
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)

    //destructure user from local storage

    const {user, token}= isAuthenticated()


    const handleChange = event=>{
        setError("")
        setName(event.target.value)
    }

    const clickSubmit = (e)=>{
        e.preventDefault()
        setError("")
        setSuccess(false)
        //make API call to create category
        createCategory(user._id, token, {name})
        .then(data =>{
            if(data.error){
                setError(data.error)
            }else{
                setError('')
                setSuccess(true)
            }
        })

    }

    const newCategoryForm=()=>{
        return(
        <form onSubmit={clickSubmit}>
            <div className="form-group">
                <label className="text-muted">
                    Name
                </label>

                <input 
                type="text" 
                className='form-control' 
                onChange={handleChange} 
                value={name}
                autoFocus
                required
                />               
            </div>
            <button 
                className="btn btn-outline-primary">
                    Create Category
            </button>
        </form>
        )
    }

    const showSuccess = ()=>{
        if(success){
        return <h3 className="text-success">{name} is created</h3>
        }
    }

    const showwError = ()=>{
        if(error){
        return <h3 className="text-danger">Category should be unique</h3>
        }
    }

    const goBack = ()=>{
        return(
        <div className="mt-5">
            <Link to="/admin/dashboard" className="text-warning">
                Back To Dashboard
            </Link>
        </div>
        )
    }

    return (
         <Layout 
                title="Add a New Category" 
                description={`Hello, 
                ${user.name}. You can add new product category here!`} 
                className="container">
                    <div className="col-md-8 offset-md-2">
                    {showSuccess()}
                    {showwError()}
                    {newCategoryForm()}    
                    {goBack()}     
                    </div>
        </Layout>
    )
}

export default AddCategory
