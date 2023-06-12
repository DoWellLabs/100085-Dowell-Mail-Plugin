import React, { useEffect, useState } from "react";
import axios from "axios";

const EmailPlugin = () => {
  const [senderName, setSenderName] = useState("");
  const [senderEmail, setSenderEmail] = useState("");
  const [receiverName, setReceiverName] = useState("");
  const [receiverEmail, setReceiverEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [loader, setLoader] = useState("Save");

  const api_key = "1eb3120a-38ce-428b-b6d7-bfb8fac59fcf";
  const url = `https://100085.pythonanywhere.com/api/v1/mail/${api_key}`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader("Saving...");

    try {
      const res = await axios.post(
        `${url}/?type=send-email`,
        {
          senderName,
          senderEmail,
          receiverName,
          receiverEmail,
          subject,
          body,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setLoader("Save");
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex relative flex-col md:text-left md:flex-row max-w-7xl px-10 justify-evenly mx-auto items-center">
      <div className="py-20 md:col-span-2 space-y-6">
        <div className="px-4 sm:px-0">
          <h3 className="text-2xl md:text-4xl text-center font-bold leading-6 text-gray-900">
            Contact
          </h3>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="overflow-hidden drop-shadow-2xl sm:rounded-2xl">
            <div className="bg-white px-4 py-5 sm:p-6">
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6 sm:col-span-3">
                  <input
                    type="text"
                    name="senderName"
                    placeholder="Sender name"
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
                    name="senderEmail"
                    placeholder="Sender Email"
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
                    name="receiverName"
                    placeholder="Receiver Name"
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
                    name="receiverEmail"
                    placeholder="Receiver Email"
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
                    name="body"
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

export default EmailPlugin;
