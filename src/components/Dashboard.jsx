import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import requests from './Requests'

const Dashboard = () => {
    const [email, setEmail] = useState('')
    const sendEmail = () => {
        axios.post(requests.requestSendEmail)
            .then(response => {
                console.log(response.data)
                setEmail(response.data)
            }).catch(error =>
                console.log(error))
    };

    const [validate, setValidate] = useState('')
    const validateEmail = () => {
        axios.post(requests.requestValidate)
            .then(response => {
                console.log(response.data)
                setValidate(response.data)
            }).catch(error =>
                console.log(error))
    }

    return (
        <div className='dashboard'>
            <div className="card">
                <h3>Email Dashboard</h3>
                <form className="contact-form">
                    <input type="email" placeholder="Roga" name="email_address" required />
                    <input type="text" placeholder="Subject" name="subject" required />
                    <textarea name='message' cols="30" rows="10" placeholder="Message"></textarea>
                    <div>
                        <button className='sendmail' onClick={sendEmail}>SEND</button>
                        <button className='validatemail' onClick={validateEmail}>VALIDATE</button>
                        {email ? <p>Eamil Sent!</p> : <p>Email not sent</p>}
                        {validate ? <p>Email valid</p> : <p>Invalid Email</p>}
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Dashboard;