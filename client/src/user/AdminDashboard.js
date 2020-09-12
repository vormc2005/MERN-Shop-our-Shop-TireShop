import React from 'react'
import Layout from '../core/Layout'
import {isAuthenticated} from '../auth/index'
import {Link} from 'react-router-dom'

const AdminDashboard=()=> {

    const {user:{_id, name, email, role}} = isAuthenticated()

    const adminInfo = ()=>{
        return(
            <div className="card mb-5">
                <h3 className="card-header">User Information</h3>
                    <ul className="list-group">
                        <li className="list-group-item">{name}</li>
                        <li className="list-group-item">{email}</li>
                        <li className="list-group-item">{role === 1 ? 'Admin' : 'Registered User'}</li>
                     </ul>
         </div> 
        )
    }

    const adminLinks =()=>{
        return(
            <div className="card mb-5">
            <h3 className="card-header">User Information</h3>
                <ul className="list-group">
                    <li className="list-group-item">
                        <Link to="/category/create">
                            Create Category
                        </Link>
                    </li>
                   <li className="list-group-item">
                        <Link to="/product/create">
                            Create Product
                        </Link>
                    </li>

                    <li className="list-group-item">
                        <Link to="/admin/orders">
                           View Orders
                        </Link>
                    </li>

                    <li className="list-group-item">
                        <Link to="/admin/products">
                           Manage Products
                        </Link>
                    </li>
                  
                </ul>
     </div> 
        )
    }

    return (
        <Layout 
                title="Admin Dashboard" 
                description={`Hello, 
                ${name}. Welcome to your dashboard!`} 
                className="container-fluid">
            <div className="row">
                        <div className="col-md-3">
                            {adminLinks()}
                        </div>
                        <div className="col-md-9">
                            {adminInfo()}
                        </div>
            </div>
            
            
        </Layout>
    )
}

export default AdminDashboard
