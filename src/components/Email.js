import React, { useState } from 'react';
import './email.scss'; // Import the Sass file
import axios from 'axios';
const EmailForm = () => {
  const [mail,setMail]=useState(
    {
      sendername:'',
      senderemail:'',
      recievername:'',
      recieveremail:'',
      subject:'',
      message:''
});
//const [submit,setSubmit]=useState(false);
  const [result, setResult] = useState({success:true,message:""});
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    //setSubmit(true);
    // Add logic to send the email
    //check validity check
   const checkValid=async (sendername, senderemail ,recievername ,recieveremail, subject ,messages)=>{
      const response=await axios.post('https://100085.pythonanywhere.com/api/v1/mail/99a4a3b1-f351-4d9e-b3ee-b44fd3e0b600/?type=validate&service=Dowell Email',
      {
        "email":recieveremail,
        "name":recievername,
        "fromName":sendername,
        "fromEmail" : senderemail,
        "subject" : subject,
        "body" : messages
    });
    const {success,message:responseMessage}= response.data;  
    return {success,responseMessage};  
    }

    const sendMailMessage=async (sendername, senderemail ,recievername ,recieveremail, subject ,messages)=>{
      const response=await axios.post('https://100085.pythonanywhere.com/api/v1/mail/99a4a3b1-f351-4d9e-b3ee-b44fd3e0b600/?type=send-email&service=Dowell Email',
      {
       "email":recieveremail,
        "name":recievername,
        "fromName":sendername,
        "fromEmail" : senderemail,
        "subject" : subject,
        "body" : messages
    });

    let {message:responseMessage}= response.data;  
    return {responseMessage};  
    }
const errorResponse=(sendername , senderemail , recievername , recieveremail , subject , message)=>{
  let fieldarray="*";
  if(!sendername){
    fieldarray=fieldarray+"sendername ";
  } 
  if(!senderemail){
    fieldarray=fieldarray+"senderemail ";
  } 
  if(!recievername){
    fieldarray=fieldarray+"recievername ";
  }
  if(!recieveremail){
    fieldarray=fieldarray+"recieveremail ";
  }
  if(!subject){
    fieldarray=fieldarray+"subject ";
  }
  if(!message){
    fieldarray=fieldarray+"message";
  }
  
  setResult((prev)=>({...prev,success:false,message:`${fieldarray.split(" ").filter(item=>item!==" ").join(",")} can not be empty`}))
}

if(mail.sendername && mail.senderemail && mail.recievername && mail.recieveremail && mail.subject && mail.message){ 
      let {success,responseMessage}=await checkValid(mail.sendername , mail.senderemail , mail.recievername , mail.recieveremail , mail.subject , mail.message);
      console.log("success :"+success);
      if(success){
       const {responseMessage}=await sendMailMessage(mail.sendername ,mail.senderemail , mail.recievername , mail.recieveremail , mail.subject , mail.message);
          setResult((prev)=>({...prev,success:true,message:responseMessage}));
     } else{
         setResult((prev)=>({...prev,message:"* Error occurred "+responseMessage,success:false}));
     }

    } else{
      errorResponse(mail.sendername, mail.senderemail ,mail.recievername ,mail.recieveremail, mail.subject ,mail.message)
    }

  
  };

  return (
    <div className="email-form">
       <h3>Email Service</h3>
       <p className={result.success === "true" ? 'sucess' : 'fail'}>{result.message ?? result.message  }</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Sender name"
          value={mail.sendername}
          onChange={(e) => setMail((prev)=>({...prev,sendername:e.target.value}))}
          />
         <input
          type="text"
          placeholder="Sender email"
          value={mail.senderemail}
          onChange={(e) => setMail((prev)=>({...prev,senderemail:e.target.value}))}/>
         <input
          type="text"
          placeholder="reciever name"
          value={mail.recievername}
          onChange={(e) => setMail((prev)=>({...prev,recievername:e.target.value}))}/>
         <input
          type="text"
          placeholder="Reciever email"
          value={mail.recieveremail}
          onChange={(e) => setMail((prev)=>({...prev,recieveremail:e.target.value}))}
          />
        <input
          type="text"
          placeholder="Subject"
          value={mail.subject}
          onChange={(e) => setMail((prev)=>({...prev,subject:e.target.value}))}/>
        <textarea
          placeholder="Message"
          value={mail.message}
          onChange={(e) => setMail((prev)=>({...prev,message:e.target.value}))}></textarea>
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default EmailForm;
