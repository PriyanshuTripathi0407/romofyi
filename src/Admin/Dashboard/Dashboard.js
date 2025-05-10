import { Button } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
const Dashboard = () => {
  return (
    <div className='Dashboard'>
      <h1>e-COMMERCE DASHBOARD</h1>
      <ul>
        <Link to='custom'><Button> Register </Button> </Link>
      </ul>
    </div>
  )
}

export default Dashboard
