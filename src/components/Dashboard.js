import React from 'react'
import EmailForm from './Email';
import EmailFinder from './EmailFinder';
// import './card.scss'
const Dashboard = () => {
    return (
        <div className='dashboard'>
            <div className="cardform"> 
                <EmailForm/>
                <EmailFinder/>
            </div>
        </div>
     );
}

export default Dashboard;