import React, { useEffect, useState } from "react";
import axios from "axios";

const Contact = () => {
  const [senderName, setSenderName] = useState("");
  const [senderEmail, setSenderEmail] = useState("");
  const [receiverName, setReceiverName] = useState("");
  const [receiverEmail, setReceiverEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [loader, setLoader] = useState("Save");

  const api_key = process.env.REACT_APP_API_KEY;
  const url = `https://100085.pythonanywhere.com/api/v1/mail/${api_key}`;

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoader("Saving...");
    axios
      .post(
        `${url}/?type=validate`,
        {
          receiverName,
          receiverEmail,
          senderName,
          senderEmail,
          subject,
          body,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          timeout: 3000,
        }
      )
      .then((res) => {
        setLoader("Save");
      });
  };

  useEffect(() => {
    axios.get(`${url}/?type=send-email`).then((res) => {
      setSenderName(res.data.senderName);
      setSenderEmail(res.data.senderEmail);
      setReceiverName(res.data.receiverName);
      setReceiverEmail(res.data.receiverEmail);
      setSubject(res.data.subject);
      setBody(res.data.body);
    });
  }, [url]);

  return (
    <div className="flex relative flex-col md:text-left md:flex-row max-w-7xl px-10 justify-evenly mx-auto items-center">
      <div className="py-20 md:col-span-2 space-y-6">
        <div className="px-4 sm:px-0">
          <h3 className="text-2xl md:text-4xl text-center font-bold leading-6 text-gray-900">
            Contact
          </h3>
        </div>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="overflow-hidden drop-shadow-2xl sm:rounded-2xl">
            <div className="bg-white px-4 py-5 sm:p-6">
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6 sm:col-span-3">
                  <input
                    type="text"
                    name="name"
                    placeholder="Sender name"
                    id="name"
                    value={senderName}
                    onChange={(e) => {
                      setSenderName(e.target.value);
                    }}
                    autoComplete="name"
                    className="form-input"
                  />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <input
                    type="text"
                    name="email-address"
                    placeholder="Sender Email"
                    id="email-address"
                    value={senderEmail}
                    onChange={(e) => {
                      setSenderEmail(e.target.value);
                    }}
                    autoComplete="email"
                    className="form-input"
                  />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <input
                    type="text"
                    name="receiver-name"
                    placeholder="Receiver Name"
                    id="receiver-name"
                    value={receiverName}
                    onChange={(e) => {
                      setReceiverName(e.target.value);
                    }}
                    autoComplete="receiver-name"
                    className="form-input"
                  />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <input
                    type="text"
                    name="email-address"
                    placeholder="Receiver Email"
                    id="email-address"
                    value={receiverEmail}
                    onChange={(e) => {
                      setReceiverEmail(e.target.value);
                    }}
                    autoComplete="email"
                    className="form-input"
                  />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    value={subject}
                    onChange={(e) => {
                      setSubject(e.target.value);
                    }}
                    placeholder="Subject"
                    autoComplete="subject"
                    className="form-input"
                  />
                </div>

                <div className="col-span-6">
                  <textarea
                    id="message"
                    name="message"
                    value={body}
                    onChange={(e) => {
                      setBody(e.target.value);
                    }}
                    placeholder="Message"
                    rows={4}
                    className="form-input"
                  />
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 text-center md:text-left sm:px-6">
              <button type="submit" className="btn-send">
                {loader}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;
