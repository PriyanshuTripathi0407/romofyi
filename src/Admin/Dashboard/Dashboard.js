import Dropdowns from '../../Components/Dropdown/Dropdowns';
import UserInfo from '../../Components/Header/UserInfo';
import Sidebar from '../../Components/Sidebar/Sidebar';

const Dashboard = () => {
  return (
    <div className='container-fluid' >
      <div className='row'>
        <UserInfo />
        <div className='col-md-8'>
          {/* <Dropdowns /> */}
          <div className='container-fluid'>
            <div className='d-flex align-items-center justify-content-between w-100'>
              <div className='p-2'>
                <img src='' alt='Product Image'/>
                  <p className='fw-bold mb-0'>Product Name</p>
                  <div className='d-flex justify-content-between'>
                    <p>Product Price</p>
                    <p>Product Discount</p>
                  </div>
              </div>
             
            </div>
          </div>
        </div>
        <div className='col-md-4'>

        </div>
      </div>

    </div>
  )
}

export default Dashboard
