import React from 'react'
import {
  LineChart, Line, PieChart, Pie, Cell, Tooltip, ResponsiveContainer,XAxis,YAxis,CartesianGrid,BarChart, Bar
} from 'recharts';
import './VendorChart.css'

const salesData = [
  { name: 'Jan', sales: 400 },
  { name: 'Feb', sales: 800 },
  { name: 'Mar', sales: 600 },
  { name: 'Apr', sales: 900 },
];
const CustomerData = [
  { name: 'Jan', customer: 400 },
  { name: 'Feb', customer: 800 },
  { name: 'Mar', customer: 600 },
  { name: 'Apr', customer: 900 },
];

const pieData = [
  { name: 'Electronics', value: 400 },
  { name: 'Fashion', value: 300 },
  { name: 'Grocery', value: 300 },
  { name: 'Books', value: 200 },
];

const COLORS = ['#0088FE', '#3d35ab', '#e3b810', '#FF8042'];

const VendorCharts = () => {

  return (
    <div className=" p-8 grid grid-cols-1 md:grid-cols-2 gap-8 chart-box">
        <h3>Analysis Report of Sales</h3>
      <div className="chartContainer shadow-xl rounded-2xl border p-2">
        <h6 className="text-xl font-bold mb-4">Monthly Sales</h6>
        <ResponsiveContainer width="100%" height={150}>
          <BarChart data={salesData}>
            <CartesianGrid strokeDasharray="2 1" />
              <XAxis dataKey="name" stroke='#fcdb' />
              <Bar type="step" dataKey="sales" fill="#fcdb03" strokeWidth={2} />
              <YAxis stroke='#badb03'/>
              <Bar type="step" dataKey="name" fill="#183661" strokeWidth={2} />
              <Tooltip />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white shadow-xl rounded-2xl border p-2 show-between">
        <div className=''>
          <h6 className="text-xl font-bold mb-4">Product Categories</h6>
          <ResponsiveContainer width={300} height={250} >
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} values={entry.name} position="inside" />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white shadow-xl rounded-2xl border p-2">
          <h6 className="text-xl font-bold mb-4">Number of Customers</h6>
          <ResponsiveContainer width={500} height={150} >
            <BarChart data={CustomerData}>
              <CartesianGrid strokeDasharray="2 1" />
              <XAxis dataKey="name" />
              <Bar type="step" dataKey="customer" fill="#183661" strokeWidth={2} />
              <YAxis />
              <Bar type="step" dataKey="name" fill="gold" strokeWidth={2} />
              <Tooltip />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default VendorCharts


