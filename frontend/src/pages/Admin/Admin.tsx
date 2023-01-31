import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import AdminNavigation from 'src/components/molecules/Navigation/Admin/AdminNav'

const Admin = () => {
    const location = useLocation();
    console.log(location);
  return (
    <div>
        <div>
            <AdminNavigation />
        </div>
        <div>
        <Outlet />
        </div>
      
    </div>
  )
}

export default Admin
