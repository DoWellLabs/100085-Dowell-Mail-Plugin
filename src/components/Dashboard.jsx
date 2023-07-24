import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import '../styles/main.scss'
import requests from './Requests'

const Dashboard = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [sender, setSender] = useState('');
    const [sendername, setSendername] = useState('');
    const [subject, setSubject] = useState('');
    const [body, setBody] = useState('');

    const sendEmail = () => {
        var data = { "email": email, "name": name, "fromName": sender, "fromEmail": sendername, "subject": subject, "body": body };

        var config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: requests.requestSendEmail,
            headers: {},
            data: data
        };

        axios(config)
            .then(function (response) {
                alert(response.data.message)
                console.log(JSON.stringify(response.data));
            })
            .catch(function (error) {
                alert(error.response.data.message)
                console.log(error);
            });
    }

    const validateEmail = () => {
        var data = { "email": email, "name": name, "fromName": sender, "fromEmail": sendername, "subject": subject, "body": body };

        var config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: requests.requestValidateEmail,
            headers: {},
            data: data
        };

        axios(config)
            .then(function (response) {
                alert(response.data.message)
                console.log(response)
            })
            .catch(function (error) {
                alert(error.response.data.message)
                console.log(error)
            });
    }

    return (
        <>
            <div className='dashboard'>
                <div className="card">
                    <h2 className='app-title'>Dowell Mail Plugin</h2>
                    <div className="contact-form">
                        <div className='sender'>
                            <input type="email" placeholder="Recipient Email" onChange={(e) => setEmail(e.target.value)} required />
                            <input type="text" placeholder="Recipient Name" onChange={(e) => setName(e.target.value)} required />
                        </div>
                        <div className='receipt'>
                            <input type="text" placeholder="Your Name" onChange={(e) => setSender(e.target.value)} required />
                            <input type="email" placeholder="Your Email" onChange={(e) => setSendername(e.target.value)} required />
                        </div>
                        <input type="text" placeholder="Subject" onChange={(e) => setSubject(e.target.value)} required />
                        <textarea name='message' cols="30" rows="20" onChange={(e) => setBody(e.target.value)} placeholder="Message"></textarea>
                        <div>
                            <button type='submit' className='sendmail' onClick={() => sendEmail()}>Send</button>
                            <button type='submit' className='validatemail' onClick={() => validateEmail()}>Validate Email</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Dashboard;