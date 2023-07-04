import React, { useState } from 'react';
import axios from 'axios';
import './email.scss'; // Import the Sass file
const EmailFinder = () => {
  const [name, setName] = useState('');
  const [domain, setDomain] = useState('');
  const [result, setResult] = useState({success:"",message:"", userinfo:""});
  const findEmail=async (name,domain)=>{

    const response=await axios.post('https://100085.pythonanywhere.com/api/v1/mail/99a4a3b1-f351-4d9e-b3ee-b44fd3e0b600/?type=email-finder&service=Dowell Email',
    {
    
      "name":name,
      "domain":domain
  });

  let {success,message:responseMessage,result:userinfos}= response.data;  
  return {success,responseMessage,userinfos};  

  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add logic to send the email
    const response= await findEmail(name,domain);
    setResult((prev)=>({...prev,success:response.success,message:response.responseMessage,userinfo:response.userinfos}))
  };

  return (
    <div className="email-form">
      <h3>Email Finder</h3>
      <form onSubmit={handleSubmit}>

        <input
          type="text"
          placeholder="enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
         <input
          type="text"
          placeholder="domain address"
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
        />   
        <button type="submit">Find email</button>
      </form>
      <p className={result.success ? 'successMessage':'errorMessage'}>{result.success ? `${result.message} ${result.userinfo.email}`: result.message}</p>
    </div>
  );
};

export default EmailFinder;
