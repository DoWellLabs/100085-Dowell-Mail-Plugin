import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [receiverName, setReceiverName] = useState("");
  const [receiverEmail, setReceiverEmail] = useState("");
  const [senderName, setSenderName] = useState("");
  const [senderEmail, setSenderEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);
  const [rcMailError, setRcMailError] = useState(false);
  const [seMailError, setSeMailError] = useState(false);
  const [msg, setMsg] = useState({
    text: "",
    status: "",
  });
  useEffect(() => {
    if (msg.text || msg.status) {
      setTimeout(
        () =>
          setMsg({
            text: "",
            status: "",
          }),
        4000
      );
    }
  }, [msg.text, msg.status]);

  const isValidEmail = (email) => {
    let emailRegex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return emailRegex.test(email);
  };

  const sendEmail = (e) => {
    e.preventDefault();
    setMsg({
      text: "",
      status: "",
    });
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://100085.pythonanywhere.com/api/v1/mail/d0950d9a-0781-45fa-99f0-e788f06dc225/?type=send-email",
      headers: {},
      data: {
        email: receiverEmail,
        name: receiverName,
        fromName: senderName,
        fromEmail: senderEmail,
        subject: subject,
        body: body,
      },
    };
    setLoading(true);

    axios(config)
      .then(function (response) {
        setLoading(false);
        setReceiverName("");
        setReceiverEmail("");
        setSenderName("");
        setSenderEmail("");
        setSubject("");
        setBody("");
        if (response.status === 200) {
          setMsg({
            text: "Mail has been sent successfully",
            status: "success",
          });
        }
      })
      .catch(function (error) {
        setLoading(false);
        setReceiverName("");
        setReceiverEmail("");
        setSenderName("");
        setSenderEmail("");
        setSubject("");
        setBody("");
        setMsg({
          text: "Something went wrong ",
          status: "error",
        });
      });
  };
  return (
    <React.Fragment>
      <div className="container mx-auto my-4 px-4 lg:px-20 flex justify-center items-center">
        <div className="w-full p-8 my-4 md:px-12 lg:w-9/12 lg:pl-20 lg:pr-40  rounded-2xl shadow-2xl">
          <div className="flex">
            <h1 className="font-bold uppercase text-5xl text-gray-600">
              Send Email
            </h1>
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 mt-5">
            <div className=" flex flex-col gap-1">
              <input
                value={receiverEmail}
                onChange={(e) => setReceiverEmail(e.target.value)}
                onBlur={(e) => {
                  if (!isValidEmail(e.target.value)) {
                    setRcMailError(true);
                  }
                }}
                onFocus={(e) => {
                  setRcMailError(false);
                }}
                className={`w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline ${
                  rcMailError ? "border-2 border-red-600 bg-red-50" : ""
                }`}
                type="email"
                placeholder="Receiver Email*"
              />
              <div>
                {rcMailError && (
                  <p className={` text-red-700 text-sm  `}>
                    Please enter a valid email address
                  </p>
                )}
              </div>
            </div>
            <input
              value={receiverName}
              onChange={(e) => setReceiverName(e.target.value)}
              className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Receiver Name*"
            />
            <div className=" flex flex-col gap-1">
              <input
                value={senderEmail}
                onChange={(e) => setSenderEmail(e.target.value)}
                onBlur={(e) => {
                  if (!isValidEmail(e.target.value)) {
                    setSeMailError(true);
                  }
                }}
                onFocus={(e) => {
                  setSeMailError(false);
                }}
                className={`w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline ${
                  seMailError ? "border-2 border-red-600 bg-red-50" : ""
                }`}
                type="email"
                placeholder="Sender Email*"
              />
              <div>
                {seMailError && (
                  <p className={` text-red-700 text-sm  `}>
                    Please enter a valid email address
                  </p>
                )}
              </div>
            </div>
            <input
              value={senderName}
              onChange={(e) => setSenderName(e.target.value)}
              className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Sender Name*"
            />
            <input
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Subject*"
            />
          </div>
          <div className="my-4">
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Message*"
              className="w-full h-32 bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
            ></textarea>
          </div>
          <div className="my-2 w-1/2 lg:w-1/4">
            <button
              onClick={(e) => {
                sendEmail(e);
              }}
              disabled={
                loading ||
                !receiverEmail ||
                !receiverName ||
                !senderEmail ||
                !senderName ||
                !subject ||
                !body ||
                !validationError.rcMail ||
                !validationError.seMail
              }
              className="relative uppercase text-sm font-bold  bg-blue-900 text-gray-100 px-4 py-2 rounded-lg  
                      focus:outline-none focus:shadow-outline disabled:bg-gray-400 disabled:text-gray-800 cursor-pointer"
            >
              {!loading ? "Send" : "Sending"}
              {!loading ? null : (
                <div
                  className="absolute -translate-y-1/2 top-1/2 -translate-x-1/2 left-1/2"
                  role="status"
                >
                  <svg
                    aria-hidden="true"
                    className="w-6 h-6 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="#F3F4F6"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  <span className="sr-only">Loading...</span>
                </div>
              )}
            </button>
          </div>
          {msg.text && (
            <p
              className={`${
                msg.status === "success"
                  ? "bg-green-300/50 text-green-700"
                  : "bg-red-300/50 text-red-700"
              } p-2 text-sm  `}
            >
              {msg.text}
            </p>
          )}
        </div>
      </div>
    </React.Fragment>
  );
}
export default App;
